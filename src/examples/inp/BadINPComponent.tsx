import { useState } from 'react';

export default function BadINPComponent() {
  const [clickCount, setClickCount] = useState(0);
  const [filterText, setFilterText] = useState('');
  const [items] = useState(() =>
    Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`)
  );

  // BAD: Expensive click handler
  const handleSlowClick = () => {
    // Simulate expensive synchronous work on click
    let sum = 0;
    for (let i = 0; i < 10_000_000; i++) {
      sum += Math.random();
    }
    // Prevent dead code elimination
    if (sum < 0) console.log(sum);
    setClickCount((c) => c + 1);
  };

  // BAD: Expensive filter on every keystroke
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Simulate expensive filtering operation
    let dummy = 0;
    for (let i = 0; i < 5_000_000; i++) {
      dummy += Math.sin(i);
    }
    // Prevent dead code elimination
    if (dummy < -Infinity) console.log(dummy);

    setFilterText(value);
  };

  // Filter items (this is also expensive with 10k items)
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Test interactions below. Each click and keystroke has intentionally slow handlers
        that will show up as poor INP in the Performance panel.
      </p>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Slow Click Handler</h3>
          <button
            onClick={handleSlowClick}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Click Me (Slow Handler)
          </button>
          <span className="ml-4 text-gray-600 dark:text-gray-400">
            Clicked: {clickCount} times
          </span>
          {clickCount > 0 && (
            <button
              onClick={() => { setClickCount(0); setFilterText(''); }}
              className="ml-2 px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              Reset
            </button>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-2">Slow Input Handler</h3>
          <input
            type="text"
            value={filterText}
            onChange={handleFilterChange}
            placeholder="Type to filter (expensive operation)..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">
            Filtered Results ({filteredItems.length.toLocaleString()} items)
          </h3>
          <div className="h-40 overflow-auto border border-gray-300 dark:border-gray-600 rounded">
            {filteredItems.slice(0, 100).map((item, i) => (
              <div
                key={i}
                className="px-3 py-1 text-sm border-b border-gray-200 dark:border-gray-700"
              >
                {item}
              </div>
            ))}
            {filteredItems.length > 100 && (
              <div className="px-3 py-2 text-sm text-gray-500 italic">
                ...and {(filteredItems.length - 100).toLocaleString()} more
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
