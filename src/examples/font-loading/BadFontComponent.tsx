import { useState, useEffect } from 'react';

export default function BadFontComponent() {
  const [fontStage, setFontStage] = useState<'ready' | 'loading' | 'loaded'>('ready');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Remove any previously loaded font links on mount
  useEffect(() => {
    return () => {
      document.querySelectorAll('link[data-font-demo]').forEach(el => el.remove());
    };
  }, []);

  const triggerFontLoad = () => {
    // Remove existing font links first
    document.querySelectorAll('link[data-font-demo]').forEach(el => el.remove());

    setFontStage('loading');
    setFontsLoaded(false);

    // Load Google Fonts dynamically - these have very different metrics from system fonts
    // Playfair Display is a high-contrast serif with tall x-height
    // Lobster is a cursive/display font with very different metrics
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-font-demo', 'true');
    // Using display=block to simulate FOIT (text invisible until font loads)
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lobster&display=block';

    document.head.appendChild(link);

    // Check when fonts are actually loaded
    document.fonts.ready.then(() => {
      // Small delay to ensure rendering catches up
      setTimeout(() => {
        setFontStage('loaded');
        setFontsLoaded(true);
      }, 100);
    });
  };

  const resetDemo = () => {
    document.querySelectorAll('link[data-font-demo]').forEach(el => el.remove());
    setFontStage('ready');
    setFontsLoaded(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Click the button to load Google Fonts dynamically. Watch for FOIT (invisible text)
        while fonts download, then FOUT (layout shift) when fonts swap in.
      </p>

      <div className="flex gap-3">
        <button
          onClick={triggerFontLoad}
          disabled={fontStage === 'loading'}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover disabled:opacity-50 transition-colors"
        >
          {fontStage === 'loading' ? 'Loading Fonts...' : 'Load Google Fonts'}
        </button>
        {fontsLoaded && (
          <button
            onClick={resetDemo}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded min-h-40">
        <h2
          className="text-3xl mb-4"
          style={{
            fontFamily: fontsLoaded ? '"Playfair Display", serif' : 'Arial, sans-serif',
            fontWeight: 700,
          }}
        >
          Welcome to Our Website
        </h2>
        <p
          className="text-xl"
          style={{
            fontFamily: fontsLoaded ? '"Lobster", cursive' : 'Arial, sans-serif',
          }}
        >
          This text will dramatically shift when Lobster font loads because it has
          completely different letter shapes and spacing than Arial.
        </p>
        <p
          className="mt-4"
          style={{
            fontFamily: fontsLoaded ? '"Playfair Display", serif' : 'Arial, sans-serif',
          }}
        >
          Notice how the line heights, letter spacing, and overall text metrics change
          significantly when the custom fonts load, causing visible layout shifts.
        </p>

        <div className="mt-4 p-2 rounded text-sm">
          {fontStage === 'ready' && (
            <span className="text-gray-600 dark:text-gray-400">
              Click the button to trigger font loading...
            </span>
          )}
          {fontStage === 'loading' && (
            <span className="text-orange-600 dark:text-orange-400">
              FOIT: Fonts downloading (text may be invisible with display=block)...
            </span>
          )}
          {fontStage === 'loaded' && (
            <span className="text-green-600 dark:text-green-400">
              FOUT complete! Fonts loaded - did you see the layout shift?
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded">
          <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">FOIT Issues</h4>
          <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
            <li>Text invisible during font load</li>
            <li>User can't read content</li>
            <li>Default browser behavior</li>
          </ul>
        </div>
        <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded">
          <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">FOUT Issues</h4>
          <ul className="text-sm text-orange-700 dark:text-orange-400 space-y-1">
            <li>Layout shifts when fonts swap</li>
            <li>Different metrics cause reflow</li>
            <li>Contributes to CLS score</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
        <p className="text-blue-800 dark:text-blue-300">
          <strong>Fix:</strong> Use font-display: swap or optional, preload critical fonts,
          use size-adjust to match fallback metrics, consider system font stack for body text,
          subset fonts to reduce file size.
        </p>
      </div>
    </div>
  );
}
