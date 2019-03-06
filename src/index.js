import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

//!!! нужны отдельные функции-сервисы для загрузки данных по API - чтобы компоненты их брали из файла services.js и они были в объекте

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
