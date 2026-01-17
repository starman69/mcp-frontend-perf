import ExamplePage from '../components/shared/ExamplePage';
import BadReflowList from '../examples/layout-thrashing/BadReflowList';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'layout-thrashing')!;

export default function LayoutThrashingPage() {
  return (
    <ExamplePage example={example}>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Scroll the list below to trigger layout thrashing. Each scroll tick reads and writes
        styles for 200 items, causing forced synchronous layouts.
      </p>
      <BadReflowList />
    </ExamplePage>
  );
}
