/**
 * @copyright 2025 pomelo925
 * @license Apache-2.0
 */


// node modules
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// components
import App from './App.jsx';

// css link
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)