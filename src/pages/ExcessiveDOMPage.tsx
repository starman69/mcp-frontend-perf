import ExamplePage from '../components/shared/ExamplePage';
import BadExcessiveDOM from '../examples/excessive-dom/BadExcessiveDOM';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'excessive-dom')!;

export default function ExcessiveDOMPage() {
  return (
    <ExamplePage example={example}>
      <BadExcessiveDOM />
    </ExamplePage>
  );
}
