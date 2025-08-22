import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

/* Styles */
import '../src/styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* PWA Automatic Update Support */
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
