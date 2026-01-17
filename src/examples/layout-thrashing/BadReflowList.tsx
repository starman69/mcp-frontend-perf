import { useEffect, useRef, useState } from "react";

export default function BadReflowList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [count] = useState(100);
  const [reflowCount, setReflowCount] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let totalReflows = 0;

    function onScroll() {
      // BAD: Interleaved read/write pattern causes forced synchronous layout
      // Each iteration forces the browser to recalculate layout
      for (let i = 0; i < itemRefs.current.length; i++) {
        const node = itemRefs.current[i];
        if (!node) continue;

        // READ: Forces layout calculation
        const width = node.offsetWidth;

        // WRITE: Invalidates layout - next read will force recalc
        node.style.width = `${width + Math.sin(i) * 0.1}px`;

        // Force another read to demonstrate thrashing
        void node.offsetHeight;

        // READ AGAIN: Forces synchronous layout (THRASHING!)
        const newHeight = node.offsetHeight;

        // WRITE AGAIN: More thrashing
        node.style.padding = `${12 + (newHeight % 3)}px`;

        // READ AGAIN: Another forced layout
        const rect = node.getBoundingClientRect();

        // WRITE: Changes layout-affecting property
        node.style.marginLeft = `${Math.abs(rect.top % 20)}px`;

        totalReflows++;
      }

      setReflowCount(totalReflows);
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const handleReset = () => {
    // Reset all inline styles and scroll position
    itemRefs.current.forEach((node) => {
      if (node) {
        node.style.width = '';
        node.style.padding = '';
        node.style.marginLeft = '';
      }
    });
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    setReflowCount(0);
  };

  return (
    <div className="space-y-4">
      <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded text-sm flex items-center justify-between">
        <p className="text-red-800 dark:text-red-300">
          <strong>Forced Reflows:</strong> {reflowCount.toLocaleString()}
          <span className="text-red-600 dark:text-red-400 ml-2">
            (Look for purple "Layout" bars in Performance panel)
          </span>
        </p>
        {reflowCount > 0 && (
          <button
            onClick={handleReset}
            className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      <div
        ref={containerRef}
        className="h-[400px] overflow-auto border border-gray-300 dark:border-gray-600 rounded"
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            ref={(n) => { itemRefs.current[i] = n; }}
            className="border-b border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800"
          >
            Item {i} – scroll to trigger layout thrashing
          </div>
        ))}
      </div>

      <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded text-sm space-y-2">
        <p className="text-yellow-800 dark:text-yellow-300">
          <strong>How to detect in DevTools:</strong>
        </p>
        <ol className="list-decimal list-inside text-yellow-700 dark:text-yellow-400 space-y-1">
          <li>Open Performance panel and click Record</li>
          <li>Scroll this list up and down</li>
          <li>Stop recording</li>
          <li>Look for purple "Layout" bars in the flame chart</li>
          <li>Click a Layout bar - check if it shows "Forced reflow is a likely performance bottleneck"</li>
          <li>Check Summary tab for high "Rendering" time</li>
        </ol>
      </div>
    </div>
  );
}
