import ExamplePage from '../components/shared/ExamplePage';
import BadRerendersComponent from '../examples/excessive-rerenders/BadRerendersComponent';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'excessive-rerenders')!;

export default function ExcessiveRerendersPage() {
  return (
    <ExamplePage example={example}>
      <BadRerendersComponent />
    </ExamplePage>
  );
}
