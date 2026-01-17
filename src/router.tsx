import { createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
// Core Web Vitals
import LayoutThrashingPage from './pages/LayoutThrashingPage';
import CLSPage from './pages/CLSPage';
import LCPPage from './pages/LCPPage';
import INPPage from './pages/INPPage';
// JavaScript Performance
import LongTasksPage from './pages/LongTasksPage';
import ExcessiveRerendersPage from './pages/ExcessiveRerendersPage';
import RenderBlockingPage from './pages/RenderBlockingPage';
import LargeBundlePage from './pages/LargeBundlePage';
// Memory & DOM
import MemoryLeaksPage from './pages/MemoryLeaksPage';
import ExcessiveDOMPage from './pages/ExcessiveDOMPage';
// Network & Loading
import WaterfallRequestsPage from './pages/WaterfallRequestsPage';
import UnoptimizedImagesPage from './pages/UnoptimizedImagesPage';
import ThirdPartyScriptsPage from './pages/ThirdPartyScriptsPage';
// Rendering & Animation
import AnimationJankPage from './pages/AnimationJankPage';
import FontLoadingPage from './pages/FontLoadingPage';
import MissingHintsPage from './pages/MissingHintsPage';
// React Anti-Patterns
import InlineFunctionsPage from './pages/InlineFunctionsPage';
import UseEffectIssuesPage from './pages/UseEffectIssuesPage';
import ScrollJankPage from './pages/ScrollJankPage';
import SuspenseWaterfallPage from './pages/SuspenseWaterfallPage';
import HydrationMismatchPage from './pages/HydrationMismatchPage';
import MissingKeysPage from './pages/MissingKeysPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // Core Web Vitals
      {
        path: 'layout-thrashing',
        element: <LayoutThrashingPage />,
      },
      {
        path: 'cls',
        element: <CLSPage />,
      },
      {
        path: 'lcp',
        element: <LCPPage />,
      },
      {
        path: 'inp',
        element: <INPPage />,
      },
      // JavaScript Performance
      {
        path: 'long-tasks',
        element: <LongTasksPage />,
      },
      {
        path: 'excessive-rerenders',
        element: <ExcessiveRerendersPage />,
      },
      {
        path: 'render-blocking',
        element: <RenderBlockingPage />,
      },
      {
        path: 'large-bundle',
        element: <LargeBundlePage />,
      },
      // Memory & DOM
      {
        path: 'memory-leaks',
        element: <MemoryLeaksPage />,
      },
      {
        path: 'excessive-dom',
        element: <ExcessiveDOMPage />,
      },
      // Network & Loading
      {
        path: 'waterfall-requests',
        element: <WaterfallRequestsPage />,
      },
      {
        path: 'unoptimized-images',
        element: <UnoptimizedImagesPage />,
      },
      {
        path: 'third-party-scripts',
        element: <ThirdPartyScriptsPage />,
      },
      // Rendering & Animation
      {
        path: 'animation-jank',
        element: <AnimationJankPage />,
      },
      {
        path: 'font-loading',
        element: <FontLoadingPage />,
      },
      {
        path: 'missing-hints',
        element: <MissingHintsPage />,
      },
      // React Anti-Patterns
      {
        path: 'inline-functions',
        element: <InlineFunctionsPage />,
      },
      {
        path: 'useeffect-issues',
        element: <UseEffectIssuesPage />,
      },
      {
        path: 'scroll-jank',
        element: <ScrollJankPage />,
      },
      {
        path: 'suspense-waterfall',
        element: <SuspenseWaterfallPage />,
      },
      {
        path: 'hydration-mismatch',
        element: <HydrationMismatchPage />,
      },
      {
        path: 'missing-keys',
        element: <MissingKeysPage />,
      },
    ],
  },
]);
