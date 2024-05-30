import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { IonContent } from '@ionic/react';
import {NextUIProvider} from '@nextui-org/react'
import '../src/theme/variables.css'
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>

<NextUIProvider>
      <App />
    </NextUIProvider>

  </React.StrictMode>
);