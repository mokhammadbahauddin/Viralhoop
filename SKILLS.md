Developer Skills & Design System: "Vertex" (Wasp Edition)

1. Design Philosophy: "Vertex"

The "Vertex" theme is Industrial, Clean, and Data-Dense. It is built for productivity tools, utilizing high contrast and sharp geometry.

Colors: Heavily rely on zinc-50 to zinc-900. Accents are minimal (Black/White/Gray). Use amber-500 or blue-600 sparingly for status indicators.

Borders: border border-zinc-200 is the defining characteristic. Elements should feel distinct and separated.

Radius: Use rounded-md or rounded-lg. Avoid rounded-full for containers (buttons/inputs only).

Typography: Inter for general UI, JetBrains Mono for code blocks or data points.

2. Component Implementation (Tailwind)

Buttons:

Primary: bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm rounded-md px-4 py-2 font-medium transition-colors.

Secondary: bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50 rounded-md px-4 py-2 transition-colors.

Ghost/Tab: text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md px-3 py-1.5.

Inputs:

h-10 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50.

Cards:

bg-white border border-zinc-200 shadow-sm rounded-lg overflow-hidden.

Layouts:

Use grid for the main dashboard layout (grid-cols-1 lg:grid-cols-12).

Use flex for toolbars and internal component alignment.

3. Wasp Framework Specifics

Data Fetching:

Do NOT use useEffect + fetch for database data.

Use Wasp's query hooks: const { data: history } = useQuery(getHistory).

Backend Actions:

Use Wasp's action hooks: const generateContentFn = useAction(generateContent).

Authentication:

Access user data via useAuth().

Check user.subscriptionStatus (e.g., 'active', 'past_due') to gate features in the UI (show Lock icons).

Routing:

Define all routes in main.wasp.

Use <Link to="/dashboard"> for client-side navigation.

4. Gemini Integration Strategy

Action Definition: Define the AI generation logic as a Wasp Action in src/actions.ts.

Error Handling:

YouTube transcripts often fail (no captions). Wrap the YoutubeTranscript.fetchTranscript(url) call in a robust try/catch block.

Return specific error messages to the client (e.g., "No captions found for this video").

Streaming:

For the MVP, a standard request/response is acceptable.

If upgrading to streaming, utilize Wasp's WebSocket support or split the response handling.

5. Code Style & Structure

Strict TypeScript: Define interfaces for ContentResult and UserHistory in src/types.ts (or shared entities).

Modular Components:

Keep DashboardPage.tsx clean.

Extract complex UI into: src/client/components/vertex/UrlInput.tsx, src/client/components/vertex/ContentEditor.tsx, src/client/components/vertex/HistorySidebar.tsx.

Lucide Icons: Use lucide-react for all iconography. Ensure consistent sizing (w-4 h-4 for UI elements, w-5 h-5 for navigation).