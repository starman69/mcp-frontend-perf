import ExamplePage from '../components/shared/ExamplePage';
import BadLargeBundleComponent from '../examples/large-bundle/BadLargeBundleComponent';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'large-bundle')!;

export default function LargeBundlePage() {
  return (
    <ExamplePage example={example}>
      <BadLargeBundleComponent />
    </ExamplePage>
  );
}
