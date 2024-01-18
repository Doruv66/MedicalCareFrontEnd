import { BrowserRouter } from 'react-router-dom'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar/NavBar'
import Router from './components/Router/Router'
import  Footer  from './components/Footer/Footer'
import { useUser } from './components/Context/UserContext';
import { ToastContainer } from 'react-toastify'
import { WebSocketProvider } from './components/Context/WebSocketContext';
import MedicalChatBot from './components/ChatBot/MedicalChatBot';

function App() {
  const user = useUser();

  

  return (
    <WebSocketProvider user={user}>
        <div className='app'>
          <BrowserRouter>
              <NavBar />
                <Router/>
                {user !== null && user.accountType === "PATIENT" && <MedicalChatBot />}
              <Footer />
              <ToastContainer toastStyle={{
                        fontSize: "15px",
                        color: "#fff",
                        background: "transparent",
                        border: "2px solid rgba(255, 255, 255, .5)",
                        borderRadius: "10px",
                        backdropFilter: "blur(50px)",
                        boxShadow: "0 0 30px rgba(0, 0, 0, .5)"
              }}/>
          </BrowserRouter>
      </div>
    </WebSocketProvider>
  )
}

export default App;
