import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { GlobalDataProvider } from './Helpers/GlobalDataProvider.jsx';

createRoot(document.getElementById('root')).render(
    <GlobalDataProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalDataProvider>
)
