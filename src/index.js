import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.render(document.getElementById('root'));
const option = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...option}>
      <App />
    </AlertProvider>
  </Provider>
);
