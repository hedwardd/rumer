import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App';
import Montserrat from './fonts/Montserrat-Regular.ttf';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import reportWebVitals from './reportWebVitals';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    src: url(${Montserrat});
  }
  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }
  input {
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
  }
  button {
    font-family: 'Montserrat', sans-serif;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
