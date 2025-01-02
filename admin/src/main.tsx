import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AppProvider } from './app.provider.tsx';
import { initPushEvent } from '@asaje/sse-push-event-client';

initPushEvent(import.meta.env.VITE_APP_API_URL + '/events');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
);
