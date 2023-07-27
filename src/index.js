import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { positions, transitions , Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'
import { Provider } from 'react-redux';
import store from './store/store';
const root = createRoot(document.getElementById('root'));
const option={
  timeout:5000,
  position :positions.BOTTOM_CENTER,
  transition:transitions.SCALE,
}
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...option}>
    <App />
    </AlertProvider>
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
