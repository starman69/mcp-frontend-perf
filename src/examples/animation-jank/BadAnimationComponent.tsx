import { useState, useRef } from 'react';

export default function BadAnimationComponent() {
  const [animating, setAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<'bad' | 'good'>('bad');
  const timeoutRef = useRef<number | null>(null);

  const runAnimation = (type: 'bad' | 'good') => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reset animation state first
    setAnimating(false);
    setAnimationType(type);

    // Start animation on next frame so the element renders at initial position first
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimating(true);
        timeoutRef.current = window.setTimeout(() => setAnimating(false), 2000);
      });
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Compare animations using layout-triggering properties (width, height, top, left)
        versus compositor-friendly properties (transform, opacity). Watch for jank!
      </p>

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => runAnimation('bad')}
          disabled={animating}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
        >
          Run Bad Animation (width/left)
        </button>
        <button
          onClick={() => runAnimation('good')}
          disabled={animating}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 transition-colors"
        >
          Run Good Animation (transform)
        </button>
      </div>

      <div className="relative h-32 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
        {/* BAD: Animating width and left causes layout on every frame */}
        {animationType === 'bad' && (
          <div
            className={`absolute top-4 h-24 bg-red-500 rounded transition-none ${
              animating ? 'animate-bad-jank' : ''
            }`}
            style={{
              width: animating ? '200px' : '100px',
              left: animating ? '300px' : '10px',
              transition: animating ? 'width 2s linear, left 2s linear' : 'none',
            }}
          >
            <div className="p-2 text-white text-xs">
              Animating width + left
              <br />
              (causes layout thrashing)
            </div>
          </div>
        )}

        {/* GOOD: Animating transform is compositor-only */}
        {animationType === 'good' && (
          <div
            className="absolute top-4 left-2 w-24 h-24 bg-green-500 rounded"
            style={{
              transform: animating ? 'translateX(300px) scale(1.5)' : 'translateX(0) scale(1)',
              transition: animating ? 'transform 2s linear' : 'none',
            }}
          >
            <div className="p-2 text-white text-xs">
              Animating transform
              <br />
              (GPU accelerated)
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded">
          <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">
            Layout-Triggering (Bad)
          </h4>
          <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
            <li>width, height</li>
            <li>top, right, bottom, left</li>
            <li>margin, padding</li>
            <li>font-size, line-height</li>
          </ul>
        </div>
        <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded">
          <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
            Compositor-Only (Good)
          </h4>
          <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
            <li>transform (translate, scale, rotate)</li>
            <li>opacity</li>
            <li>filter (with will-change)</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Fix:</strong> Use transform and opacity for animations, add will-change
          hint for complex animations, use CSS animations or Web Animations API,
          avoid animating during scroll handlers.
        </p>
      </div>
    </div>
  );
}
