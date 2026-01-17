import { useState, memo } from 'react';

// This child is memoized, but it will STILL re-render because parent passes new function refs
const ExpensiveChild = memo(function ExpensiveChild({
  item,
  onClick,
  onHover,
}: {
  item: { id: number; name: string };
  onClick: (id: number) => void;
  onHover: (id: number) => void;
}) {
  // Simulate expensive render
  const start = performance.now();
  while (performance.now() - start < 2) {} // 2ms artificial delay

  return (
    <div
      className="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
      onClick={() => onClick(item.id)}
      onMouseEnter={() => onHover(item.id)}
    >
      {item.name}
    </div>
  );
});

export default function BadInlineFunctions() {
  const [count, setCount] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [renderCount, setRenderCount] = useState(0);

  const items = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
  }));

  // Track renders
  const trackRender = () => {
    setRenderCount((c) => c + 1);
  };

  // BAD: These inline functions create new references every render
  // Even though ExpensiveChild is memoized, it re-renders because props changed
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Click the counter button and watch all 50 items re-render, even though only the
        counter changed. Each child takes 2ms to render, causing ~100ms of jank.
      </p>

      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={() => {
            setCount((c) => c + 1);
            trackRender();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Increment Counter: {count}
        </button>
        <span className="text-sm text-gray-500">Parent renders: {renderCount}</span>
        {count > 0 && (
          <button
            onClick={() => { setCount(0); setRenderCount(0); setSelectedId(null); setHoveredId(null); }}
            className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded text-sm text-red-800 dark:text-red-300">
        <strong>Problem:</strong> Inline arrow functions like{' '}
        <code className="bg-red-200 dark:bg-red-800 px-1 rounded">
          onClick={'{'}() =&gt; handleClick(id){'}'}
        </code>{' '}
        create new function references on every render, breaking React.memo optimization.
      </div>

      {(selectedId !== null || hoveredId !== null) && (
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded text-sm flex gap-4">
          {selectedId !== null && <span>Selected: Item {selectedId + 1}</span>}
          {hoveredId !== null && <span className="text-gray-500">Hovered: Item {hoveredId + 1}</span>}
        </div>
      )}

      <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto">
        {items.map((item) => (
          <ExpensiveChild
            key={item.id}
            item={item}
            // BAD: New function created every render!
            onClick={(id) => setSelectedId(id)}
            // BAD: Another new function every render!
            onHover={(id) => setHoveredId(id)}
          />
        ))}
      </div>

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Fix:</strong> Use <code>useCallback</code> to memoize handlers, or move
          handlers outside the component if they don't depend on state.
        </p>
      </div>
    </div>
  );
}
