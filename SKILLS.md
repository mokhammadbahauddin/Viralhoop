# Developer Skills & Design System: "Vertex" (Wasp Edition)

## 1. Design Philosophy: "Vertex"
The "Vertex" theme is **Industrial, Clean, and Data-Dense**. It is built for productivity.
* **Colors:** `zinc-50` to `zinc-900`. Accents are minimal (Black/White). Use `zinc-900` for primary actions and `zinc-500` for secondary text.
* **Borders:** `border border-zinc-200` is the defining characteristic. Sharp separation.
* **Radius:** `rounded-md` or `rounded-lg`. Avoid `rounded-3xl` (that's for consumer apps).
* **Typography:** `Inter` for UI, `JetBrains Mono` for code blocks or data points.

## 2. Visual Effects & Animation (New)
* **Glassmorphism:** Use `backdrop-filter: blur(12px)` with generic backgrounds (`bg-white/80`) for sticky headers.
* **Grid Pattern:** Use `bg-grid-pattern` (linear gradients of `rgba(24, 24, 27, 0.05)`) for backgrounds to add texture without noise.
* **Animations:**
    *   `animate-enter`: `opacity: 0; transform: translateY(10px)` -> `opacity: 1; transform: translateY(0)`.
    *   `animate-shimmer`: Linear gradient background moving horizontally.
    *   `animate-float`: Subtle vertical floating for hero elements.
* **Scrollbars:** Custom thin scrollbars (`width: 6px`) with `zinc-200` thumb and transparent track.

## 3. Component Implementation (Tailwind)
* **Buttons:**
    * Primary: `bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm rounded-md px-4 py-2 font-medium transition-all hover:shadow-md hover:-translate-y-0.5`.
    * Secondary: `bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50 rounded-md px-4 py-2`.
    * Ghost: `text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg px-3 py-2 transition-colors`.
* **Inputs:**
    * `input-ring`: `focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-shadow`.
    * Base: `h-10 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm placeholder:text-zinc-400 focus:bg-white focus:outline-none`.
* **Cards:**
    * `bg-white border border-zinc-200 shadow-sm rounded-xl overflow-hidden`.

## 4. Wasp Framework Specifics
* **Data Fetching:** Do NOT use `useEffect` for data. Use `useQuery(getHistory)` from Wasp.
* **Backend Calls:** Use `useAction(generateContent)` for triggering AI.
* **Auth:** Access user data via `useAuth()`. Check `user.subscriptionStatus` for gating.
* **Routing:** Define all routes in `main.wasp`. Use `<Link to="...">` for navigation.

## 5. Gemini Integration Strategy
* **Action Definition:** Define the AI generation as a Wasp Action in `src/actions.ts`.
* **Error Handling:** YouTube transcripts can fail (no captions). Wrap in try/catch and return specific error messages to the client ("No captions found").

## 6. Code Patterns
* **Strict TypeScript:** Define interfaces for `ContentResult` and `UserHistory`.
* **CN Utility:** Always use a `cn` (clsx + tailwind-merge) utility for reusable components.
* **Modular Views:** In `DashboardPage`, use a state variable (`activeTab`) to switch between Main, History, and Analytics views to keep the DOM clean but responsive.
