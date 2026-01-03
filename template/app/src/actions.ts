import { GenerateContent } from 'wasp/server/operations';
import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { HttpError, prisma } from 'wasp/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

import { ContentHistory } from 'wasp/entities';

export const generateContent: GenerateContent<
  { url: string; mode: string; keywords?: string },
  ContentHistory
> = async ({ url, mode, keywords }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const isPro = context.user.subscriptionStatus === 'active';
  const isFreeMode = mode === 'summary';

  if (!isPro && !isFreeMode) {
    throw new HttpError(403, 'Upgrade to Pro to use this feature.');
  }

  if (!isPro && context.user.credits <= 0) {
    throw new HttpError(402, 'Insufficient credits. Upgrade to Pro or wait for refill.');
  }

  // 1. Fetch Transcript
  let transcriptText = '';
  try {
    const transcriptItems = await YoutubeTranscript.fetchTranscript(url);
    transcriptText = transcriptItems.map((item) => item.text).join(' ');
  } catch (error) {
    console.error('Transcript Fetch Error:', error);
    throw new HttpError(400, 'Could not fetch transcript. Video might not have captions.');
  }

  // 2. Select Prompt
  // We now ask for JSON output to parse Viral Score and Content cleanly.
  // The system prompt should enforce a JSON schema.

  let modeSpecificPrompt = '';
  switch (mode) {
    case 'linkedin':
      modeSpecificPrompt =
        'Act as a viral LinkedIn ghostwriter. Write a post that starts with a controversial hook, uses punchy <15 word sentences, includes a list of 3 actionable takeaways, and ends with a question.';
      break;
    case 'twitter':
      modeSpecificPrompt =
        'Act as a Twitter growth expert. Convert this into a thread. Tweet 1: Massive Hook. Tweets 2-6: Value/Insights. Tweet 7: Summary & CTA.';
      break;
    case 'blog':
      modeSpecificPrompt =
        `Act as a SEO expert. Write a blog post based on this transcript. Include H1, H2, and relevant keywords.${keywords ? ` Focus on these target keywords: ${keywords}.` : ''}`;
      break;
    case 'summary':
    default:
      modeSpecificPrompt =
        'Summarize the following video transcript into bullet points and key insights.';
      break;
  }

  const jsonSchema = `
  {
    "content": "The generated content string here...",
    "viralScore": 85,
    "viralReasoning": "Short explanation of why this content has high viral potential (e.g. strong hook, emotional resonance)."
  }
  `;

  const finalPrompt = `
    ${modeSpecificPrompt}

    ANALYZE the viral potential of the source material.

    RETURN YOUR RESPONSE AS A VALID JSON OBJECT matching this structure:
    ${jsonSchema}

    Transcript:
    ${transcriptText}
  `;

  // 3. Generate Content with Gemini
  let generatedContent = '';
  let viralScore = 0;
  let viralReasoning = '';

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', generationConfig: { responseMimeType: "application/json" } });
    const result = await model.generateContent([finalPrompt]);
    const response = await result.response;
    const jsonText = response.text();

    try {
      const parsed = JSON.parse(jsonText);
      generatedContent = parsed.content;
      viralScore = parsed.viralScore || 0;
      viralReasoning = parsed.viralReasoning || '';
    } catch (parseError) {
      console.error("JSON Parse Error", parseError);
      // Fallback if model fails to output JSON (rare with responseMimeType but possible)
      generatedContent = jsonText;
    }

  } catch (error) {
    console.error('Gemini Error:', error);
    throw new HttpError(500, 'AI Generation failed.');
  }

  // 4. Save to Database & Deduct Credit
  const [contentHistory] = await prisma.$transaction([
    context.entities.ContentHistory.create({
      data: {
        userId: context.user.id,
        title: 'New Project',
        sourceUrl: url,
        // Save content to the correct field
        summary: mode === 'summary' ? generatedContent : undefined,
        linkedin: mode === 'linkedin' ? generatedContent : undefined,
        twitter: mode === 'twitter' ? generatedContent : undefined,
        blog: mode === 'blog' ? generatedContent : undefined,

        viralScore,
        viralReasoning,
      },
    }),
    context.entities.User.update({
      where: { id: context.user.id },
      data: {
        credits: {
          decrement: isPro ? 0 : 1,
        },
      },
    }),
  ]);

  return contentHistory;
};
