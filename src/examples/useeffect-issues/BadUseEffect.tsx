import { useState, useEffect } from 'react';

export default function BadUseEffect() {
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState<{ name: string } | null>(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [infiniteLoopDemo, setInfiniteLoopDemo] = useState(false);
  const [loopCount, setLoopCount] = useState(0);

  // BAD: Object created inline causes effect to run every render
  const config = { headers: { 'X-Custom': 'value' } };

  // BAD: Missing dependency - won't refetch when userId changes
  useEffect(() => {
    // This effect has userId in its body but not in deps array
    const fetchUser = async () => {
      setFetchCount((c) => c + 1);
      // Simulate API call
      await new Promise((r) => setTimeout(r, 300));
      setUserData({ name: `User ${userId}` });
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // BAD: Should include userId

  // BAD: Infinite loop - effect updates state that triggers effect
  useEffect(() => {
    if (infiniteLoopDemo && loopCount < 100) {
      // This creates an infinite loop until we hit the safety limit
      const timer = setTimeout(() => {
        setLoopCount((c) => c + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [infiniteLoopDemo, loopCount]); // loopCount in deps + updating loopCount = loop!

  // BAD: Effect depends on object reference that changes every render
  useEffect(() => {
    console.log('Config effect ran - this runs EVERY render due to object reference');
  }, [config]); // config is new object every render!

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Common useEffect mistakes: missing dependencies, infinite loops, and unstable references.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Missing Dependency Demo */}
        <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded">
          <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
            Missing Dependency
          </h3>
          <p className="text-sm text-red-700 dark:text-red-400 mb-3">
            Change the user ID - data won't update because userId is missing from deps array.
          </p>
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => setUserId((u) => u - 1)}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              disabled={userId <= 1}
            >
              -
            </button>
            <span className="font-mono">User ID: {userId}</span>
            <button
              onClick={() => setUserId((u) => u + 1)}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm"
            >
              +
            </button>
          </div>
          <div className="text-sm">
            <div>Fetched data: {userData?.name || 'Loading...'}</div>
            <div className="text-gray-500">Fetch count: {fetchCount}</div>
          </div>
        </div>

        {/* Infinite Loop Demo */}
        <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded">
          <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
            Infinite Loop
          </h3>
          <p className="text-sm text-orange-700 dark:text-orange-400 mb-3">
            Effect updates state that's in its own dependency array.
          </p>
          <button
            onClick={() => {
              setLoopCount(0);
              setInfiniteLoopDemo(!infiniteLoopDemo);
            }}
            className={`px-3 py-1 rounded text-sm text-white ${
              infiniteLoopDemo ? 'bg-green-500' : 'bg-orange-500'
            }`}
          >
            {infiniteLoopDemo ? 'Stop Loop' : 'Start Infinite Loop'}
          </button>
          <div className="mt-2 text-sm">
            Loop iterations: {loopCount}
            {loopCount >= 100 && (
              <span className="text-red-600 ml-2">(safety limit reached!)</span>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded">
        <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
          Unstable Object Reference
        </h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          Check the console - "Config effect ran" logs on EVERY render because{' '}
          <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
            const config = {'{ }'}
          </code>{' '}
          creates a new object reference each time, even though the content is identical.
        </p>
      </div>

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Fixes:</strong>
        </p>
        <ul className="list-disc list-inside text-blue-700 dark:text-blue-400 mt-1 space-y-1">
          <li>Add all dependencies to the array (use ESLint rule exhaustive-deps)</li>
          <li>Use <code>useMemo</code> for object/array dependencies</li>
          <li>Move static objects outside component or use <code>useRef</code></li>
          <li>For "fetch on change" patterns, use a data-fetching library</li>
        </ul>
      </div>
    </div>
  );
}
