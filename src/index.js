import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './components/Store/Auth-Context';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </BrowserRouter>

);