import ExamplePage from '../components/shared/ExamplePage';
import BadFontComponent from '../examples/font-loading/BadFontComponent';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'font-loading')!;

export default function FontLoadingPage() {
  return (
    <ExamplePage example={example}>
      <BadFontComponent />
    </ExamplePage>
  );
}
