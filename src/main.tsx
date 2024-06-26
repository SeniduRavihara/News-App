
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthContextProvider from './context/AuthContext.tsx'
import DataContextProvider from './context/DataContext.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <DataContextProvider>
          <App />
        </DataContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
