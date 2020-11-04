import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Globalstyle from './styles/global';

import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes />
    </AppProvider>
    <Globalstyle />
  </BrowserRouter>
);

export default App;
