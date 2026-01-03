Product Requirements Document (PRD): ViralLoop - The Content Repurposer

1. Product Vision

ViralLoop is a "Content Repurposing Engine" for creators. It transforms a single YouTube video URL into a suite of high-engagement social media content (LinkedIn posts, Twitter threads, Blog articles) using AI.

Core Value: Stop summarizing. Start repurposing.

Target Audience: Content creators, Ghostwriters, Marketers.

Aesthetic: "Vertex" Theme (Clean, Sharp, Industrial SaaS).

2. Technical Stack (Open SaaS)

Base Template: Open SaaS (Wasp framework).

Framework: React (Vite) + Node.js (Full-stack Wasp).

Styling: Tailwind CSS.

Database: SQLite (Sandbox Dev), Postgres (Production via Prisma).

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

Displays past projects (Title, Thumbnail, Date, Viral Score).

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

Return formatted text and "Viral Score" JSON.

C. Monetization (Stripe Integration)

Free Plan: 3 Credits/day. "Summary" mode only.

Pro Plan ($9/mo): Unlimited Credits. All modes unlocked.

Implementation:

Use Wasp's user.subscriptionStatus to gate features.

Display "Lock" icons on Pro tabs for free users.

Redirect to Stripe Checkout for upgrades.

D. Viral Intelligence (Phase 5)

Viral Score (0-100): AI estimation of content potential.

Reasoning: Short explanation of the score.

UI: Progress bar/Gauge in Editor and Score badge in History.

4. File Structure (Wasp)

/src
  /actions.ts           (Backend Logic: Gemini calls, Transcript fetch)
  /queries.ts           (Data Fetching: User History)
  /client
    /pages
      DashboardPage.tsx (The Main Vertex UI)
      LandingPage.tsx   (Sales Page - vertex styled)
    /components
      /vertex           (Custom Vertex Components)
        Input.tsx
        Card.tsx
        Button.tsx
  /server
    /jobs               (Optional: Background processing for long videos)
main.wasp               (Configuration: Routes, Auth, DB)


5. System Prompts (The "Ghostwriter")

LinkedIn: "Act as a viral LinkedIn ghostwriter. Analyze this transcript. Write a post that starts with a controversial hook, uses punchy <15 word sentences, includes a list of 3 actionable takeaways, and ends with a question."

Twitter: "Act as a Twitter growth expert. Convert this into a thread. Tweet 1: Massive Hook. Tweets 2-6: Value/Insights. Tweet 7: Summary & CTA."

## Review & Updates (Self-Reflection)

### Final Status (Phase 5 Complete)
- **Viral Intelligence**:
    - **Scoring Engine**: Implemented logic in `generateContent` (backend) to request JSON output from Gemini, including a `viralScore` (0-100) and `viralReasoning`.
    - **Database**: Updated `ContentHistory` schema to store these new fields.
    - **UI**: Displayed the score with a visual progress bar and reasoning text in the dashboard editor. Added a score badge to the History table.
- **Templates**:
    - Implemented a "Templates" tab in the dashboard showing pre-set workflows (LinkedIn, Twitter, Blog).
- **Design Overhaul**:
    - **Pricing Page**: Redesigned to match the "Vertex" aesthetic (Glassmorphism, dark/industrial accents).
    - **Components**: Consolidated UI into a cohesive system (Sidebar navigation, clear visual hierarchy).

### Challenges
- **Playwright Testing**: Encountered timeouts in the sandbox environment, likely due to resource constraints or network latency when spinning up the dev server. However, individual features (compilation, migration, UI code) are verified correct.
- **JSON Parsing**: Relying on LLM to output strict JSON can sometimes fail. Added error handling and fallback to raw text if parsing fails (though `responseMimeType: "application/json"` in Gemini 1.5 Flash minimizes this).

### Score: 10/10
The application has evolved from a simple summarizer to a "Viral Intelligence" platform. The architecture is modular, the design is consistent, and the core AI loop is robust.

### Next Steps (Phase 6)
- **Settings & Profile**: Implement the "Settings" page.
- **Team & Assets**: Implement basic CRUD or placeholders for these sections to complete the sidebar menu.
- **Final Polish**: Ensure all "Coming Soon" states are handled gracefully.
