import { BrowserRouter } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import Router from './components/Router/Router'
import  Footer  from './components/Footer/Footer'
import { UserProvider } from './components/Context/UserContext'
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <UserProvider>
          <NavBar />
            <Router/>
          <Footer />
          <ToastContainer toastStyle={{
                    fontSize: "15px",
                    color: "#fff",
                    background: "transparent",
                    border: "2px solid rgba(255, 255, 255, .5)",
                    borderRadius: "15px",
                    backdropFilter: "blur(50px)",
                    boxShadow: "0 0 30px rgba(0, 0, 0, .5)"
          }}/>
        </UserProvider> 
      </BrowserRouter>
    </div>
  )
}

export default App;
