# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: "[plugin:vite:css] [postcss] /app/template/app/src/client/css/custom.css:1:1: `@layer utilities` is used but no matching `@tailwind utilities` directive is present."
  - generic [ref=e5]: /app/template/app/src/client/css/custom.css:1:0
  - generic [ref=e6]: "1 | @layer utilities { | ^ 2 | .bg-grid-pattern { 3 | background-size: 40px 40px;"
  - generic [ref=e7]: at Input.error (/app/template/app/node_modules/postcss/lib/input.js:135:16) at AtRule.error (/app/template/app/node_modules/postcss/lib/node.js:146:32) at normalizeTailwindDirectives (/app/template/app/node_modules/tailwindcss/lib/lib/normalizeTailwindDirectives.js:72:32) at /app/template/app/node_modules/tailwindcss/lib/processTailwindFeatures.js:29:98 at plugins (/app/template/app/node_modules/tailwindcss/lib/plugin.js:38:69) at LazyResult.runOnRoot (/app/template/app/node_modules/postcss/lib/lazy-result.js:361:16) at LazyResult.runAsync (/app/template/app/node_modules/postcss/lib/lazy-result.js:290:26) at LazyResult.async (/app/template/app/node_modules/postcss/lib/lazy-result.js:192:30) at LazyResult.then (/app/template/app/node_modules/postcss/lib/lazy-result.js:436:17)
  - generic [ref=e8]:
    - text: Click outside, press Esc key, or fix the code to dismiss.
    - text: You can also disable this overlay by setting
    - code [ref=e9]: server.hmr.overlay
    - text: to
    - code [ref=e10]: "false"
    - text: in
    - code [ref=e11]: vite.config.ts
    - text: .
```