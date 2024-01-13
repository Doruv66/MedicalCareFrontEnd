import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from './components/Context/UserContext.jsx'
import Modal from 'react-modal';

Modal.setAppElement('#root');
const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true }}
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <React.Suspense fallback="Loading...">
            <App />
          </React.Suspense>
        </QueryClientProvider>
      </UserProvider>
    </React.StrictMode>
)
