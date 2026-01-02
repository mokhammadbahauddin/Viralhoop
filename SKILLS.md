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

## 6. Learned Patterns (New)
* **Database Setup**: In Sandbox environments without Docker, `sqlite` is the only viable option for Prisma. Remember to update `schema.prisma` provider and remove incompatible `@db.Text` annotations (SQLite handles string length dynamically).
* **Playwright Verification**: Waiting for selectors (`waitForSelector`) is more reliable than hard timeouts. When redirecting after login, checking for URL patterns (`waitForURL`) helps verify auth flows.
* **CN Utility**: Always use a `cn` (clsx + tailwind-merge) utility for reusable components to allow overriding styles cleanly.
