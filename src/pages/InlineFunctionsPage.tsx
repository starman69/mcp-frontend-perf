import ExamplePage from '../components/shared/ExamplePage';
import BadInlineFunctions from '../examples/inline-functions/BadInlineFunctions';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'inline-functions')!;

export default function InlineFunctionsPage() {
  return (
    <ExamplePage example={example}>
      <BadInlineFunctions />
    </ExamplePage>
  );
}
