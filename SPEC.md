# Frontend Performance Anti-Patterns Demo

> **Spec-Driven Development (SDD) Specification**
>
> This specification defines an interactive web application for learning frontend performance anti-patterns through hands-on demos and AI-powered analysis.

---

## 1. Overview

### 1.1 Problem Statement

Frontend developers often struggle to identify and fix performance issues because:
- Performance problems are invisible until measured
- DevTools can be overwhelming without guidance
- Real-world anti-patterns are hard to reproduce for learning
- Existing resources are theoretical, not interactive

### 1.2 Solution

Build an interactive demo application that:
- Demonstrates **real** performance anti-patterns (not simulations)
- Provides guided exploration via browser DevTools
- Integrates with **AI coding agents** (Claude Code) for automated analysis
- Covers all Core Web Vitals and common React anti-patterns

### 1.3 Target Users

| User Type | Goal |
|-----------|------|
| **Frontend Developers** | Learn to identify and fix performance issues |
| **Tech Leads** | Train teams on performance best practices |
| **AI/MCP Developers** | Test browser automation with real performance scenarios |

### 1.4 Success Criteria

- [ ] 20+ interactive demos covering major anti-patterns
- [ ] Each demo triggers measurable DevTools warnings
- [ ] Copy-paste AI prompts work with Claude Code + MCP servers
- [ ] Deployable to GitHub Pages with working deep links
- [ ] Mobile-responsive UI with dark mode support

---

## 2. User Stories

### 2.1 Manual Learning Path

```
As a frontend developer
I want to trigger real performance issues in a controlled environment
So that I can learn to identify them in DevTools
```

**Acceptance Criteria:**
- Each demo has a "Trigger" button to activate the anti-pattern
- DevTools shows measurable impact (long tasks, layout shifts, etc.)
- Info boxes explain what to look for in each DevTools panel
- Reset functionality returns demo to initial state

### 2.2 AI-Assisted Analysis Path

```
As a developer using Claude Code
I want copy-paste prompts for each demo
So that I can watch AI agents detect and analyze issues automatically
```

**Acceptance Criteria:**
- Each demo displays a Claude Code prompt
- One-click copy to clipboard with visual feedback
- Prompts specify correct MCP tools (Playwright vs DevTools)
- Prompts include expected insights to analyze

### 2.3 Navigation & Discovery

```
As a new user
I want demos organized by category
So that I can find relevant anti-patterns quickly
```

**Acceptance Criteria:**
- Sidebar groups demos into logical categories
- Active route is visually highlighted
- Mobile-friendly collapsible navigation
- Home page shows all demos in a grid

---

## 3. Functional Requirements

### 3.1 Demo Categories (22 Total)

| Category | Demos | Core Web Vital |
|----------|-------|----------------|
| **Initial Load** | Render-Blocking, Large Bundle, Missing Hints | FCP, LCP |
| **Core Web Vitals** | LCP, CLS, INP, Long Tasks, Images, Fonts | LCP, CLS, INP |
| **Runtime** | Layout Thrashing, Animation Jank, Re-renders, Scroll Jank | INP |
| **Network** | Waterfall Requests, Third-Party Scripts | LCP |
| **Memory & DOM** | Memory Leaks, Excessive DOM | - |
| **React** | Inline Functions, useEffect, Suspense, Hydration, Keys | - |

### 3.2 Demo Page Structure

Each demo page MUST include:

