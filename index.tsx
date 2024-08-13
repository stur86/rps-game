import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    return <React.StrictMode>
        <div>Hello</div>
    </React.StrictMode>;
}

window.onload = () => {
    const domRoot = document.getElementById('root');
    if (!domRoot) {
        throw new Error('Root element not found');
    }
    const root = createRoot(domRoot);
    root.render(<App />);
};