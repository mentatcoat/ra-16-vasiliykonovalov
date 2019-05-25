import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import PropTypes from 'prop-types';


function SizeInput(props) {

  return (
    <li>
      <label>
      <input checked={props.value} value={props.size} type="checkbox" className="checkbox" name="size"/>
      <span className="checkbox-custom"></span>
      <span className="label">{props.size}</span>
      </label>
    </li>
  );
}


export default SizeInput;