```
┌─────────────────────────────────────────────────────────┐
│ [Title]                                                 │
│ [Description]                                           │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│ │  Problem    │ │  DevTools   │ │    MCP      │        │
│ │  (red)      │ │  (blue)     │ │  (green)    │        │
│ └─────────────┘ └─────────────┘ └─────────────┘        │
├─────────────────────────────────────────────────────────┤
│ Claude Code Prompt                              [Copy]  │
│ "Go to the X demo, start a trace, ..."                 │
├─────────────────────────────────────────────────────────┤
│ Live Demo                                               │
│ ┌─────────────────────────────────────────────────────┐│
│ │ [Interactive demo component]                        ││
│ │ [Trigger button] [Reset button]                     ││
│ │ [Real-time metrics]                                 ││
│ └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### 3.3 Demo Component Requirements

Each `Bad*Component` MUST:

1. **Trigger real performance issues** (not simulated console logs)
2. **Show measurable metrics** (CLS score, LCP time, memory usage)
3. **Provide reset functionality** to restore initial state (where applicable)
4. **Include explanation boxes** with problem description and fix suggestions
5. **Use semantic color coding**:
   - Red: Problem/bad pattern
   - Yellow: Warning/needs improvement
   - Green: Good/fixed pattern
   - Blue: Information/how to fix

**Acceptable Variations:**
- Components that auto-trigger on page load (e.g., LCP, Hydration Mismatch, Unoptimized Images) may use page reload as reset instead of a reset button
- Components demonstrating passive issues (e.g., console warnings) may not require explicit trigger buttons
- Scroll-based demos reset naturally when scrolled back to top

### 3.4 AI Prompt Requirements

Each `aiPrompt` field MUST:

1. Specify the demo name (maps to route)
2. Include interaction steps (navigate, click, type, scroll)
3. Specify trace settings (`reload: true/false`)
4. Name the insight to analyze (LCPBreakdown, CLSCulprits, etc.)
5. Define expected output format

**Example:**
```
"Go to the CLS demo, start a trace, click 'Trigger Layout Shifts',
analyze CLSCulprits and report each shift with its score"
```

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Bundle Size (gzipped) | < 150KB |
| Lighthouse Performance | > 90 |

> Note: Demo components intentionally degrade performance when triggered.
> Base app performance should be excellent.

### 4.2 Compatibility

| Platform | Support |
|----------|---------|
| Browsers | Chrome 90+, Firefox 90+, Safari 15+, Edge 90+ |
| Devices | Desktop, Tablet, Mobile (responsive) |
| Screen readers | Basic accessibility support |

### 4.3 Deployment

| Environment | URL Pattern |
|-------------|-------------|
| Local | `http://localhost:5173/#/[route]` |
| GitHub Pages | `https://[user].github.io/mcp-frontend-perf/#/[route]` |

**Routing:** HashRouter for GitHub Pages compatibility (no server-side config needed)

---

## 5. Technical Architecture

### 5.1 Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | React | 19.x |
| Routing | React Router | 7.x |
| Styling | Tailwind CSS | 4.x |
| Build | Vite | 7.x |
| Language | TypeScript | 5.9.x |
| Deployment | GitHub Pages | - |

### 5.2 Directory Structure

```
src/
├── main.tsx                    # Entry point, theme init
├── index.css                   # Tailwind imports, theme vars
├── router.tsx                  # HashRouter configuration
│
├── components/
│   ├── Layout/
│   │   ├── Layout.tsx          # App shell (Header + Sidebar + Outlet)
│   │   ├── Header.tsx          # Logo, title, theme toggle
│   │   └── Sidebar.tsx         # Category-based navigation
│   │
│   └── shared/
│       ├── ExamplePage.tsx     # Demo page template
│       ├── ClaudePrompt.tsx    # Copy-to-clipboard prompt box
│       └── ThemeToggle.tsx     # Dark/light mode switch
│
├── pages/                      # Route page components (thin wrappers)
│   ├── HomePage.tsx
│   ├── CLSPage.tsx
│   ├── LCPPage.tsx
│   └── [...22 total]
│
├── examples/                   # Demo implementations
│   ├── cls/
│   │   └── BadCLSComponent.tsx
│   ├── lcp/
│   │   └── BadLCPComponent.tsx
│   └── [...22 folders]
│
└── data/
    └── examples.ts             # Demo metadata array
```

### 5.3 Component Hierarchy

```
<RouterProvider>
  └── <Layout>
        ├── <Header>
        │     └── <ThemeToggle />
        ├── <Sidebar />
        └── <Outlet>
              └── <ExamplePage>
                    ├── <ClaudePrompt />
                    └── <Bad*Component />
```

### 5.4 Data Flow

```
examples.ts ──────────────────────────────────────────┐
    │                                                 │
    │ Example metadata                                │
    ▼                                                 │
[Page Component] ─── finds example by id              │
    │                                                 │
    ▼                                                 │
<ExamplePage example={...}>                           │
    │                                                 │
    ├── Renders info boxes from example.problem,     │
    │   example.devtools, example.mcp                 │
    │                                                 │
    ├── Renders <ClaudePrompt prompt={example.aiPrompt} />
    │                                                 │
    └── Renders children (Bad*Component)              │
                                                      │
Sidebar.tsx ◄─────────────────────────────────────────┘
    │
    └── Maps examples array to NavLinks
```

