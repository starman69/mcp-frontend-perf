import { useState } from 'react';

export default function BadRenderBlocking() {
  const [scriptStatus, setScriptStatus] = useState<'idle' | 'loading' | 'loaded'>('idle');
  const [blockingTime, setBlockingTime] = useState(0);
  const [scripts, setScripts] = useState([
    { name: 'analytics.js', time: 0, loaded: false },
    { name: 'tracking.js', time: 0, loaded: false },
    { name: 'legacy-polyfills.js', time: 0, loaded: false },
    { name: 'chat-widget.js', time: 0, loaded: false },
    { name: 'social-plugins.js', time: 0, loaded: false },
  ]);

  const simulateBlockingScripts = () => {
    setScriptStatus('loading');
    setBlockingTime(0);
    setScripts(s => s.map(script => ({ ...script, time: 0, loaded: false })));

    // Use setTimeout to allow UI to update before blocking
    setTimeout(() => {
      const startTime = performance.now();
      const newScripts = [...scripts];
      let totalTime = 0;

      // Simulate each blocking script sequentially
      newScripts.forEach((script, index) => {
        const scriptStart = performance.now();

        // BAD: Synchronous blocking work for each script
        let sum = 0;
        const iterations = (index + 1) * 50_000_000; // Varying load times - heavier blocking
        for (let i = 0; i < iterations; i++) {
          sum += Math.sqrt(i);
        }

        const scriptTime = Math.round(performance.now() - scriptStart);
        newScripts[index] = { ...script, time: scriptTime, loaded: true };
        totalTime += scriptTime;
      });

      const endTime = performance.now();
      setBlockingTime(Math.round(endTime - startTime));
      setScripts(newScripts);
      setScriptStatus('loaded');
    }, 50);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Click the button to simulate render-blocking scripts. The UI will freeze while
        each script loads synchronously, blocking the main thread.
      </p>

      <button
        onClick={simulateBlockingScripts}
        disabled={scriptStatus === 'loading'}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
      >
        {scriptStatus === 'loading' ? 'Loading Scripts... (UI Frozen!)' : 'Simulate Blocking Scripts'}
      </button>

      {scriptStatus !== 'idle' && (
        <div className={`p-4 rounded ${
          scriptStatus === 'loading'
            ? 'bg-yellow-100 dark:bg-yellow-900/30'
            : 'bg-green-100 dark:bg-green-900/30'
        }`}>
          <h3 className={`font-semibold mb-2 ${
            scriptStatus === 'loading'
              ? 'text-yellow-800 dark:text-yellow-300'
              : 'text-green-800 dark:text-green-300'
          }`}>
            Script Status: {scriptStatus === 'loading' ? 'Loading...' : 'All Scripts Loaded'}
          </h3>
          {blockingTime > 0 && (
            <p className="text-sm text-green-700 dark:text-green-400">
              Total blocking time: {blockingTime}ms
              <span className="text-gray-500 ml-2">(page was unresponsive for this long)</span>
            </p>
          )}
        </div>
      )}

      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
        <h3 className="font-semibold mb-2">Simulated Blocking Resources</h3>
        <div className="space-y-2 text-sm">
          {scripts.map((script, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                script.loaded ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                {script.name}
              </code>
              <span className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded">
                sync
              </span>
              {script.loaded && (
                <span className="text-gray-500">{script.time}ms</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Fix:</strong> Use <code>async</code> or <code>defer</code> attributes on
          scripts, or move them to the end of <code>&lt;body&gt;</code>. Consider using
          dynamic imports for non-critical JavaScript.
        </p>
      </div>

      <div className="border border-gray-300 dark:border-gray-600 rounded overflow-hidden">
        <div className="bg-gray-200 dark:bg-gray-700 px-3 py-2 text-sm font-mono">
          Blocking vs Non-blocking
        </div>
        <pre className="p-4 text-xs overflow-x-auto bg-gray-50 dark:bg-gray-800">
{`<!-- BAD: Blocks rendering -->
<script src="analytics.js"></script>

<!-- GOOD: Non-blocking -->
<script src="analytics.js" async></script>
<script src="analytics.js" defer></script>`}
        </pre>
      </div>
    </div>
  );
}
