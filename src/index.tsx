import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { setupStore } from './app/store/config/store';
import { App } from './app/App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Контейнер не найден. Не удалось вмонтировать приложение');
}

const root = createRoot(container);
const store = setupStore();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
