import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import LoginSignUpPage from "../../pages/LoginSignUpPage";
function Router() {
    return (
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/doctors" element={<HomePage />}/>
          <Route path="/services" element={<HomePage />}/>
          <Route path="/login" element={<LoginSignUpPage />}/>
        </Routes>
    )
}

export default Router;