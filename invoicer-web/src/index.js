import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router} from 'react-router-dom'

import './index.css'

import {MainInvoicer} from './MainInvoicer/Main'


const appEl = document.getElementById('root')
if (appEl){
  ReactDOM.render(

  <Router>
  <MainInvoicer/>
  </Router>, 
 
  appEl)
}


