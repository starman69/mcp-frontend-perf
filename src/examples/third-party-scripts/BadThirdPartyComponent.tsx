import { useState } from 'react';

export default function BadThirdPartyComponent() {
  const [scripts, setScripts] = useState<{
    name: string;
    size: string;
    loadTime: number;
    blocking: boolean;
    loaded: boolean;
  }[]>([
    { name: 'analytics.js', size: '45 KB', loadTime: 0, blocking: true, loaded: false },
    { name: 'tracking-pixel.js', size: '12 KB', loadTime: 0, blocking: true, loaded: false },
    { name: 'chat-widget.js', size: '180 KB', loadTime: 0, blocking: false, loaded: false },
    { name: 'social-share.js', size: '95 KB', loadTime: 0, blocking: false, loaded: false },
    { name: 'ad-network.js', size: '220 KB', loadTime: 0, blocking: true, loaded: false },
    { name: 'heatmap-tracker.js', size: '65 KB', loadTime: 0, blocking: false, loaded: false },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  const simulateScriptLoad = async () => {
    setIsLoading(true);
    setScripts(s => s.map(script => ({ ...script, loaded: false, loadTime: 0 })));

    let currentTime = 0;
    const newScripts = [...scripts];

    for (let i = 0; i < newScripts.length; i++) {
      const script = newScripts[i];
      // Simulate network latency + parse time
      const loadTime = Math.random() * 300 + parseInt(script.size) * 2;

      if (script.blocking) {
        // Blocking scripts add to total time
        await new Promise(resolve => setTimeout(resolve, loadTime));
        currentTime += loadTime;
      } else {
        // Non-blocking scripts load in parallel (simulated)
        await new Promise(resolve => setTimeout(resolve, loadTime / 3));
      }

      newScripts[i] = { ...script, loadTime: Math.round(loadTime), loaded: true };
      setScripts([...newScripts]);
    }

    setTotalTime(currentTime);
    setIsLoading(false);
  };

  const totalSize = scripts.reduce((sum, s) => sum + parseInt(s.size), 0);
  const blockingCount = scripts.filter(s => s.blocking).length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        This demo simulates loading multiple third-party scripts. Blocking scripts
        prevent the page from becoming interactive until they finish loading.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded">
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{totalSize} KB</p>
          <p className="text-sm text-red-700 dark:text-red-400">Total 3rd party JS</p>
        </div>
        <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded">
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{blockingCount}</p>
          <p className="text-sm text-orange-700 dark:text-orange-400">Blocking scripts</p>
        </div>
      </div>

      <button
        onClick={simulateScriptLoad}
        disabled={isLoading}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover disabled:opacity-50 transition-colors"
      >
        {isLoading ? 'Loading Scripts...' : 'Simulate Script Loading'}
      </button>

      <div className="space-y-2">
        {scripts.map((script, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 rounded ${
              script.blocking
                ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${
              script.loaded ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            <code className="text-sm flex-1">{script.name}</code>
            <span className="text-xs text-gray-500">{script.size}</span>
            {script.blocking && (
              <span className="text-xs px-2 py-1 bg-red-500 text-white rounded">BLOCKING</span>
            )}
            {script.loaded && (
              <span className="text-xs text-gray-500">{script.loadTime}ms</span>
            )}
          </div>
        ))}
      </div>

      {totalTime > 0 && (
        <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded">
          <p className="text-orange-800 dark:text-orange-300">
            <strong>Blocking time added:</strong> ~{Math.round(totalTime)}ms
            <span className="text-sm ml-2">
              (page can't be interactive until blocking scripts finish)
            </span>
          </p>
        </div>
      )}

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Fix:</strong> Load scripts with async/defer, use facades for heavy widgets,
          self-host critical scripts, implement consent management to delay non-essential scripts,
          use Partytown to run scripts in web workers.
        </p>
      </div>
    </div>
  );
}
