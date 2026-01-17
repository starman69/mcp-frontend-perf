import ExamplePage from '../components/shared/ExamplePage';
import BadRenderBlocking from '../examples/render-blocking/BadRenderBlocking';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'render-blocking')!;

export default function RenderBlockingPage() {
  return (
    <ExamplePage example={example}>
      <BadRenderBlocking />
    </ExamplePage>
  );
}