---

## 6. Data Models

### 6.1 Example Interface

```typescript
interface Example {
  // Identification
  id: string;           // Unique kebab-case identifier (e.g., "cls")
  path: string;         // Route path (e.g., "/cls")

  // Display
  title: string;        // Full title (e.g., "Cumulative Layout Shift")
  shortTitle: string;   // Sidebar label (e.g., "CLS")
  description: string;  // One-line description

  // Educational content
  problem: string;      // What causes this issue
  devtools: string;     // How to detect manually
  mcp: string;          // Which MCP tools to use

  // AI integration
  aiPrompt: string;     // Copy-paste prompt for Claude Code
}
```

### 6.2 Theme State

```typescript
type Theme = 'light' | 'dark';

// Persisted in localStorage under key: 'theme'
// Applied via class on document.documentElement
```

### 6.3 Demo State Pattern

```typescript
// Common state shape for demo components
interface DemoState {
  isTriggered: boolean;      // Has the demo been activated?
  isRunning: boolean;        // Is the demo currently running?
  metrics: {
    score?: number;          // CLS score, INP ms, etc.
    duration?: number;       // LCP time, task duration, etc.
    count?: number;          // DOM nodes, re-renders, etc.
  };
}
```

---

## 7. Component Contracts

### 7.1 ExamplePage

```typescript
interface ExamplePageProps {
  example: Example;      // Metadata for the demo
  children: ReactNode;   // Bad*Component to render
}

// Renders:
// - Header with title/description
// - 3-column info grid (Problem, DevTools, MCP)
// - ClaudePrompt section
// - Live demo section with children
```

### 7.2 ClaudePrompt

```typescript
interface ClaudePromptProps {
  prompt: string;        // The AI prompt text
}

// Renders:
// - Styled prompt text box
// - Copy button with click handler
// - "Copied!" feedback state (2s auto-dismiss)
```

### 7.3 Bad*Component Contract

All demo components MUST implement:

```typescript
// Required exports
export default function Bad[Name]Component(): JSX.Element;

// Required UI elements
- Trigger button (activates the anti-pattern)
- Reset button (returns to initial state)
- Metrics display (shows measurable impact)
- Problem explanation (red/orange box)
- Fix suggestion (blue box)

// Required behavior
- Must trigger REAL performance issues (not simulations)
- Must be measurable via DevTools
- Must support reset without page reload
- Must clean up resources on unmount
```

---

## 8. Implementation Tasks

### Phase 1: Foundation

- [ ] **T1.1** Initialize Vite + React + TypeScript project
- [ ] **T1.2** Configure Tailwind CSS v4 with custom theme
- [ ] **T1.3** Set up HashRouter with base path for GitHub Pages
- [ ] **T1.4** Create Layout components (Header, Sidebar, Layout)
- [ ] **T1.5** Implement ThemeToggle with localStorage persistence
- [ ] **T1.6** Create ExamplePage template component
- [ ] **T1.7** Create ClaudePrompt component with copy functionality
- [ ] **T1.8** Define Example interface and examples.ts data file

### Phase 2: Core Web Vitals Demos

- [ ] **T2.1** Implement BadLCPComponent (delayed hero image)
- [ ] **T2.2** Implement BadCLSComponent (late-loading content)
- [ ] **T2.3** Implement BadINPComponent (slow event handlers)
- [ ] **T2.4** Implement BadLongTask (main thread blocking)
- [ ] **T2.5** Create corresponding Page components
- [ ] **T2.6** Add examples data with AI prompts

### Phase 3: Initial Load Demos

- [ ] **T3.1** Implement BadRenderBlocking (sync scripts)
- [ ] **T3.2** Implement BadLargeBundle (bundle size)
- [ ] **T3.3** Implement BadMissingHints (resource hints)
- [ ] **T3.4** Create Page components and examples data

### Phase 4: Runtime Performance Demos

