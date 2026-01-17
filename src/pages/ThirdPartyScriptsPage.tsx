import ExamplePage from '../components/shared/ExamplePage';
import BadThirdPartyComponent from '../examples/third-party-scripts/BadThirdPartyComponent';
import { examples } from '../data/examples';

const example = examples.find((e) => e.id === 'third-party-scripts')!;

export default function ThirdPartyScriptsPage() {
  return (
    <ExamplePage example={example}>
      <BadThirdPartyComponent />
    </ExamplePage>
  );
}
