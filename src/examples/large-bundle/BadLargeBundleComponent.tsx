import { useState } from 'react';

export default function BadLargeBundleComponent() {
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Simulate what happens with large bundles
  const bundleData = {
    total: 2.4,
    chunks: [
      { name: 'vendor.js', size: 1.2, description: 'All of lodash, moment.js, etc.' },
      { name: 'main.js', size: 0.8, description: 'App code + unused components' },
      { name: 'charts.js', size: 0.4, description: 'Full charting library for 1 chart' },
    ],
    issues: [
      'Importing entire lodash instead of specific functions',
      'moment.js with all locales (300KB+)',
      'No code splitting - everything in one bundle',
      'Dead code not tree-shaken',
      'Source maps included in production',
    ],
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        This demo shows common bundle size issues. Large bundles delay Time to Interactive (TTI)
        and increase data usage for users.
      </p>

      <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded">
        <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
          Simulated Bundle Analysis
        </h3>
        <p className="text-3xl font-bold text-red-600 dark:text-red-400">
          {bundleData.total} MB
        </p>
        <p className="text-sm text-red-700 dark:text-red-400">
          Total JavaScript (uncompressed)
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Bundle Breakdown</h3>
        {bundleData.chunks.map((chunk) => (
          <div
            key={chunk.name}
            className="flex items-center gap-4 p-3 bg-gray-100 dark:bg-gray-700 rounded"
          >
            <div className="flex-1">
              <code className="text-sm font-mono">{chunk.name}</code>
              <p className="text-xs text-gray-500">{chunk.description}</p>
            </div>
            <div className="text-right">
              <span className="font-bold">{chunk.size} MB</span>
              <div
                className="h-2 bg-red-500 rounded mt-1"
                style={{ width: `${(chunk.size / bundleData.total) * 100}px` }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowAnalysis(!showAnalysis)}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors"
      >
        {showAnalysis ? 'Hide' : 'Show'} Common Issues
      </button>

      {showAnalysis && (
        <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded">
          <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
            Bundle Size Anti-Patterns
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-orange-700 dark:text-orange-400">
            {bundleData.issues.map((issue, i) => (
              <li key={i}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Fix:</strong> Use dynamic imports for code splitting, import specific
          functions (lodash/get), use date-fns instead of moment, enable tree-shaking,
          analyze with webpack-bundle-analyzer.
        </p>
      </div>
    </div>
  );
}