- [ ] **T4.1** Implement BadReflowList (layout thrashing)
- [ ] **T4.2** Implement BadAnimationComponent (jank)
- [ ] **T4.3** Implement BadRerendersComponent (excessive re-renders)
- [ ] **T4.4** Implement BadScrollJank (scroll performance)
- [ ] **T4.5** Create Page components and examples data

### Phase 5: Network & Memory Demos

- [ ] **T5.1** Implement BadWaterfallComponent (sequential requests)
- [ ] **T5.2** Implement BadThirdPartyComponent (external scripts)
- [ ] **T5.3** Implement BadMemoryLeak (detached DOM)
- [ ] **T5.4** Implement BadExcessiveDOM (DOM size)
- [ ] **T5.5** Implement BadImagesComponent (unoptimized images)
- [ ] **T5.6** Implement BadFontComponent (font loading)
- [ ] **T5.7** Create Page components and examples data

### Phase 6: React Anti-Pattern Demos

- [ ] **T6.1** Implement BadInlineFunctions (memo breaking)
- [ ] **T6.2** Implement BadUseEffect (effect issues)
- [ ] **T6.3** Implement BadSuspenseWaterfall (lazy loading)
- [ ] **T6.4** Implement BadHydration (SSR mismatch)
- [ ] **T6.5** Implement BadMissingKeys (list keys)
- [ ] **T6.6** Create Page components and examples data

### Phase 7: Polish & Documentation

- [ ] **T7.1** Create HomePage with demo grid and setup instructions
- [ ] **T7.2** Add mobile-responsive navigation
- [ ] **T7.3** Write CLAUDE.md with MCP instructions
- [ ] **T7.4** Configure GitHub Pages deployment
- [ ] **T7.5** Test all AI prompts with Claude Code
- [ ] **T7.6** Verify all demos trigger measurable DevTools warnings

---

## 9. AI/MCP Integration Specification

### 9.1 Required MCP Servers

| Server | Purpose | Key Tools |
|--------|---------|-----------|
| **Playwright MCP** | Browser automation | `browser_navigate`, `browser_click`, `browser_snapshot` |
| **Chrome DevTools MCP** | Performance analysis | `performance_start_trace`, `performance_stop_trace`, `performance_analyze_insight` |

### 9.2 Tool Selection Rules

```
Navigation         → Playwright (browser_navigate)
Page interactions  → Playwright (browser_click, browser_type)
Finding elements   → Playwright (browser_snapshot)
Performance traces → Chrome DevTools (performance_start_trace)
Insights analysis  → Chrome DevTools (performance_analyze_insight)
Network requests   → Chrome DevTools (list_network_requests)
JavaScript execution → Chrome DevTools (evaluate_script)
Scrolling          → Playwright (browser_press_key PageDown/Home)
```

### 9.3 Available Performance Insights

| Insight | Use Case |
|---------|----------|
| `LCPBreakdown` | Analyze LCP phases (TTFB, load delay, render delay) |
| `CLSCulprits` | Identify elements causing layout shifts |
| `INPBreakdown` | Analyze interaction latency |
| `ForcedReflow` | Find layout thrashing root causes |
| `ThirdParties` | Measure third-party script impact |
| `FontDisplay` | Detect FOIT/FOUT issues |
| `RenderBlocking` | Identify render-blocking resources |

### 9.4 Prompt Template

```
Go to the [demo name] demo,
[setup: start a trace / record with reload],
[interaction: click X / type Y / scroll Z],
[analysis: analyze [Insight] for/and report [expected output]]
```

---

## 10. Acceptance Criteria Summary

### Demo Quality

- [ ] Each demo triggers real, measurable performance issues
- [ ] Metrics are displayed in real-time
- [ ] Reset functionality works without page reload
- [ ] Explanations are clear and actionable

### AI Integration

- [ ] All prompts work with Claude Code + MCP servers
- [ ] Prompts specify correct tools and insights
- [ ] Copy-to-clipboard works with visual feedback

### User Experience

- [ ] Mobile-responsive layout
- [ ] Dark mode with persistence
- [ ] Fast initial load (< 1.5s FCP)
- [ ] Smooth navigation between demos

### Deployment

- [ ] Builds successfully with `npm run build`
- [ ] Deploys to GitHub Pages with `npm run deploy`
- [ ] Deep links work (HashRouter)
- [ ] Assets load correctly with base path

