import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import LoginSignUpPage from "../../pages/LoginSignUpPage";
import DoctorsPage from "../../pages/DoctorsPage";
function Router() {
    return (
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/doctors" element={<DoctorsPage />}/>
          <Route path="/services" />
          <Route path="/login" element={<LoginSignUpPage />}/>
        </Routes>
    )
}

export default Router;