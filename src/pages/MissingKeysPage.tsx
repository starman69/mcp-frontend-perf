import ExamplePage from '../components/shared/ExamplePage';
import BadMissingKeys from '../examples/missing-keys/BadMissingKeys';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'missing-keys')!;

export default function MissingKeysPage() {
  return (
    <ExamplePage example={example}>
      <BadMissingKeys />
    </ExamplePage>
  );
}
