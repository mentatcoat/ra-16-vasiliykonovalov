import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

//??? прочитав в одной статье эту идею я реализовал ее тут, т к показалось разумным. Уместна ли здесь такая реализация: я создал services.js из которой беру методы для работы c API сервера?

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
