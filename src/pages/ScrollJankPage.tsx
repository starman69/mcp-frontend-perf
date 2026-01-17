import ExamplePage from '../components/shared/ExamplePage';
import BadScrollJank from '../examples/scroll-jank/BadScrollJank';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'scroll-jank')!;

export default function ScrollJankPage() {
  return (
    <ExamplePage example={example}>
      <BadScrollJank />
    </ExamplePage>
  );
}
