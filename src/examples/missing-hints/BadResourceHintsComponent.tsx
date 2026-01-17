import { useState } from 'react';

export default function BadResourceHintsComponent() {
  const [showComparison, setShowComparison] = useState(false);

  const resources = [
    {
      url: 'https://api.example.com/data',
      type: 'API',
      discovery: 'Late (after JS executes)',
      fix: 'preconnect',
      impact: 'Saves ~200ms connection time',
    },
    {
      url: '/hero-image.webp',
      type: 'LCP Image',
      discovery: 'Late (after CSS parses)',
      fix: 'preload',
      impact: 'Improves LCP by ~500ms',
    },
    {
      url: '/critical-font.woff2',
      type: 'Font',
      discovery: 'Late (after CSS + layout)',
      fix: 'preload',
      impact: 'Reduces FOIT/FOUT',
    },
    {
      url: '/next-page-bundle.js',
      type: 'Next Page',
      discovery: 'Never (until navigation)',
      fix: 'prefetch',
      impact: 'Instant page transitions',
    },
    {
      url: 'https://cdn.analytics.com',
      type: '3rd Party',
      discovery: 'Late (after main JS)',
      fix: 'dns-prefetch',
      impact: 'Saves ~50ms DNS lookup',
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Without resource hints, browsers discover critical resources late in the loading
        process. This delays LCP, fonts, and API connections.
      </p>

      <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded">
        <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
          Missing Resource Hints
        </h3>
        <p className="text-sm text-red-700 dark:text-red-400">
          No preload, prefetch, or preconnect hints found in document head
        </p>
      </div>

      <div className="space-y-2">
        {resources.map((resource, i) => (
          <div
            key={i}
            className="p-3 bg-gray-100 dark:bg-gray-700 rounded border-l-4 border-red-500"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <code className="text-sm break-all">{resource.url}</code>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded">
                    {resource.type}
                  </span>
                  <span className="text-xs text-red-600 dark:text-red-400">
                    Discovery: {resource.discovery}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs px-2 py-1 bg-green-500 text-white rounded">
                  {resource.fix}
                </span>
                <p className="text-xs text-gray-500 mt-1">{resource.impact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowComparison(!showComparison)}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors"
      >
        {showComparison ? 'Hide' : 'Show'} Code Comparison
      </button>

      {showComparison && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded">
            <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">
              Without Hints (Bad)
            </h4>
            <pre className="text-xs overflow-x-auto bg-gray-800 text-gray-100 p-3 rounded">
{`<head>
  <link rel="stylesheet" href="/styles.css">
  <script src="/app.js"></script>
</head>
<!-- Resources discovered late! -->`}
            </pre>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded">
            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
              With Hints (Good)
            </h4>
            <pre className="text-xs overflow-x-auto bg-gray-800 text-gray-100 p-3 rounded">
{`<head>
  <link rel="preconnect" href="https://api.example.com">
  <link rel="preload" href="/hero.webp" as="image">
  <link rel="preload" href="/font.woff2" as="font">
  <link rel="prefetch" href="/next-page.js">
</head>`}
            </pre>
          </div>
        </div>
      )}

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Fix:</strong> Add preconnect for API origins, preload LCP images and fonts,
          prefetch likely next pages, use dns-prefetch for third-party domains.
          Order hints by priority in the document head.
        </p>
      </div>
    </div>
  );
}
