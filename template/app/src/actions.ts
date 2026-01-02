import { GenerateContent } from 'wasp/server/operations';
import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { HttpError } from 'wasp/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateContent: GenerateContent<
  { url: string; mode: string },
  void
> = async ({ url, mode }, context) => {
  if (!context.user) {
    throw new HttpError(401);
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
  let systemPrompt = '';
  switch (mode) {
    case 'linkedin':
      systemPrompt =
        'Act as a viral LinkedIn ghostwriter. Analyze this transcript. Write a post that starts with a controversial hook, uses punchy <15 word sentences, includes a list of 3 actionable takeaways, and ends with a question.';
      break;
    case 'twitter':
      systemPrompt =
        'Act as a Twitter growth expert. Convert this into a thread. Tweet 1: Massive Hook. Tweets 2-6: Value/Insights. Tweet 7: Summary & CTA.';
      break;
    case 'blog':
      systemPrompt =
        'Act as a SEO expert. Write a blog post based on this transcript. Include H1, H2, and relevant keywords.';
      break;
    case 'summary':
    default:
      systemPrompt =
        'Summarize the following video transcript into bullet points and key insights.';
      break;
  }

  // 3. Generate Content with Gemini
  let generatedText = '';
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent([systemPrompt, transcriptText]);
    const response = await result.response;
    generatedText = response.text();
  } catch (error) {
    console.error('Gemini Error:', error);
    throw new HttpError(500, 'AI Generation failed.');
  }

  // 4. Save to Database
  await context.entities.ContentHistory.create({
    data: {
      userId: context.user.id,
      title: 'New Project', // In a real app, we'd fetch video title
      sourceUrl: url,
      summary: mode === 'summary' ? generatedText : undefined,
      linkedin: mode === 'linkedin' ? generatedText : undefined,
      twitter: mode === 'twitter' ? generatedText : undefined,
      blog: mode === 'blog' ? generatedText : undefined,
    },
  });
};
