import { useRef, useState } from 'react';

export default function BadMemoryLeak() {
  const [leakCount, setLeakCount] = useState(0);
  const [gcMessage, setGcMessage] = useState<string | null>(null);
  const detachedNodes = useRef<HTMLDivElement[]>([]);
  const intervalRefs = useRef<number[]>([]);

  // BAD: Creates detached DOM nodes that are never cleaned up
  const createLeak = () => {
    // Create DOM nodes and store references
    for (let i = 0; i < 1000; i++) {
      const div = document.createElement('div');
      div.innerHTML = `<span>Leaked node ${leakCount}-${i}</span>`;
      div.className = 'leaked-element';
      // Store reference but never add to DOM or clean up
      detachedNodes.current.push(div);
    }

    // BAD: Create event listeners that are never removed
    const handler = () => {
      console.log('Leaked handler', Math.random());
    };
    window.addEventListener('resize', handler);
    // We're not storing the handler to remove it later!

    // BAD: Create intervals that are never cleared
    const intervalId = window.setInterval(() => {
      console.log('Leaked interval running...');
    }, 10000);
    intervalRefs.current.push(intervalId);

    setLeakCount((c) => c + 1);
  };

  const forceGC = () => {
    // This doesn't actually help because we still hold references
    if ('gc' in window) {
      (window as unknown as { gc: () => void }).gc();
    }
    setGcMessage(
      'GC triggered (if available). But references are still held, so memory won\'t be freed!'
    );
    setTimeout(() => setGcMessage(null), 3000);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Click the button to create memory leaks. Open DevTools Memory panel, take heap
        snapshots before and after clicking, then filter by "Detached" to see leaked nodes.
      </p>

      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={createLeak}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Create Memory Leak
        </button>

        <button
          onClick={forceGC}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Try Force GC
        </button>
      </div>

      {gcMessage && (
        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded text-sm text-yellow-800 dark:text-yellow-300">
          {gcMessage}
        </div>
      )}

      <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded">
        <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
          Leak Statistics
        </h3>
        <ul className="text-sm text-orange-700 dark:text-orange-400 space-y-1">
          <li>Times leaked: {leakCount}</li>
          <li>Detached DOM nodes: {detachedNodes.current.length.toLocaleString()}</li>
          <li>Leaked intervals: {intervalRefs.current.length}</li>
          <li>
            Estimated leaked memory: ~{((detachedNodes.current.length * 200) / 1024).toFixed(0)} KB
          </li>
        </ul>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p className="font-semibold mb-1">What's happening:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>1000 detached DOM nodes created per click</li>
          <li>References kept in array (never garbage collected)</li>
          <li>Window resize listeners added (never removed)</li>
          <li>Intervals created (never cleared)</li>
        </ul>
      </div>
    </div>
  );
}
