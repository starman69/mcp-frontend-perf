import ExamplePage from '../components/shared/ExamplePage';
import BadResourceHintsComponent from '../examples/missing-hints/BadResourceHintsComponent';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'missing-hints')!;

export default function MissingHintsPage() {
  return (
    <ExamplePage example={example}>
      <BadResourceHintsComponent />
    </ExamplePage>
  );
}
