import React from 'react';
import ReactDOM from 'react-dom'
import Home from './pages/Home';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  
)

reportWebVitals();