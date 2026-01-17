import { useState, useEffect } from 'react';

export default function BadExcessiveDOM() {
  const [nodeCount, setNodeCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [depth] = useState(10);
  const [breadth] = useState(5);

  useEffect(() => {
    // Count actual DOM nodes
    setNodeCount(document.querySelectorAll('*').length);
  }, [generated]);

  // BAD: Generate deeply nested DOM structure
  const generateExcessiveDOM = () => {
    setIsGenerating(true);

    // Use setTimeout to allow UI to update
    setTimeout(() => {
      setGenerated(true);
      setIsGenerating(false);
    }, 100);
  };

  // Recursive component to create deep nesting
  const NestedNode = ({ level, index }: { level: number; index: number }) => {
    if (level === 0) {
      return (
        <span className="text-xs text-gray-400">
          Leaf-{index}
        </span>
      );
    }

    return (
      <div className="pl-2 border-l border-gray-300 dark:border-gray-600">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Level {depth - level + 1}, Node {index}
        </div>
        {Array.from({ length: breadth }, (_, i) => (
          <NestedNode key={i} level={level - 1} index={i} />
        ))}
      </div>
    );
  };

  // Calculate total nodes that will be generated
  const calculateNodes = (d: number, b: number): number => {
    if (d === 0) return 1;
    return 1 + b * calculateNodes(d - 1, b);
  };

  const estimatedNodes = calculateNodes(depth, breadth);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Click the button to generate a deeply nested DOM tree. This will create thousands
        of DOM nodes, causing the Elements panel to lag and triggering Lighthouse warnings.
      </p>

      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={generateExcessiveDOM}
          disabled={isGenerating || generated}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? 'Generating...' : generated ? 'DOM Generated' : 'Generate Excessive DOM'}
        </button>

        {generated && (
          <button
            onClick={() => {
              setGenerated(false);
              setTimeout(() => setNodeCount(document.querySelectorAll('*').length), 100);
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <h3 className="font-semibold mb-2">Configuration</h3>
          <ul className="text-sm space-y-1">
            <li>Nesting depth: {depth} levels</li>
            <li>Children per node: {breadth}</li>
            <li>Est. generated nodes: ~{estimatedNodes.toLocaleString()}</li>
          </ul>
        </div>

        <div className={`p-4 rounded ${
          nodeCount > 1500
            ? 'bg-red-100 dark:bg-red-900/30'
            : 'bg-green-100 dark:bg-green-900/30'
        }`}>
          <h3 className={`font-semibold mb-2 ${
            nodeCount > 1500
              ? 'text-red-800 dark:text-red-300'
              : 'text-green-800 dark:text-green-300'
          }`}>
            Current DOM Size
          </h3>
          <p className={`text-2xl font-bold ${
            nodeCount > 1500
              ? 'text-red-600 dark:text-red-400'
              : 'text-green-600 dark:text-green-400'
          }`}>
            {nodeCount.toLocaleString()} nodes
          </p>
          <p className="text-xs mt-1 text-gray-500">
            {nodeCount > 1500 ? 'Exceeds recommended limit!' : 'Within limits'}
          </p>
        </div>
      </div>

      {generated && (
        <div className="border border-gray-300 dark:border-gray-600 rounded overflow-hidden">
          <div className="bg-gray-200 dark:bg-gray-700 px-3 py-2 text-sm font-semibold">
            Generated DOM Tree (scroll to explore)
          </div>
          <div className="h-64 overflow-auto p-4 bg-gray-50 dark:bg-gray-800 text-sm">
            {Array.from({ length: 3 }, (_, i) => (
              <NestedNode key={i} level={depth} index={i} />
            ))}
          </div>
        </div>
      )}

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Recommendations:</strong> Keep DOM size under 1,500 nodes. Use virtualization
          for long lists, lazy-load off-screen content, and flatten unnecessary wrapper elements.
        </p>
      </div>
    </div>
  );
}