---

## Appendix A: Demo Specifications

### A.1 CLS Demo

**Anti-Pattern:** Late-loading content without reserved space

**Implementation:**
```typescript
// Trigger: Click button
// Effect: Inject banners/ads after delays (500ms, 1000ms, 1500ms)
// Measurement: Calculate CLS score using PerformanceObserver
// Reset: Remove injected elements, reset score
```

**Expected DevTools Output:**
- Experience track shows layout shift events
- CLS score > 0.1 (needs improvement)

### A.2 LCP Demo

**Anti-Pattern:** Chained API calls delaying hero image

**Implementation:**
```typescript
// Trigger: Page load (or button click)
// Effect: Simulate 2s API delay before loading hero image
// Measurement: Calculate time from navigation to image render
// Reset: Remove image, reset timer
```

**Expected DevTools Output:**
- LCP > 2500ms (poor)
- LCPBreakdown shows high "load delay" phase

### A.3 INP Demo

**Anti-Pattern:** Expensive synchronous event handlers

**Implementation:**
```typescript
// Trigger: Click button / type in input
// Effect: Run 10M iteration loop (click) or 5M loop (keystroke)
// Measurement: Show interaction duration
// Reset: N/A (always interactive)
```

**Expected DevTools Output:**
- INP > 200ms (poor)
- Long task markers in Performance panel

### A.4 Layout Thrashing Demo

**Anti-Pattern:** Interleaved DOM reads/writes in scroll handler

**Implementation:**
```typescript
// Trigger: Scroll the list container
// Effect: Read offsetHeight, write style.height in loop
// Measurement: Count forced reflows
// Reset: Scroll to top
```

**Expected DevTools Output:**
- Purple "Layout" bars in Performance panel
- "Forced reflow" warnings
- ForcedReflow insight shows root cause function

---

## Appendix B: Color System

```css
/* Semantic Colors */
--color-primary: #646cff;        /* Links, active states */
--color-success: green-*;        /* Good patterns, passing metrics */
--color-warning: yellow-*;       /* Needs improvement */
--color-error: red-*;            /* Bad patterns, failing metrics */
--color-info: blue-*;            /* Tips, suggestions, DevTools hints */

/* Dark Mode */
.dark {
  --bg-primary: gray-900;
  --text-primary: gray-100;
  --border-primary: gray-700;
}
```

---

## Appendix C: Route Map

| Route | Page | Demo Component |
|-------|------|----------------|
| `/` | HomePage | - |
| `/render-blocking` | RenderBlockingPage | BadRenderBlocking |
| `/large-bundle` | LargeBundlePage | BadLargeBundle |
| `/missing-hints` | MissingHintsPage | BadMissingHints |
| `/lcp` | LCPPage | BadLCPComponent |
| `/unoptimized-images` | UnoptimizedImagesPage | BadImagesComponent |
| `/font-loading` | FontLoadingPage | BadFontComponent |
| `/cls` | CLSPage | BadCLSComponent |
| `/inp` | INPPage | BadINPComponent |
| `/long-tasks` | LongTasksPage | BadLongTask |
| `/layout-thrashing` | LayoutThrashingPage | BadReflowList |
| `/animation-jank` | AnimationJankPage | BadAnimationComponent |
| `/excessive-rerenders` | ExcessiveRerendersPage | BadRerendersComponent |
| `/scroll-jank` | ScrollJankPage | BadScrollJank |
| `/waterfall-requests` | WaterfallRequestsPage | BadWaterfallComponent |
| `/third-party-scripts` | ThirdPartyScriptsPage | BadThirdPartyComponent |
| `/memory-leaks` | MemoryLeaksPage | BadMemoryLeak |
| `/excessive-dom` | ExcessiveDOMPage | BadExcessiveDOM |
| `/inline-functions` | InlineFunctionsPage | BadInlineFunctions |
| `/useeffect-issues` | UseEffectIssuesPage | BadUseEffect |
| `/suspense-waterfall` | SuspenseWaterfallPage | BadSuspenseWaterfall |
| `/hydration-mismatch` | HydrationMismatchPage | BadHydration |
| `/missing-keys` | MissingKeysPage | BadMissingKeys |

---

*End of Specification*
