# mcp-frontend-perf

A frontend performance anti-patterns demo showcasing AI-powered root cause analysis using Claude Code with MCP (Model Context Protocol) servers for browser automation.

## What This Is

This project demonstrates how AI can automatically detect, analyze, and diagnose web performance issues by connecting directly to browser DevTools. It includes intentionally "bad" performance demos that trigger real Core Web Vitals warnings.

**Key Features:**
- 22 live performance anti-pattern demos (LCP, CLS, INP, Layout Thrashing, etc.)
- AI-powered root cause analysis via MCP browser tools
- Automated performance tracing and insights extraction
- Real DevTools metrics, not simulations
- Copy-paste prompts for Claude Code on every demo

**Quick Start:**
1. Press `F12` to open DevTools Performance panel
2. Navigate to any demo and trigger the anti-pattern
3. Or use Claude Code with the suggested prompt to automate the analysis

## MCP Browser Architecture

```
┌─────────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│   Claude Code   │────▶│   MCP Servers        │────▶│  Chrome Canary  │
│   (AI Agent)    │     │                      │     │  (CDP Target)   │
└─────────────────┘     │  ┌────────────────┐  │     └─────────────────┘
                        │  │ Playwright MCP │  │              │
                        │  └────────────────┘  │              │
                        │  ┌────────────────┐  │     Chrome DevTools
                        │  │ Chrome DevTools│  │       Protocol
                        │  │     MCP        │  │        (CDP)
                        │  └────────────────┘  │
                        └──────────────────────┘
```

Both MCP servers use **Chrome DevTools Protocol (CDP)** to communicate with the browser, enabling:
- Performance trace recording and analysis
- DOM inspection and interaction
- Network request monitoring
- Console message capture
- Screenshot and snapshot capture

## Why Chrome Canary?

We use **Chrome Canary** as the target browser because:

- **Isolated from daily browsing** - Doesn't affect your main Chrome or Edge profiles
- **Run simultaneously** - Use Canary for testing while keeping Chrome/Edge open for work
- **Latest DevTools features** - Access to newest performance insights
- **Separate user data** - Fresh profile without extensions interfering

## Setup

### 1. Install Chrome Canary

Download from: https://www.google.com/chrome/canary/

### 2. Launch Chrome Canary with Remote Debugging

```bash
# macOS
/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --remote-debugging-port=9222

# Windows
"C:\Users\<USER>\AppData\Local\Google\Chrome SxS\Application\chrome.exe" --remote-debugging-port=9222

# Linux
google-chrome-canary --remote-debugging-port=9222
```

### 3. Configure MCP Servers

Add to your Claude Code MCP settings (`~/.claude.json` or project `.mcp.json`):

```json
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--cdp-endpoint=http://127.0.0.1:9222"],
      "env": {}
    },
    "chrome-devtools": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "--browser-url=http://127.0.0.1:9222"],
      "env": {}
    }
  }
}
```

### 4. Install and Run the Demo App

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` (or next available port).

## Performance Anti-Patterns Included

Each demo includes:
- **Problem** - What causes the issue
- **DevTools Detection** - How to find it manually
- **MCP Automation** - Playwright for interaction, Chrome DevTools for metrics
- **Claude Code Prompt** - Copy-paste prompt for AI analysis

| Demo | Core Web Vital | What It Demonstrates |
|------|---------------|---------------------|
| **Render Blocking** | FCP | Synchronous scripts blocking paint |
| **Large Bundle** | FCP | Unoptimized JavaScript bundles |
| **Missing Resource Hints** | LCP | No preload/preconnect |
| **LCP** | LCP | Delayed hero image, chained API calls |
| **Unoptimized Images** | LCP | Large, uncompressed images |
| **Font Loading** | CLS/FCP | FOUT/FOIT flash issues |
| **CLS** | CLS | Late-injecting ads, images without dimensions |
| **INP** | INP | Slow event handlers blocking interaction |
| **Long Tasks** | INP | Main thread blocking >50ms |
| **Layout Thrashing** | - | Forced synchronous layouts from read/write interleaving |
| **Animation Jank** | - | Non-composited animations |
| **Excessive Re-renders** | - | React re-render storms |
| **Waterfall Requests** | - | Chained network dependencies |
| **Third Party Scripts** | - | Heavy external script impact |
| **Memory Leaks** | - | Detached DOM nodes, event listener leaks |
| **Excessive DOM** | - | 10,000+ DOM nodes |
| **Inline Functions** | - | Functions breaking React.memo optimization |
| **useEffect Issues** | - | Missing dependencies, over-fetching |
| **Scroll Jank** | - | Non-passive scroll listeners, heavy handlers |
| **Suspense Waterfall** | - | Nested lazy loading creating request chains |
| **Hydration Mismatch** | - | Server/client HTML differences |
| **Missing Keys** | - | React list rendering without unique keys |

## Using AI for Root Cause Analysis

### Example: Analyzing Layout Thrashing

```
You: "Navigate to localhost:5173/layout-thrashing, record a performance
      trace while scrolling, and tell me what's causing the forced reflows"
