import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import LoginSignUpPage from "../../pages/LoginSignUpPage";
import DoctorsPage from "../../pages/DoctorsPage";
import DoctorPage from "../../pages/DoctorPage";
import BookAppointment from "../../pages/BookAppointment";
function Router() {
    return (
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/doctors" element={<DoctorsPage />}/>
          <Route path="/services" />
          <Route path="/login" element={<LoginSignUpPage />}/>
          <Route path="/doctors/:id" element={<DoctorPage />} />
          <Route path="/appointments/:doctorId" element={<BookAppointment/>} />
        </Routes>
    )
}

export default Router;