import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/doctors" element={<HomePage />}/>
          <Route path="/services" element={<HomePage />}/>
          <Route path="/contact" element={<HomePage />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
