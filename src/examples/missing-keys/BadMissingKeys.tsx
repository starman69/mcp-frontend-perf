import { useState } from 'react';

interface Item {
  id: number;
  text: string;
}

export default function BadMissingKeys() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, text: 'First item' },
    { id: 2, text: 'Second item' },
    { id: 3, text: 'Third item' },
  ]);
  const [inputValues, setInputValues] = useState<Record<number, string>>({});
  const [keyMode, setKeyMode] = useState<'none' | 'index' | 'stable'>('none');

  const addToStart = () => {
    const newId = Date.now();
    setItems([{ id: newId, text: `New item ${newId}` }, ...items]);
    // Log warning to console for detection
    if (keyMode === 'none') {
      console.warn(
        '[React Warning] Each child in a list should have a unique "key" prop.',
        '\nSee https://reactjs.org/link/warning-keys for more information.'
      );
    }
  };

  const removeFirst = () => {
    setItems(items.slice(1));
  };

  const shuffle = () => {
    setItems([...items].sort(() => Math.random() - 0.5));
    if (keyMode === 'index') {
      console.warn(
        '[React Issue] Using array index as key causes incorrect component reuse when list order changes.',
        '\nInput values appear in wrong positions after shuffle!'
      );
    }
  };

  const handleInputChange = (itemId: number, value: string) => {
    setInputValues({ ...inputValues, [itemId]: value });
  };

  const renderList = () => {
    return items.map((item, index) => {
      // Choose key based on mode
      let key: string | number;
      switch (keyMode) {
        case 'none':
          key = index; // This triggers React warning (same as no key)
          break;
        case 'index':
          key = index; // BAD: Index as key causes issues on reorder
          break;
        case 'stable':
          key = item.id; // GOOD: Stable unique ID
          break;
      }

      return (
        <div
          key={key}
          className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
        >
          <span className="text-gray-500 text-sm w-8">#{index + 1}</span>
          <span className="flex-1">{item.text}</span>
          <input
            type="text"
            placeholder="Type here..."
            value={inputValues[item.id] || ''}
            onChange={(e) => handleInputChange(item.id, e.target.value)}
            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700"
          />
          <span className="text-xs text-gray-400">id: {item.id}</span>
        </div>
      );
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Missing or unstable keys cause React to incorrectly reuse components.
        Type in the inputs, then shuffle - watch values appear in wrong places!
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Key Mode:</span>
        {(['none', 'index', 'stable'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setKeyMode(mode)}
            className={`px-3 py-1 rounded text-sm ${
              keyMode === mode
                ? mode === 'stable'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            {mode === 'none' ? 'No Key' : mode === 'index' ? 'Index Key' : 'Stable ID Key'}
          </button>
        ))}
      </div>

      <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded text-sm text-red-800 dark:text-red-300">
        <strong>Test:</strong>
        <ol className="list-decimal list-inside mt-1">
          <li>Type different text in each input field</li>
          <li>Click "Shuffle" and watch the input values</li>
          <li>With index/no key: values stay in wrong position!</li>
          <li>With stable ID: values follow their items correctly</li>
        </ol>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={addToStart}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Add to Start
        </button>
        <button
          onClick={removeFirst}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
          disabled={items.length === 0}
        >
          Remove First
        </button>
        <button
          onClick={shuffle}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
        >
          Shuffle
        </button>
        <button
          onClick={() => {
            setItems([
              { id: 1, text: 'First item' },
              { id: 2, text: 'Second item' },
              { id: 3, text: 'Third item' },
            ]);
            setInputValues({});
            setKeyMode('none');
          }}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 text-sm"
        >
          Reset
        </button>
      </div>

      <div className="space-y-2">{renderList()}</div>

      <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded text-sm text-yellow-800 dark:text-yellow-300">
        <strong>Console:</strong> Check console for React key warnings (when using "No Key" mode).
      </div>

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Fixes:</strong>
        </p>
        <ul className="list-disc list-inside text-blue-700 dark:text-blue-400 mt-1 space-y-1">
          <li>Always use stable, unique IDs from your data</li>
          <li>Never use array index as key for dynamic lists</li>
          <li>Generate IDs when creating items, not during render</li>
          <li>Use <code>crypto.randomUUID()</code> or database IDs</li>
        </ul>
      </div>
    </div>
  );
}
