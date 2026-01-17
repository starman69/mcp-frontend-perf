import ExamplePage from '../components/shared/ExamplePage';
import BadINPComponent from '../examples/inp/BadINPComponent';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'inp')!;

export default function INPPage() {
  return (
    <ExamplePage example={example}>
      <BadINPComponent />
    </ExamplePage>
  );
}
