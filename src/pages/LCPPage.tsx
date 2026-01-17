import ExamplePage from '../components/shared/ExamplePage';
import BadLCPComponent from '../examples/lcp/BadLCPComponent';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'lcp')!;

export default function LCPPage() {
  return (
    <ExamplePage example={example}>
      <BadLCPComponent />
    </ExamplePage>
  );
}
