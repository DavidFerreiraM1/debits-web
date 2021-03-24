import React from 'react';
import { Container } from '@material-ui/core';

import { Background1 } from './shared';
import { DebitsList } from './features';
import { AlertContextProvider } from './components/alert';

import './scroll.css';

function App() {
  return (
    <AlertContextProvider>
      <Background1>
        <Container maxWidth="lg">
          <DebitsList />
        </Container>
      </Background1>
    </AlertContextProvider>
  );
}
export default App;
