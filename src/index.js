import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {ThroughProvider} from 'react-through';

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL} >
    <ThroughProvider>
      <App />
    </ThroughProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
