import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Applicant from './components/Applicant';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

ReactDOM.render(
  <BrowserRouter>
    <Applicant title='Applicant' />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
