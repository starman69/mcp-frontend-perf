# Claude Code Instructions

This is a web performance anti-patterns demo app for showcasing AI-powered root cause analysis using MCP browser automation.

## Development Server

The app runs on Vite. Default URL: `http://localhost:5173`

If port 5173 is busy, Vite will use the next available port (5174, 5175, etc.). Check the terminal output when running `npm run dev`.

## Demo Routes

This app uses **HashRouter** for GitHub Pages compatibility. URLs include `#/` before the route.

When a prompt mentions a demo by name, use this mapping to navigate:

| Demo Name | Route | Local URL 
|-----------|-------|-----------
| render-blocking demo | `/render-blocking` | `http://localhost:5173/#/render-blocking`
| bundle size demo | `/large-bundle` | `http://localhost:5173/#/large-bundle`
| resource hints demo | `/missing-hints` | `http://localhost:5173/#/missing-hints`
| LCP demo | `/lcp` | `http://localhost:5173/#/lcp`
| images demo | `/unoptimized-images` | `http://localhost:5173/#/unoptimized-images`
| font demo | `/font-loading` | `http://localhost:5173/#/font-loading`
| CLS demo | `/cls` | `http://localhost:5173/#/cls`
| INP demo | `/inp` | `http://localhost:5173/#/inp`
| long tasks demo | `/long-tasks` | `http://localhost:5173/#/long-tasks`
| layout thrashing demo | `/layout-thrashing` | `http://localhost:5173/#/layout-thrashing`
| animation jank demo | `/animation-jank` | `http://localhost:5173/#/animation-jank`
| re-renders demo | `/excessive-rerenders` | `http://localhost:5173/#/excessive-rerenders`
| waterfall demo | `/waterfall-requests` | `http://localhost:5173/#/waterfall-requests`
| third-party scripts demo | `/third-party-scripts` | `http://localhost:5173/#/third-party-scripts`
| memory leaks demo | `/memory-leaks` | `http://localhost:5173/#/memory-leaks`
| DOM size demo | `/excessive-dom` | `http://localhost:5173/#/excessive-dom`
| inline functions demo | `/inline-functions` | `http://localhost:5173/#/inline-functions`
| useEffect demo | `/useeffect-issues` | `http://localhost:5173/#/useeffect-issues`
| scroll jank demo | `/scroll-jank` | `http://localhost:5173/#/scroll-jank`
| suspense demo | `/suspense-waterfall` | `http://localhost:5173/#/suspense-waterfall`
| hydration demo | `/hydration-mismatch` | `http://localhost:5173/#/hydration-mismatch`
| missing keys demo | `/missing-keys` | `http://localhost:5173/#/missing-keys`

## MCP Server Usage

This project uses two MCP servers. **Choose automatically based on task type - prompts do not need to specify which MCP to use.**

### Default Tool Selection

| Task Type | Use | Why |
|-----------|-----|-----|
| **Navigation** | Playwright | `browser_navigate` is simpler |
| **Page interactions** (click, type, hover) | Playwright | `browser_click`, `browser_type` are more reliable |
| **Finding elements** | Playwright | `browser_snapshot` returns cleaner element refs |
| **Performance traces** | Chrome DevTools | Only DevTools has `performance_start_trace` |
| **Performance insights** | Chrome DevTools | Only DevTools has `performance_analyze_insight` |
| **Network requests list** | Chrome DevTools | `list_network_requests` with filtering |
| **JavaScript execution** | Chrome DevTools | `evaluate_script` for memory checks, DOM queries |
| **Scrolling** | Playwright | Click to focus, `browser_press_key` PageDown/Home |

### Quick Reference

**Playwright MCP** (browser automation):
- `browser_navigate` - Go to URL
- `browser_snapshot` - Get page elements (use for finding buttons/inputs)
- `browser_click` - Click elements by ref
- `browser_type` - Type into inputs
- `browser_press_key` - Press keys (PageDown, PageUp, Enter, etc.)
- `browser_wait_for` - Wait for text to appear

**Chrome DevTools MCP** (performance & debugging):
- `performance_start_trace` - Start recording (`reload: true` for page load, `false` for interactions)
- `performance_stop_trace` - Stop and get metrics
- `performance_analyze_insight` - Deep dive (LCPBreakdown, CLSCulprits, ForcedReflow, INPBreakdown, etc.)
- `list_network_requests` - View network activity with filtering
- `evaluate_script` - Run JavaScript (memory checks, scroll simulation, DOM queries)

## Common Analysis Patterns

### For Page Load Metrics (LCP, FCP)
1. `browser_navigate` to the demo URL
2. `performance_start_trace` with `reload: true`, `autoStop: false`
3. `browser_wait_for` until page fully loads
4. `performance_stop_trace`
5. `performance_analyze_insight` for "LCPBreakdown" or "LCPDiscovery"

### For Interaction Metrics (INP, Long Tasks)
1. `browser_navigate` to the demo URL
2. `browser_snapshot` to find interactive elements
3. `performance_start_trace` with `reload: false`, `autoStop: false`
4. `browser_click` / `browser_type` to interact
5. `performance_stop_trace`
6. `performance_analyze_insight` for "INPBreakdown"

