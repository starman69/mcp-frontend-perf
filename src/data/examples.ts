export interface Example {
  id: string;
  path: string;
  title: string;
  shortTitle: string;
  description: string;
  problem: string;
  devtools: string;
  mcp: string;
  aiPrompt: string;
}

export const examples: Example[] = [
  // =========================================
  // INITIAL LOAD - What blocks the page
  // =========================================
  {
    id: 'render-blocking',
    path: '/render-blocking',
    title: 'Render-Blocking Resources',
    shortTitle: 'Render Block',
    description: 'Synchronous scripts blocking initial page render',
    problem: 'Synchronous script in head blocking paint',
    devtools: 'Performance panel > Main thread blocking, FCP delay',
    mcp: 'Playwright for interactions, DevTools for tracing',
    aiPrompt: 'Go to the render-blocking demo, click the simulate button, record a trace, and report total blocking time with root cause scripts',
  },
  {
    id: 'large-bundle',
    path: '/large-bundle',
    title: 'Large Bundle Size',
    shortTitle: 'Bundle Size',
    description: 'Oversized JavaScript bundles delaying interactivity',
    problem: 'No code splitting, importing entire libraries',
    devtools: 'Network panel > JS size, Coverage panel for unused code',
    mcp: 'Playwright for navigation, DevTools for network analysis',
    aiPrompt: 'Go to the bundle size demo, list network requests filtered by JavaScript, and report total JS size with the largest bundles',
  },
  {
    id: 'missing-hints',
    path: '/missing-hints',
    title: 'Missing Resource Hints',
    shortTitle: 'Resource Hints',
    description: 'No preload/prefetch/preconnect for critical resources',
    problem: 'Late discovery of critical resources',
    devtools: 'Network panel > initiator chain, waterfall gaps',
    mcp: 'Playwright for navigation, DevTools for network analysis',
    aiPrompt: 'Go to the resource hints demo, analyze the network waterfall and dependency tree, identify resources that need preload or preconnect hints',
  },

  // =========================================
  // CORE WEB VITALS - LCP (Loading)
  // =========================================
  {
    id: 'lcp',
    path: '/lcp',
    title: 'Largest Contentful Paint (LCP)',
    shortTitle: 'LCP',
    description: 'Delayed rendering of the largest visible content',
    problem: 'Chained API calls delaying hero image load',
    devtools: 'Performance panel > LCP marker, Timings track, LCP Breakdown insight',
    mcp: 'Playwright for navigation, DevTools for tracing',
    aiPrompt: 'Go to the LCP demo, record a trace with page reload, analyze LCPBreakdown to identify what caused the slow LCP',
  },
  {
    id: 'unoptimized-images',
    path: '/unoptimized-images',
    title: 'Unoptimized Images',
    shortTitle: 'Images',
    description: 'Large images without proper optimization or lazy loading',
    problem: 'Oversized images, wrong format, no lazy loading',
    devtools: 'Network panel > image sizes and formats',
    mcp: 'Playwright for scrolling, DevTools for network analysis',
    aiPrompt: 'Go to the images demo, scroll to load all images, list network requests filtered by images, report oversized or inefficient formats',
  },
  {
    id: 'font-loading',
    path: '/font-loading',
    title: 'Web Font Loading Issues',
    shortTitle: 'Fonts',
    description: 'FOIT/FOUT from web font loading',
    problem: 'Flash of invisible/unstyled text during font load',
    devtools: 'Network panel > font requests, Performance > text rendering delays',
    mcp: 'Playwright for navigation, DevTools for tracing',
    aiPrompt: 'Go to the font demo, record a trace with reload, check font load timing and report any FOIT or FOUT issues',
  },

  // =========================================
  // CORE WEB VITALS - CLS (Visual Stability)
  // =========================================
  {
    id: 'cls',
    path: '/cls',
    title: 'Cumulative Layout Shift (CLS)',
    shortTitle: 'CLS',
    description: 'Layout shifts from late-loading content and unsized images',
    problem: 'Late-loading ads/banners injecting without reserved space',
    devtools: 'Performance panel > Experience track, Layout Shifts, CLS score',
    mcp: 'Playwright for interactions, DevTools for tracing',
    aiPrompt: 'Go to the CLS demo, start a trace, click "Trigger Layout Shifts", analyze CLSCulprits and report each shift with its score',
  },

  // =========================================
  // CORE WEB VITALS - INP (Interactivity)
  // =========================================
  {
    id: 'inp',
    path: '/inp',
    title: 'Interaction to Next Paint (INP)',
    shortTitle: 'INP',
    description: 'Slow responsiveness from expensive event handlers',
    problem: 'Slow click handler, expensive keystroke filtering',
    devtools: 'Performance panel > Interactions track, INP marker',
    mcp: 'Playwright for interactions, DevTools for tracing',
    aiPrompt: 'Go to the INP demo, start a trace, click the slow button 3 times and type in the input, analyze INPBreakdown to find the slowest interaction',
  },
  {
    id: 'long-tasks',
    path: '/long-tasks',
    title: 'Long Tasks',
    shortTitle: 'Long Tasks',
    description: 'Main thread blocking from heavy synchronous computation',
    problem: 'Synchronous heavy computation blocking UI',
    devtools: 'Performance panel > red "Long Task" markers (>50ms)',
    mcp: 'Playwright for interactions, DevTools for tracing',
    aiPrompt: 'Go to the long tasks demo, start a trace, click the button to trigger computation, report main thread blocking time',
  },

  // =========================================
  // RUNTIME PERFORMANCE
  // =========================================
  {
    id: 'layout-thrashing',
    path: '/layout-thrashing',
    title: 'Layout Thrashing',
    shortTitle: 'Layout Thrash',
    description: 'Forced synchronous layout from interleaved DOM reads/writes',
    problem: 'Interleaved DOM reads/writes in scroll handler',
    devtools: 'Performance panel > purple Layout bars, "Forced Reflow" warning',
    mcp: 'Playwright for scrolling (click list item, PageDown, then Home), DevTools for tracing',
    aiPrompt: 'Go to the layout thrashing demo, start a trace, click an item in the list, press PageDown once to trigger reflows, press Home to scroll back to top, stop the trace, analyze ForcedReflow for root cause function and total reflow time',
  },
  {
    id: 'animation-jank',
    path: '/animation-jank',
    title: 'Animation Jank',
    shortTitle: 'Jank',
    description: 'Janky animations from animating expensive properties',
    problem: 'Animating width/height/top instead of transform',
    devtools: 'Performance panel > dropped frames, Layout recalcs during animation',
    mcp: 'Playwright for interactions, DevTools for tracing',
    aiPrompt: 'Go to the animation jank demo, start a trace, trigger both animations, compare layout recalculations between janky and smooth versions',
  },
  {
    id: 'excessive-rerenders',
    path: '/excessive-rerenders',
    title: 'Excessive Re-renders',
    shortTitle: 'Re-renders',
    description: 'React components re-rendering unnecessarily',
    problem: 'Missing memo, unstable references, context overuse',
    devtools: 'React DevTools Profiler, Performance panel > scripting time',
    mcp: 'Playwright for interactions, DevTools for tracing',
    aiPrompt: 'Go to the re-renders demo, start a trace, type in the input fields, report scripting time spent on React rendering',
  },

  // =========================================
  // NETWORK ISSUES
  // =========================================
  {
    id: 'waterfall-requests',
    path: '/waterfall-requests',
    title: 'Waterfall Requests',
    shortTitle: 'Waterfall',
    description: 'Sequential network requests instead of parallel',
    problem: 'Chained API calls blocking on each other',
    devtools: 'Network panel > waterfall visualization, timing gaps',
    mcp: 'Playwright for interactions, DevTools for network analysis',
    aiPrompt: 'Go to the waterfall demo, trigger the API calls, list network requests and identify the sequential chain with total time wasted',
  },
  {
    id: 'third-party-scripts',
    path: '/third-party-scripts',
    title: 'Third-Party Scripts',
    shortTitle: '3rd Party',
    description: 'External scripts impacting page performance',
    problem: 'Analytics, ads, widgets blocking main thread',
    devtools: 'Network panel > 3rd party filter, Performance > bottom-up by domain',
    mcp: 'Playwright for navigation, DevTools for tracing',
    aiPrompt: 'Go to the third-party scripts demo, record a trace with reload, analyze ThirdParties insight for scripts with biggest main thread impact',
  },

  // =========================================
  // MEMORY & DOM (Long Session Issues)
  // =========================================
  {
    id: 'memory-leaks',
    path: '/memory-leaks',
    title: 'Memory Leaks',
    shortTitle: 'Memory Leaks',
    description: 'Detached DOM nodes and leaked event listeners',
    problem: 'DOM nodes not garbage collected after removal',
    devtools: 'Memory panel > Heap snapshots, filter "Detached"',
    mcp: 'Playwright for interactions, DevTools for memory checks',
    aiPrompt: 'Go to the memory leaks demo, click the leak button 10 times, check performance.memory before and after, report if memory is not being freed',
  },
  {
    id: 'excessive-dom',
    path: '/excessive-dom',
    title: 'Excessive DOM Size',
    shortTitle: 'DOM Size',
    description: 'Too many DOM nodes causing memory and layout issues',
    problem: '10k+ deeply nested elements slowing everything',
    devtools: 'Elements panel lag, Performance panel > layout time',
    mcp: 'Playwright for interactions, DevTools for DOM queries',
    aiPrompt: 'Go to the DOM size demo, click to generate the large DOM, count nodes and report impact on layout performance',
  },

  // =========================================
  // REACT ANTI-PATTERNS
  // =========================================
  {
    id: 'inline-functions',
    path: '/inline-functions',
    title: 'Inline Functions in JSX',
    shortTitle: 'Inline Funcs',
    description: 'Arrow functions in props breaking React.memo optimization',
    problem: 'New function references created every render',
    devtools: 'Performance panel > high scripting time on parent re-render',
    mcp: 'Playwright for interactions, DevTools for tracing',
    aiPrompt: 'Go to the inline functions demo, start a trace, click the counter button 5 times, measure scripting time to show memoization is broken',
  },
  {
    id: 'useeffect-issues',
    path: '/useeffect-issues',
    title: 'useEffect Issues',
    shortTitle: 'useEffect',
    description: 'Missing dependencies, infinite loops, stale closures',
    problem: 'Effects running too often or with stale data',
    devtools: 'Console warnings, Network panel for over-fetching',
    mcp: 'DevTools for console messages and network analysis',
    aiPrompt: 'Go to the useEffect demo, list console messages to find React warnings, check if changing the user ID triggers a refetch',
  },
  {
    id: 'scroll-jank',
    path: '/scroll-jank',
    title: 'Scroll Jank',
    shortTitle: 'Scroll Jank',
    description: 'Non-passive scroll listeners blocking smooth scrolling',
    problem: 'Scroll handlers blocking main thread',
    devtools: 'Performance panel > Input Latency, Long Tasks during scroll',
    mcp: 'DevTools for tracing and scrolling via evaluate_script',
    aiPrompt: 'Go to the scroll jank demo, start a trace, scroll the list via evaluate_script, check for Long Tasks and input latency during scroll',
  },
  {
    id: 'suspense-waterfall',
    path: '/suspense-waterfall',
    title: 'Suspense Waterfall',
    shortTitle: 'Suspense',
    description: 'Sequential lazy loading instead of parallel',
    problem: 'Nested Suspense causing component load waterfall',
    devtools: 'Network panel > sequential chunk downloads',
    mcp: 'Playwright for interactions, DevTools for network timing',
    aiPrompt: 'Go to the suspense demo, click both load buttons, compare network timing - waterfall should take 4x longer than parallel',
  },
  {
    id: 'hydration-mismatch',
    path: '/hydration-mismatch',
    title: 'Hydration Mismatch',
    shortTitle: 'Hydration',
    description: 'Server/client HTML differences causing re-renders',
    problem: 'Using Date.now(), Math.random(), or window in initial render',
    devtools: 'Console warnings about hydration mismatches',
    mcp: 'DevTools for console messages showing hydration warnings',
    aiPrompt: 'Go to the hydration demo, list console messages filtering for warnings, identify the simulated hydration mismatch errors',
  },
  {
    id: 'missing-keys',
    path: '/missing-keys',
    title: 'Missing/Unstable Keys',
    shortTitle: 'Keys',
    description: 'Using index as key or missing keys in lists',
    problem: 'React incorrectly reuses components on list changes',
    devtools: 'Console warnings, incorrect UI behavior on reorder',
    mcp: 'Playwright for interactions, DevTools for console warnings',
    aiPrompt: 'Go to the missing keys demo, click shuffle button, list console messages to find React key warnings, describe the visual bug',
  },
];
