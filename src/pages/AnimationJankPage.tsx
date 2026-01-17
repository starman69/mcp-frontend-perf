import ExamplePage from '../components/shared/ExamplePage';
import BadAnimationComponent from '../examples/animation-jank/BadAnimationComponent';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'animation-jank')!;

export default function AnimationJankPage() {
  return (
    <ExamplePage example={example}>
      <BadAnimationComponent />
    </ExamplePage>
  );
}
