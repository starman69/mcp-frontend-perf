import ExamplePage from '../components/shared/ExamplePage';
import BadCLSComponent from '../examples/cls/BadCLSComponent';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'cls')!;

export default function CLSPage() {
  return (
    <ExamplePage example={example}>
      <BadCLSComponent />
    </ExamplePage>
  );
}
