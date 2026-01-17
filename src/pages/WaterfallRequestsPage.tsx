import ExamplePage from '../components/shared/ExamplePage';
import BadWaterfallComponent from '../examples/waterfall-requests/BadWaterfallComponent';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'waterfall-requests')!;

export default function WaterfallRequestsPage() {
  return (
    <ExamplePage example={example}>
      <BadWaterfallComponent />
    </ExamplePage>
  );
}
