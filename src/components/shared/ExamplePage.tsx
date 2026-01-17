import type { ReactNode } from 'react';
import type { Example } from '../../data/examples';
import ClaudePrompt from './ClaudePrompt';

interface ExamplePageProps {
  example: Example;
  children: ReactNode;
}

export default function ExamplePage({ example, children }: ExamplePageProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 max-md:text-2xl">{example.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-md:text-base">
          {example.description}
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
          <h3 className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">
            Problem
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">{example.problem}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
          <h3 className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">
            DevTools Detection
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">{example.devtools}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
          <h3 className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">
            MCP Automation
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">{example.mcp}</p>
        </div>
      </section>

      {/* AI Prompt Section */}
      <section className="mb-8">
        <ClaudePrompt prompt={example.aiPrompt} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Live Demo</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 min-h-52">
          {children}
        </div>
      </section>
    </div>
  );
}
