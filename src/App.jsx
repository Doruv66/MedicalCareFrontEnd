import { BrowserRouter } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import Router from './components/Router/Router'
import  Footer  from './components/Footer/Footer'
import { UserProvider } from './components/Context/UserContext'
function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <UserProvider>
          <NavBar />
            <Router/>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
