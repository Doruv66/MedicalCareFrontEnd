import axios from "axios";

const API_URL = "http://localhost:8080/appointments";

const appointmentsAPI = {
    createAppointment: (requestData) => axios.post(API_URL, requestData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export default appointmentsAPI;