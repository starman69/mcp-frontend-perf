import { useEffect, useRef, useState } from 'react';

export default function BadScrollJank() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [blockingEnabled, setBlockingEnabled] = useState(true);
  const [jankCount, setJankCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = (e: Event) => {
      if (blockingEnabled) {
        // BAD: Blocking scroll handler - prevents smooth scrolling
        // This simulates expensive work in a scroll handler
        const start = performance.now();
        while (performance.now() - start < 16) {} // Block for 16ms (1 frame)

        // BAD: Forcing layout read in scroll handler causes reflow
        const scrollTop = container.scrollTop;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        void container.scrollHeight; // Force layout read

        // BAD: Updating state on every scroll event (causes re-renders)
        setScrollY(Math.round(scrollTop));
        setJankCount((c) => c + 1);

        // BAD: Calling preventDefault on a non-passive listener
        // This prevents the browser from optimizing scroll
        if (scrollTop > 100) {
          e.preventDefault(); // This will cause scroll jank!
        }
      }
    };

    // BAD: Not using passive listener for scroll
    // This tells the browser it might preventDefault, blocking scroll optimization
    container.addEventListener('scroll', handleScroll, { passive: false });

    return () => container.removeEventListener('scroll', handleScroll);
  }, [blockingEnabled]);

  const items = Array.from({ length: 200 }, (_, i) => `Item ${i + 1}`);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Scroll the list below. With blocking enabled, scroll feels janky because the handler
        blocks the main thread and uses non-passive listeners.
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            setBlockingEnabled(!blockingEnabled);
            setJankCount(0);
          }}
          className={`px-4 py-2 rounded text-white ${
            blockingEnabled ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          Blocking: {blockingEnabled ? 'ON (Janky)' : 'OFF (Smooth)'}
        </button>
        <span className="text-sm text-gray-500">
          Scroll events processed: {jankCount}
        </span>
      </div>

      <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded text-sm text-red-800 dark:text-red-300">
        <strong>Problems:</strong>
        <ul className="list-disc list-inside mt-1">
          <li>Non-passive scroll listener blocks browser scroll optimization</li>
          <li>Expensive computation (16ms) in scroll handler</li>
          <li>Forced layout read (scrollHeight) during scroll</li>
          <li>State updates on every scroll event causing re-renders</li>
        </ul>
      </div>

      <div className="flex gap-4 items-start">
        <div
          ref={containerRef}
          className="flex-1 h-[400px] overflow-y-auto border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="p-4 border-b border-gray-200 dark:border-gray-700"
              style={{
                // BAD: Inline style that changes on scroll (when blocking enabled)
                transform: blockingEnabled ? `translateX(${Math.sin(scrollY / 50 + i) * 5}px)` : undefined,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="w-32 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm">
          <div className="text-gray-500">Scroll Y:</div>
          <div className="font-mono text-lg">{scrollY}px</div>
        </div>
      </div>

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Fixes:</strong>
        </p>
        <ul className="list-disc list-inside text-blue-700 dark:text-blue-400 mt-1 space-y-1">
          <li>Use <code>{'{ passive: true }'}</code> for scroll listeners</li>
          <li>Debounce or throttle scroll handlers</li>
          <li>Use <code>requestAnimationFrame</code> for visual updates</li>
          <li>Avoid layout reads in scroll handlers (use IntersectionObserver)</li>
          <li>Use CSS transforms instead of JavaScript for scroll effects</li>
        </ul>
      </div>
    </div>
  );
}
