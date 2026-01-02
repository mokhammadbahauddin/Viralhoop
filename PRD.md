Product Requirements Document (PRD): ViralLoop - The Content Repurposer

1. Product Vision

ViralLoop is a "Content Repurposing Engine" for creators. It transforms a single YouTube video URL into a suite of high-engagement social media content (LinkedIn posts, Twitter threads, Blog articles) using AI.

Core Value: Stop summarizing. Start repurposing.

Target Audience: Content creators, Ghostwriters, Marketers.

Aesthetic: "Vertex" Theme (Clean, Sharp, Industrial SaaS).

2. Technical Stack (Open SaaS)

Base Template: Open SaaS (Wasp framework).

Framework: Next.js + Node.js (Full-stack Wasp).

Styling: Tailwind CSS.

Database: Postgres (via Prisma).

Auth: Wasp Auth (Email/Password + Google).

Payments: Stripe (Managed by Open SaaS).

AI: Google Gemini API (@google/generative-ai).

Icons: Lucide React.

3. Core Features (The "ViralLoop" Engine)

A. The Dashboard (Main Page)

Route: /dashboard (Protected).

Layout: "Vertex" Split View.

Left: Input & History.

Right: Content Editor.

Input Component: * A prominent URL input for YouTube links.

A "Fetch" button that triggers the backend action.

History List:

Displays past projects (Title, Thumbnail, Date).

Click to load content into the editor.

B. The Repurposing Logic (Backend Action)

Action: generateContent(url, mode)

Modes:

Summary (Free): Bullet points + Key insights.

LinkedIn (Paid): Hook + Body + CTA structure.

Twitter (Paid): Thread format (1/x, 2/x).

Blog (Paid): H1, H2, SEO keywords.

Process:

Fetch YouTube Transcript (using youtube-transcript).

Select System Prompt based on mode.

Call Gemini 1.5 Flash with transcript.

Return formatted text.

C. Monetization (Stripe Integration)

Free Plan: 3 Credits/day. "Summary" mode only.

Pro Plan ($9/mo): Unlimited Credits. All modes unlocked.

Implementation:

Use Wasp's user.subscriptionStatus to gate features.

Display "Lock" icons on Pro tabs for free users.

Redirect to Stripe Checkout for upgrades.

4. File Structure (Wasp)

/src
  /actions.ts           (Backend Logic: Gemini calls, Transcript fetch)
  /queries.ts           (Data Fetching: User History)
  /client
    /pages
      Dashboard.tsx     (The Main Vertex UI)
      Landing.tsx       (Sales Page - vertex styled)
    /components
      /vertex           (Custom Vertex Components)
        Input.tsx
        Card.tsx
        Tabs.tsx
  /server
    /jobs               (Optional: Background processing for long videos)
main.wasp               (Configuration: Routes, Auth, DB)


5. System Prompts (The "Ghostwriter")

LinkedIn: "Act as a viral LinkedIn ghostwriter. Analyze this transcript. Write a post that starts with a controversial hook, uses punchy <15 word sentences, includes a list of 3 actionable takeaways, and ends with a question."

Twitter: "Act as a Twitter growth expert. Convert this into a thread. Tweet 1: Massive Hook. Tweets 2-6: Value/Insights. Tweet 7: Summary & CTA."


### 2. The Developer Guide: `SKILLS.md`
*Save this as `SKILLS.md`. It teaches the AI how to code ViralLoop using Wasp and the Vertex theme.*

```markdown
# Developer Skills & Design System: "Vertex" (Wasp Edition)

## 1. Design Philosophy: "Vertex"
The "Vertex" theme is **Industrial, Clean, and Data-Dense**. It is built for productivity.
* **Colors:** `zinc-50` to `zinc-900`. Accents are minimal (Black/White).
* **Borders:** `border border-zinc-200` everywhere. Sharp separation.
* **Radius:** `rounded-md` or `rounded-lg`. Avoid `rounded-3xl` (that's for consumer apps).
* **Typography:** `Inter` for UI, `JetBrains Mono` for code blocks.

## 2. Component Implementation (Tailwind)
* **Buttons:**
    * Primary: `bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm rounded-md px-4 py-2 font-medium`.
    * Secondary: `bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50 rounded-md px-4 py-2`.
* **Inputs:**
    * `h-10 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2`.
* **Cards:**
    * `bg-white border border-zinc-200 shadow-sm rounded-lg`.

## 3. Wasp Framework Specifics
* **Data Fetching:** Do NOT use `useEffect` for data. Use `useQuery(getHistory)` from Wasp.
* **Backend Calls:** Use `useAction(generateContent)` for triggering AI.
* **Auth:** Access user data via `useAuth()`. Check `user.subscriptionStatus` for gating.
* **Routing:** Define all routes in `main.wasp`. Use `<Link to="...">` for navigation.

## 4. Gemini Integration Strategy
* **Action Definition:** Define the AI generation as a Wasp Action in `src/actions.ts`.
* **Error Handling:** YouTube transcripts can fail (no captions). Wrap in try/catch and return specific error messages to the client ("No captions found").
* **Streaming:** For MVP, standard request/response is fine. If upgrading, use Wasp's WebSocket support for streaming text.

## 5. Code Style
* **Strict TypeScript:** Define interfaces for `ContentResult` and `UserHistory`.
* **Modular Components:** Keep the `Dashboard.tsx` clean by importing `ContentEditor.tsx`, `UrlInput.tsx`, and `HistorySidebar.tsx`.
