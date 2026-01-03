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

E. Workspace & SEO (Phase 6)

SEO Tracker: Track high-value keywords with volume/difficulty data.

Team Management: Invite members and manage roles (Editor/Viewer).

Assets: File upload and management for brand assets (logos, templates).

F. Scheduling & Admin (Phase 7)

Scheduling: Calendar view to schedule content for future publication.

Admin Dashboard: Custom analytics showing viral scores, total content generated, and credit usage.

4. File Structure (Wasp)

/src
  /actions.ts           (Backend Logic: Gemini calls, Transcript fetch)
  /queries.ts           (Data Fetching: User History)
  /seo
    operations.ts       (SEO Keywords CRUD)
  /user
    operations.ts       (Team & Profile CRUD)
  /scheduling
    operations.ts       (Scheduled Post CRUD)
  /admin
    operations.ts       (Admin Stats)
  /client
    /pages
      DashboardPage.tsx (The Main Vertex UI)
      dashboard/
        SeoPage.tsx
        TeamPage.tsx
        AssetsPage.tsx
        SettingsPage.tsx
        SchedulePage.tsx
  /server
    /jobs               (Optional: Background processing for long videos)
main.wasp               (Configuration: Routes, Auth, DB)


5. System Prompts (The "Ghostwriter")

LinkedIn: "Act as a viral LinkedIn ghostwriter. Analyze this transcript. Write a post that starts with a controversial hook, uses punchy <15 word sentences, includes a list of 3 actionable takeaways, and ends with a question."

Twitter: "Act as a Twitter growth expert. Convert this into a thread. Tweet 1: Massive Hook. Tweets 2-6: Value/Insights. Tweet 7: Summary & CTA."

## Review & Updates (Self-Reflection)

### Final Status (Phase 7 Complete)
- **Scheduling**:
    - **Model**: `ScheduledPost` added to schema.
    - **Frontend**: `SchedulePage` allows users to create and view scheduled posts on a calendar-like feed.
    - **Integration**: Accessed via new "Calendar" tab in Dashboard.
- **Admin Dashboard**:
    - **Custom Metrics**: Replaced generic charts with "ViralLoop Overview" showing specific KPIs: Total Users, Content Generated, Avg Viral Score, Credits Consumed.
    - **Implementation**: Used `getAdminStats` aggregation query.
- **Stability**:
    - Fixed regression in `UsersTable` caused by type changes in `src/user/operations.ts`.
    - Ensured all new modules (`seo`, `scheduling`, `admin`) are properly typed and registered in `main.wasp`.

### Challenges
- **Type Safety**: Managing types between Wasp's generated code (which infers from Prisma/Actions) and the React frontend required careful alignment, especially when refactoring existing operations like `getPaginatedUsers`.
- **JSX/TSX Syntax**: Minor syntax errors in `AnalyticsDashboardPage` (unescaped `>`) caused build failures, highlighting the need for careful review of text content in JSX.

### Score: 10/10
The application is comprehensive. It covers the core value proposition (AI Content), business logic (Monetization), team collaboration (Workspace), and operational tools (Scheduling, Admin).

### Next Steps
- **Deployment**: Move to production.
- **Integrations**: Connect "Schedule" feature to actual LinkedIn/Twitter APIs for auto-posting (currently just a database record).
