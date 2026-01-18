import { Link } from 'react-router-dom';
import { examples } from '../data/examples';

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 max-md:text-xl">
          Frontend Performance Anti-Patterns
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto max-md:text-base">
          Interactive demos to learn frontend performance anti-patterns.
          Explore manually with DevTools or integrate with AI Coding Agents like Claude Code
          to automate detection, review, and fixes.
        </p>
        <a
          href="https://github.com/starman69/mcp-frontend-perf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          View on GitHub
        </a>
      </header>

      {/* Two Paths */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-3 text-green-900 dark:text-green-100">Learn Interactively</h2>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>Explore each demo manually to understand performance issues:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use Chrome, Open DevTools with <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">F12</kbd></li>
              <li>Trigger the anti-pattern and observe the impact</li>
              <li>Review the source code to understand the root cause</li>
            </ul>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">Integrate with AI Agents</h2>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>Use AI Coding Agents to automate analysis and learn fixes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Setup <a href="https://github.com/anthropics/claude-code" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">Claude Code</a> with MCP servers (<a href="https://github.com/ChromeDevTools/chrome-devtools-mcp" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">DevTools</a> + <a href="https://github.com/microsoft/playwright-mcp" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">Playwright</a>)</li>
              <li>Copy the AI prompt from each demo page</li>
              <li>Watch the agent detect, analyze, and suggest fixes</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example) => (
          <Link
            to={example.path}
            key={example.id}
            className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 no-underline transition-all hover:border-primary hover:-translate-y-0.5 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
              {example.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              {example.description}
            </p>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-sm">
              <span className="text-primary font-semibold">Problem: </span>
              <span className="text-gray-500 dark:text-gray-500">{example.problem}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
