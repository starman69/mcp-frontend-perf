import ExamplePage from '../components/shared/ExamplePage';
import BadLongTask from '../examples/long-tasks/BadLongTask';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'long-tasks')!;

export default function LongTasksPage() {
  return (
    <ExamplePage example={example}>
      <BadLongTask />
    </ExamplePage>
  );
}
