import ExamplePage from '../components/shared/ExamplePage';
import BadImagesComponent from '../examples/unoptimized-images/BadImagesComponent';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'unoptimized-images')!;

export default function UnoptimizedImagesPage() {
  return (
    <ExamplePage example={example}>
      <BadImagesComponent />
    </ExamplePage>
  );
}
