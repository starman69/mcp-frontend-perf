import { useState, useEffect } from 'react';

export default function BadHydration() {
  // BAD: Using Date.now() creates different values on server vs client
  const [timestamp] = useState(() => Date.now());

  // BAD: Using Math.random() creates mismatches
  const [randomId] = useState(() => Math.random().toString(36).slice(2));

  // BAD: Checking window/document in initial render
  const [windowWidth, setWindowWidth] = useState(
    // This would cause hydration mismatch in SSR - window doesn't exist on server
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  // BAD: localStorage access during render
  const [theme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate the kind of warnings you'd see in console
  useEffect(() => {
    console.warn(
      '[Simulated Hydration Warning] Text content does not match server-rendered HTML.',
      '\nServer: "Rendered at 0"',
      `\nClient: "Rendered at ${timestamp}"`
    );
    console.warn(
      '[Simulated Hydration Warning] Prop `id` did not match.',
      '\nServer: "item-abc123"',
      `\nClient: "item-${randomId}"`
    );
  }, [timestamp, randomId]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        These patterns cause hydration mismatches in SSR frameworks (Next.js, Remix, etc.).
        Check the console for simulated hydration warnings.
      </p>

      <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded text-sm text-red-800 dark:text-red-300">
        <strong>Check Console:</strong> You'll see simulated hydration warnings demonstrating
        what happens when server and client HTML don't match.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date.now() mismatch */}
        <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded">
          <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
            Date.now() in State
          </h3>
          <code className="text-sm bg-orange-200 dark:bg-orange-800 px-2 py-1 rounded block mb-2">
            useState(() =&gt; Date.now())
          </code>
          <div className="text-sm text-orange-700 dark:text-orange-400">
            Server rendered at: <span className="font-mono">0</span>
          </div>
          <div className="text-sm text-orange-700 dark:text-orange-400">
            Client hydrated at: <span className="font-mono">{timestamp}</span>
          </div>
          <div className="text-xs text-red-600 dark:text-red-400 mt-1">
            ⚠️ Mismatch causes full re-render!
          </div>
        </div>

        {/* Math.random() mismatch */}
        <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
            Math.random() for IDs
          </h3>
          <code className="text-sm bg-yellow-200 dark:bg-yellow-800 px-2 py-1 rounded block mb-2">
            id={'{`item-${Math.random()}`}'}
          </code>
          <div className="text-sm text-yellow-700 dark:text-yellow-400">
            Server ID: <span className="font-mono">item-abc123</span>
          </div>
          <div className="text-sm text-yellow-700 dark:text-yellow-400">
            Client ID: <span className="font-mono">item-{randomId}</span>
          </div>
          <div className="text-xs text-red-600 dark:text-red-400 mt-1">
            ⚠️ IDs don't match between server/client!
          </div>
        </div>

        {/* Window access */}
        <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded">
          <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
            Window Access in Render
          </h3>
          <code className="text-sm bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded block mb-2">
            useState(window.innerWidth)
          </code>
          <div className="text-sm text-purple-700 dark:text-purple-400">
            Server: <span className="font-mono">0</span> (window undefined)
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-400">
            Client: <span className="font-mono">{windowWidth}px</span>
          </div>
        </div>

        {/* localStorage access */}
        <div className="p-4 bg-pink-100 dark:bg-pink-900/30 rounded">
          <h3 className="font-semibold text-pink-800 dark:text-pink-300 mb-2">
            localStorage in State Init
          </h3>
          <code className="text-sm bg-pink-200 dark:bg-pink-800 px-2 py-1 rounded block mb-2">
            useState(localStorage.getItem())
          </code>
          <div className="text-sm text-pink-700 dark:text-pink-400">
            Server: <span className="font-mono">"light"</span> (default)
          </div>
          <div className="text-sm text-pink-700 dark:text-pink-400">
            Client: <span className="font-mono">"{theme}"</span> (from storage)
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Fixes:</strong>
        </p>
        <ul className="list-disc list-inside text-blue-700 dark:text-blue-400 mt-1 space-y-1">
          <li>Use <code>useId()</code> hook for stable IDs (React 18+)</li>
          <li>Defer client-only values to <code>useEffect</code></li>
          <li>Use <code>suppressHydrationWarning</code> for intentional mismatches</li>
          <li>Check <code>mounted</code> state before rendering client-only content</li>
          <li>Use <code>useLayoutEffect</code> for DOM measurements before paint</li>
        </ul>
      </div>

      {mounted && (
        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded text-sm text-green-800 dark:text-green-300">
          ✓ Component is now mounted - safe to access browser APIs
        </div>
      )}
    </div>
  );
}
