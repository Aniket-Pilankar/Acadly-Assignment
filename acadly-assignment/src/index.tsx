import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider as BrowserProvider } from 'react-redux'
import {store} from './Redux/store'

// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json'); 
// const middlewares = jsonServer.defaults();
// const port = process.env.PORT || 2345;

// server.use(middlewares);
// server.use(router);

// server.listen(port);

ReactDOM.render(
  <React.StrictMode>
    <BrowserProvider store={store}>
    <App />
    </BrowserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
