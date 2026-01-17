import ExamplePage from '../components/shared/ExamplePage';
import BadUseEffect from '../examples/useeffect-issues/BadUseEffect';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'useeffect-issues')!;

export default function UseEffectIssuesPage() {
  return (
    <ExamplePage example={example}>
      <BadUseEffect />
    </ExamplePage>
  );
}
