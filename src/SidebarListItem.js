import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import PropTypes from 'prop-types';

// .beige {
  // background: #E5DBC5;
// }

function SidebarListItem({elem, chosen}) {

  return (
    <li>
      <a className={chosen ? 'chosen' : ''} href="#">
        <div style={{background: getHexByColor(elem) }} className="color"></div>
        <span className="color-name">{elem}</span>
      </a>
    </li>
  );

}

SidebarListItem.propTypes = {
};

function getHexByColor(colorName) {
  const colors = {"Бардо": "#B00000", "Беж": "#F5F5DC", "Бежевый": "#F5F5DC", "Белый": "#FFFFFF", "Коричневый": "#A52A2A", "Красный": "#FF0000", "Металлик": "#A0522D", "Оранжевый": "#FFA500", "Прозрачный": "#F5F5F5",
  "Разноцветные": "linear-gradient(to right, #EDFF21, #6495ED)", "Розовый": "#FFC0CB",  "Серебряный": "#C0C0C0", "Серый": "#808080", "Синий": "#0000FF", "Темно-салатовый": "#aac0a9", "Фиолетовый": "#8A2BE2", "Черно-белый": "#FFFFFF", "Черный": "#000000"
  };

  return colors[colorName];
}

export default SidebarListItem;
