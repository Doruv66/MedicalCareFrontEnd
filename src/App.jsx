import { BrowserRouter } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import Router from './components/Router/Router'
import  Footer  from './components/Footer/Footer'
function App() {
  return (
    <div className='app'>
      
      <BrowserRouter>
        <NavBar />
        <Router/>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;
