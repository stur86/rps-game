import { createRoot } from 'react-dom/client';
import App from './src/App';

window.onload = () => {
    const domRoot = document.getElementById('root');
    if (!domRoot) {
        throw new Error('Root element not found');
    }
    const root = createRoot(domRoot);
    root.render(<App />);
};