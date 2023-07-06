import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import './index.css';

let previousTitle = document.title
window.addEventListener('blur', () => {
  previousTitle = document.title
  document.title = '¡Te esperamos!🍰🥳';
})

window.addEventListener('focus', () => {
  document.title = previousTitle
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
