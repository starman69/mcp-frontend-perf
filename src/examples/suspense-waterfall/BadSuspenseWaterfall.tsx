import { Suspense, lazy, useState } from 'react';

// Simulate slow dynamic imports with artificial delays
const createSlowComponent = (name: string, delay: number, color: string) => {
  return lazy(() =>
    new Promise<{ default: React.ComponentType }>((resolve) =>
      setTimeout(
        () =>
          resolve({
            default: () => (
              <div className={`p-4 ${color} rounded`}>
                <strong>{name}</strong> loaded after {delay}ms
              </div>
            ),
          }),
        delay
      )
    )
  );
};

// BAD: Each component loads sequentially due to nested Suspense
const Header = createSlowComponent('Header', 500, 'bg-blue-100 dark:bg-blue-900/30');
const Sidebar = createSlowComponent('Sidebar', 500, 'bg-green-100 dark:bg-green-900/30');
const Content = createSlowComponent('Content', 500, 'bg-purple-100 dark:bg-purple-900/30');
const Footer = createSlowComponent('Footer', 500, 'bg-orange-100 dark:bg-orange-900/30');

function LoadingSpinner({ label }: { label: string }) {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse">
      Loading {label}...
    </div>
  );
}

// BAD Pattern: Nested Suspense causing waterfall
function BadWaterfallLayout() {
  return (
    <div className="space-y-2">
      {/* Each Suspense boundary waits for the previous to resolve */}
      <Suspense fallback={<LoadingSpinner label="Header" />}>
        <Header />
        <Suspense fallback={<LoadingSpinner label="Sidebar" />}>
          <Sidebar />
          <Suspense fallback={<LoadingSpinner label="Content" />}>
            <Content />
            <Suspense fallback={<LoadingSpinner label="Footer" />}>
              <Footer />
            </Suspense>
          </Suspense>
        </Suspense>
      </Suspense>
    </div>
  );
}

// GOOD Pattern: Parallel Suspense (for comparison)
function GoodParallelLayout() {
  return (
    <div className="space-y-2">
      {/* All components load in parallel with a single boundary */}
      <Suspense
        fallback={
          <div className="space-y-2">
            <LoadingSpinner label="Header" />
            <LoadingSpinner label="Sidebar" />
            <LoadingSpinner label="Content" />
            <LoadingSpinner label="Footer" />
          </div>
        }
      >
        <Header />
        <Sidebar />
        <Content />
        <Footer />
      </Suspense>
    </div>
  );
}

export default function BadSuspenseWaterfall() {
  const [mode, setMode] = useState<'waterfall' | 'parallel' | null>(null);
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  const startDemo = (demoMode: 'waterfall' | 'parallel') => {
    setMode(null);
    setLoadTime(null);
    // Force remount by waiting a tick
    setTimeout(() => {
      setStartTime(Date.now());
      setMode(demoMode);
    }, 100);
  };

  // Track when loading completes
  if (startTime && mode && !loadTime) {
    // Check if we're done loading by looking for all components
    setTimeout(() => {
      const loaded = document.querySelectorAll('[class*="bg-blue-100"], [class*="bg-green-100"], [class*="bg-purple-100"], [class*="bg-orange-100"]');
      if (loaded.length === 4) {
        setLoadTime(Date.now() - startTime);
      }
    }, 100);
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Compare waterfall (sequential) vs parallel loading of lazy components.
        Each component takes 500ms to load.
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => startDemo('waterfall')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Load Waterfall (Bad)
        </button>
        <button
          onClick={() => startDemo('parallel')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Load Parallel (Good)
        </button>
        {loadTime && (
          <span className="text-sm font-medium">
            Total load time: <span className={loadTime > 1500 ? 'text-red-600' : 'text-green-600'}>{loadTime}ms</span>
            {loadTime > 1500 && ' (4x slower than needed!)'}
          </span>
        )}
      </div>

      <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded text-sm text-red-800 dark:text-red-300">
        <strong>Waterfall Problem:</strong> Nested Suspense boundaries cause each lazy component to
        wait for the previous one. 4 components × 500ms = 2000ms total (should be 500ms parallel).
      </div>

      <div className="border border-gray-300 dark:border-gray-600 rounded p-4 min-h-[300px]">
        {!mode && (
          <div className="text-gray-500 text-center py-8">
            Click a button above to start the demo
          </div>
        )}
        {mode === 'waterfall' && <BadWaterfallLayout />}
        {mode === 'parallel' && <GoodParallelLayout />}
      </div>

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Fixes:</strong>
        </p>
        <ul className="list-disc list-inside text-blue-700 dark:text-blue-400 mt-1 space-y-1">
          <li>Use a single Suspense boundary for sibling lazy components</li>
          <li>Preload critical components with <code>{'/* webpackPreload: true */'}</code></li>
          <li>Use route-based code splitting (one boundary per route)</li>
          <li>Consider <code>startTransition</code> for non-urgent updates</li>
        </ul>
      </div>
    </div>
  );
}
