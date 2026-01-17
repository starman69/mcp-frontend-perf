import ExamplePage from '../components/shared/ExamplePage';
import BadMemoryLeak from '../examples/memory-leaks/BadMemoryLeak';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'memory-leaks')!;

export default function MemoryLeaksPage() {
  return (
    <ExamplePage example={example}>
      <BadMemoryLeak />
    </ExamplePage>
  );
}
