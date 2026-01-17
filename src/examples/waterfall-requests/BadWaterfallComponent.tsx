import { useState } from 'react';

// Simulate API calls with delays
const fakeApi = {
  getUser: () => new Promise(resolve => setTimeout(() => resolve({ id: 1, name: 'John' }), 800)),
  getPosts: (userId: number) => new Promise(resolve => setTimeout(() => resolve([
    { id: 1, title: 'Post 1', userId },
    { id: 2, title: 'Post 2', userId },
  ]), 600)),
  getComments: (postId: number) => new Promise(resolve => setTimeout(() => resolve([
    { id: 1, text: 'Comment 1', postId },
    { id: 2, text: 'Comment 2', postId },
  ]), 400)),
  getAnalytics: () => new Promise(resolve => setTimeout(() => resolve({ views: 1000 }), 500)),
};

export default function BadWaterfallComponent() {
  const [data, setData] = useState<{
    user: unknown;
    posts: unknown[];
    comments: unknown[];
    analytics: unknown;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeline, setTimeline] = useState<{ name: string; start: number; end: number }[]>([]);

  const loadDataBad = async () => {
    setLoading(true);
    setData(null);
    const newTimeline: typeof timeline = [];
    const startTime = Date.now();

    // BAD: Sequential waterfall requests
    const t1 = Date.now();
    const user = await fakeApi.getUser();
    newTimeline.push({ name: 'getUser', start: t1 - startTime, end: Date.now() - startTime });

    const t2 = Date.now();
    const posts = await fakeApi.getPosts((user as { id: number }).id);
    newTimeline.push({ name: 'getPosts', start: t2 - startTime, end: Date.now() - startTime });

    const t3 = Date.now();
    const comments = await fakeApi.getComments((posts as { id: number }[])[0].id);
    newTimeline.push({ name: 'getComments', start: t3 - startTime, end: Date.now() - startTime });

    const t4 = Date.now();
    const analytics = await fakeApi.getAnalytics();
    newTimeline.push({ name: 'getAnalytics', start: t4 - startTime, end: Date.now() - startTime });

    setTimeline(newTimeline);
    setData({ user, posts: posts as unknown[], comments: comments as unknown[], analytics });
    setLoading(false);
  };

  const totalTime = timeline.length > 0
    ? timeline[timeline.length - 1].end
    : 0;

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Click to load data using sequential (waterfall) requests. Watch how each request
        waits for the previous one, even when they could run in parallel.
      </p>

      <div className="flex gap-2">
        <button
          onClick={loadDataBad}
          disabled={loading}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Loading...' : 'Load Data (Waterfall - Bad)'}
        </button>
        {data && (
          <button
            onClick={() => { setData(null); setTimeline([]); }}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {timeline.length > 0 && (
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <h3 className="font-semibold mb-3">Request Timeline (Waterfall)</h3>
          <div className="space-y-2">
            {timeline.map((req, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-24 text-sm font-mono">{req.name}</span>
                <div className="flex-1 h-6 bg-gray-200 dark:bg-gray-600 rounded relative">
                  <div
                    className="absolute h-full bg-red-500 rounded"
                    style={{
                      left: `${(req.start / totalTime) * 100}%`,
                      width: `${((req.end - req.start) / totalTime) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-16 text-right">
                  {req.end - req.start}ms
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm font-semibold text-red-600 dark:text-red-400">
            Total time: {totalTime}ms (could be ~800ms with parallel requests)
          </p>
        </div>
      )}

      {data && (
        <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded text-sm">
          <p className="text-green-800 dark:text-green-300">
            Data loaded! User: {(data.user as { name: string }).name},
            Posts: {(data.posts as unknown[]).length},
            Comments: {(data.comments as unknown[]).length}
          </p>
        </div>
      )}

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Fix:</strong> Use Promise.all() for independent requests, implement
          data loading patterns like React Query/SWR, or use GraphQL to batch requests.
        </p>
      </div>
    </div>
  );
}