```

Claude will:
1. Navigate to the page using MCP
2. Start a performance trace
3. Trigger scrolling via browser automation
4. Stop the trace and analyze insights
5. Report the exact function and line causing forced reflows

### Example: Diagnosing Bad LCP

```
You: "Load the LCP demo with a performance trace and break down
      what's contributing to the slow LCP time"
```

Claude will:
1. Start trace with page reload
2. Wait for LCP element to load
3. Analyze LCP breakdown (TTFB, load delay, render delay)
4. Identify missing optimizations (preload hints, fetchpriority)

### Example: CLS Analysis

```
You: "Go to the CLS demo, trigger the layout shifts, and tell me
      what's causing the bad CLS score"
```

Claude will:
1. Navigate and take initial snapshot
2. Start performance trace
3. Click the trigger button
4. Analyze CLSCulprits insight
5. Report each layout shift with timing and score

## MCP Tools Available

### Chrome DevTools MCP

| Tool | Purpose |
|------|---------|
| `performance_start_trace` | Begin recording performance trace |
| `performance_stop_trace` | Stop recording, get metrics and insights |
| `performance_analyze_insight` | Deep dive into specific insight |
| `take_snapshot` | Capture accessibility tree snapshot |
| `take_screenshot` | Capture visual screenshot |
| `list_network_requests` | View all network activity |
| `list_console_messages` | View console output |
| `evaluate_script` | Run JavaScript in page context |
| `click` / `fill` / `hover` | Interact with page elements |

### Playwright MCP

| Tool | Purpose |
|------|---------|
| `browser_navigate` | Navigate to URL |
| `browser_snapshot` | Capture page state |
| `browser_click` | Click elements |
| `browser_type` | Type into inputs |
| `browser_evaluate` | Execute JavaScript |
| `browser_take_screenshot` | Capture screenshots |

## When to Use Which MCP

| Use Case | Better Tool |
|----------|-------------|
| Deep performance analysis | Chrome DevTools MCP |
| Performance insights (LCP, CLS, ForcedReflow) | Chrome DevTools MCP |
| Memory profiling | Chrome DevTools MCP |
| Cross-browser testing | Playwright MCP |
| Headless automation | Playwright MCP |
| CI/CD pipelines | Playwright MCP |
| Connecting to existing browser | Chrome DevTools MCP |

## Example Session

```bash
# Terminal 1: Start Chrome Canary with remote debugging
google-chrome-canary --remote-debugging-port=9222

# Terminal 2: Start the demo app
cd mcp-frontend-perf
npm run dev

# Terminal 3: Start Claude Code
claude

# In Claude Code, ask:
> "Using chrome devtools, navigate to localhost:5173/cls,
   trigger the layout shifts, and analyze the CLS score"
```

## Sample Analysis Output

When Claude analyzes the Layout Thrashing demo, you get results like:

```
Performance Analysis: Layout Thrashing Demo

Total Forced Reflow Time: 721 ms

Root Cause: onScroll @ BadReflowList.jsx:13

Call frames causing reflow:
- Line 17:28 - offsetHeight read: 327 ms
- Line 20:31 - offsetWidth read: 20 ms
- Line 22:26 - style.width write then read: 374 ms

Problem: Interleaved DOM reads/writes in scroll handler
Fix: Batch all reads first, then batch all writes
```

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for dev server
- **Tailwind CSS v4** for styling
- **React Router** for navigation

## License

MIT
