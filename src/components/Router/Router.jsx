import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import LoginSignUpPage from "../../pages/LoginSignUpPage";
import DoctorsPage from "../../pages/DoctorsPage";
import DoctorPage from "../../pages/DoctorPage";
import BookAppointment from "../../pages/BookAppointment";
import Logout from "../../pages/Logout";
import PatientAppointments from "../../pages/PatientAppointments";
import DoctorSchedule from "../../pages/DoctorSchedule";
import AdminDashboard from "../../pages/AdminDashboard";
import Profile from "../../pages/Profile";
import AddDoctor from "../../pages/AddDoctor";
function Router() {
    return (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/login" element={<LoginSignUpPage />} />
          <Route path="/doctors/:id" element={<DoctorPage />} />
          <Route path="/appointments/:doctorId" element={<BookAppointment />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/patientappointments" element={<PatientAppointments />} />
          <Route path="/schedule" element={<DoctorSchedule />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/adddoctor" element={<AddDoctor />} />
        </Routes>
    )
}

export default Router;