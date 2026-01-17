import { useState } from 'react';

export default function BadLongTask() {
  const [result, setResult] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runHeavyComputation = () => {
    setIsRunning(true);
    setResult(null);

    // BAD: Synchronous heavy computation blocking the main thread
    // This will cause a "Long Task" flag in DevTools (>50ms)
    let sum = 0;
    const iterations = 50_000_000;

    for (let i = 0; i < iterations; i++) {
      sum += Math.sqrt(i) * Math.sin(i);
    }

    setResult(sum);
    setIsRunning(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Click the button to run a synchronous computation with 50 million iterations.
        The UI will freeze and you'll see red "Long Task" markers in the Performance panel.
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={runHeavyComputation}
          disabled={isRunning}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isRunning ? 'Computing...' : 'Run Heavy Computation'}
        </button>

        {isRunning && (
          <span className="text-orange-500 animate-pulse">
            UI is frozen! Try clicking or typing...
          </span>
        )}
      </div>

      {result !== null && (
        <div className="p-4 bg-green-100 dark:bg-green-900 rounded flex items-center justify-between">
          <span className="text-green-800 dark:text-green-200">
            Result: {result.toFixed(4)}
          </span>
          <button
            onClick={() => setResult(null)}
            className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            Reset
          </button>
        </div>
      )}

      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">
          Try typing while computation runs:
        </label>
        <input
          type="text"
          placeholder="Type here to test responsiveness..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
    </div>
  );
}
