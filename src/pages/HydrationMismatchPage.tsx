import ExamplePage from '../components/shared/ExamplePage';
import BadHydration from '../examples/hydration-mismatch/BadHydration';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'hydration-mismatch')!;

export default function HydrationMismatchPage() {
  return (
    <ExamplePage example={example}>
      <BadHydration />
    </ExamplePage>
  );
}