### For Layout Shift (CLS)
1. `browser_navigate` to the demo URL
2. `browser_snapshot` to find trigger button
3. `performance_start_trace` with `reload: false`, `autoStop: false`
4. `browser_click` on the trigger button
5. `browser_wait_for` shifts to complete
6. `performance_stop_trace`
7. `performance_analyze_insight` for "CLSCulprits"

### For Layout Thrashing
1. `browser_navigate` to the demo URL
2. `performance_start_trace` with `reload: false`, `autoStop: false`
3. `browser_click` on an item in the list to focus the scroll container
4. `browser_press_key` PageDown once to trigger reflows
5. `browser_press_key` Home to scroll back to top
6. `performance_stop_trace`
7. `performance_analyze_insight` for "ForcedReflow"

### For Network Analysis
1. `browser_navigate` to the demo URL
2. Trigger any data loading via `browser_click`
3. `list_network_requests` to see all requests
4. Filter by `resourceTypes` if needed (e.g., `["script"]`, `["image"]`, `["fetch", "xhr"]`)

## Key Element Selectors

Each demo has interactive elements. After taking a snapshot, look for:

- **Trigger buttons**: Usually labeled "Trigger", "Start", "Run", "Load", or similar
- **CLS demo**: Button labeled "Trigger Layout Shifts"
- **INP demo**: Button labeled "Slow Click Handler" and input field
- **Long Tasks demo**: Button to trigger computation
- **Layout Thrashing demo**: Click any "Item N" in the list to focus, PageDown to trigger, Home to reset
- **Memory Leaks demo**: "Add" and "Remove" buttons
- **DOM Size demo**: Button to generate DOM nodes

## Source Code Locations

When reporting root causes, reference these file paths:

| Demo | Bad Component |
|------|---------------|
| Layout Thrashing | `src/components/BadReflowList.jsx` |
| CLS | `src/examples/cls/BadCLSComponent.tsx` |
| LCP | `src/examples/lcp/BadLCPComponent.tsx` |
| INP | `src/examples/inp/BadINPComponent.tsx` |
| Long Tasks | `src/examples/long-tasks/BadLongTask.tsx` |
| Memory Leaks | `src/examples/memory-leaks/BadMemoryLeak.tsx` |
| Render Blocking | `src/examples/render-blocking/BadRenderBlocking.tsx` |
| Excessive DOM | `src/examples/excessive-dom/BadExcessiveDOM.tsx` |
| Animation Jank | `src/examples/animation-jank/BadAnimationJank.tsx` |
| Excessive Re-renders | `src/examples/excessive-rerenders/BadRerender.tsx` |
| Waterfall Requests | `src/examples/waterfall-requests/BadWaterfall.tsx` |
| Third-Party Scripts | `src/examples/third-party-scripts/BadThirdParty.tsx` |
| Font Loading | `src/examples/font-loading/BadFontLoading.tsx` |
| Large Bundle | `src/examples/large-bundle/BadLargeBundle.tsx` |
| Missing Hints | `src/examples/missing-hints/BadMissingHints.tsx` |
| Unoptimized Images | `src/examples/unoptimized-images/BadUnoptimizedImages.tsx` |
| Inline Functions | `src/examples/inline-functions/BadInlineFunctions.tsx` |
| useEffect Issues | `src/examples/useeffect-issues/BadUseEffect.tsx` |
| Scroll Jank | `src/examples/scroll-jank/BadScrollJank.tsx` |
| Suspense Waterfall | `src/examples/suspense-waterfall/BadSuspenseWaterfall.tsx` |
| Hydration Mismatch | `src/examples/hydration-mismatch/BadHydration.tsx` |
| Missing Keys | `src/examples/missing-keys/BadMissingKeys.tsx` |

## Performance Insights Available

After stopping a trace, these insights may be available:

- **LCPBreakdown** - Time breakdown for Largest Contentful Paint
- **LCPDiscovery** - How LCP resource was discovered
- **CLSCulprits** - Elements causing layout shifts
- **ForcedReflow** - Forced synchronous layout events
- **INPBreakdown** - Interaction to Next Paint breakdown
- **ThirdParties** - Impact of third-party scripts
- **RenderBlocking** - Render-blocking resources
- **DocumentLatency** - Document load timing

## Detecting React Anti-Patterns

React issues often show up in console messages and performance traces:

### Using Console Messages
```
list_console_messages with types: ["warn", "error"]
```
Look for:
- "Each child in a list should have a unique key prop" → Missing Keys
- "Cannot update a component while rendering" → Render loop
- "Text content does not match" → Hydration mismatch
- "missing dependency" → useEffect issues

### Using Performance Traces
- **High scripting time on simple interactions** → Inline functions breaking memo
- **Excessive React renders** → Look for repeated component names in flame chart
- **Long Tasks during scroll** → Non-passive scroll listeners

### Using Network Panel
- **Sequential chunk downloads** → Suspense waterfall (nested lazy loading)
- **Repeated API calls** → useEffect over-fetching
