import React from 'react';
import { Container } from '@material-ui/core';

import { Background1 } from './shared';
import { DebitsList } from './features';

function App() {
  return (
    <Background1>
      <Container maxWidth="lg">
        <DebitsList />
      </Container>
    </Background1>
  );
}
export default App;
