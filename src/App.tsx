import React from 'react';
import Globalstyle from './styles/global';

import SignIn from './pages/SignIn';
import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>

    <Globalstyle />
  </>
);

export default App;
