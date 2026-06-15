import TextViewer from '@components/TextViewer/index';
import { useConfig } from '@context/Config';

const App: React.FC = () => {
    const config = useConfig();

    if (!config) return null;

    return <TextViewer />
}

export default App;