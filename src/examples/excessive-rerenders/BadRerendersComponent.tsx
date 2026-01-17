import { useState, useContext, createContext } from 'react';

// BAD: Context that causes all children to re-render
const CounterContext = createContext({ count: 0, increment: () => {} });

function ExpensiveChild({ id }: { id: number }) {
  // Track render count
  const renderCount = useState({ count: 0 })[0];
  renderCount.count++;

  // Simulate expensive render
  let sum = 0;
  for (let i = 0; i < 100000; i++) {
    sum += Math.random();
  }

  return (
    <div className="p-2 border border-gray-300 dark:border-gray-600 rounded text-sm">
      Child {id} - Rendered {renderCount.count} times
      <span className="text-xs text-gray-500 ml-2">(sum: {sum.toFixed(0)})</span>
    </div>
  );
}

function ChildrenList() {
  // BAD: Using context causes all children to re-render when count changes
  const { count } = useContext(CounterContext);

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Count from context: {count}
      </p>
      {Array.from({ length: 10 }, (_, i) => (
        <ExpensiveChild key={i} id={i} />
      ))}
    </div>
  );
}

function BadInlineHandler() {
  const [items, setItems] = useState([1, 2, 3]);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
      <h4 className="font-semibold mb-2">Unstable References</h4>
      <p className="text-xs text-gray-500 mb-2">
        Each render creates new function/array references
      </p>
      {items.map((item) => (
        <button
          key={item}
          // BAD: Inline function creates new reference each render
          onClick={() => setItems([...items])}
          // BAD: Inline style object creates new reference
          style={{ margin: 4 }}
          className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Item {item}
        </button>
      ))}
    </div>
  );
}

export default function BadRerendersComponent() {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider value={{ count, increment: () => setCount(c => c + 1) }}>
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click the button to increment the counter. Watch how ALL child components
          re-render even though only the count changed.
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCount(c => c + 1)}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors"
          >
            Increment Counter ({count})
          </button>
          <span className="text-orange-500 text-sm">
            Watch render counts increase!
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Context Re-render Problem</h3>
            <ChildrenList />
          </div>
          <div>
            <BadInlineHandler />
          </div>
        </div>

        <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
          <p className="text-blue-800 dark:text-blue-300">
            <strong>Fix:</strong> Use React.memo for child components, useMemo/useCallback
            for stable references, and split contexts to minimize re-render scope.
          </p>
        </div>
      </div>
    </CounterContext.Provider>
  );
}
