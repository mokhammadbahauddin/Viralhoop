import { GenerateContent } from 'wasp/server/operations';
import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { HttpError } from 'wasp/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

import { ContentHistory } from 'wasp/entities';

export const generateContent: GenerateContent<
  { url: string; mode: string },
  ContentHistory
> = async ({ url, mode }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  // 0. Check Plan and Credits
  // Assuming subscriptionStatus 'active' means Pro. Or we check subscriptionPlan.
  // Using subscriptionStatus to be safe as per PRD "Use Wasp's user.subscriptionStatus to gate features."
  // And "Display 'Lock' icons on Pro tabs for free users." - implies Free users are restricted.

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

  // 4. Save to Database & Deduct Credit
  // Use a transaction to ensure atomicity
  const [contentHistory] = await context.entities.$transaction([
    context.entities.ContentHistory.create({
      data: {
        userId: context.user.id,
        title: 'New Project', // In a real app, we'd fetch video title
        sourceUrl: url,
        summary: mode === 'summary' ? generatedText : undefined,
        linkedin: mode === 'linkedin' ? generatedText : undefined,
        twitter: mode === 'twitter' ? generatedText : undefined,
        blog: mode === 'blog' ? generatedText : undefined,
      },
    }),
    context.entities.User.update({
      where: { id: context.user.id },
      data: {
        credits: {
          decrement: isPro ? 0 : 1, // Only deduct if not pro
        },
      },
    }),
  ]);

  return contentHistory;
};
