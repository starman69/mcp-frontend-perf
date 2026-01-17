import ExamplePage from '../components/shared/ExamplePage';
import BadSuspenseWaterfall from '../examples/suspense-waterfall/BadSuspenseWaterfall';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'suspense-waterfall')!;

export default function SuspenseWaterfallPage() {
  return (
    <ExamplePage example={example}>
      <BadSuspenseWaterfall />
    </ExamplePage>
  );
}
