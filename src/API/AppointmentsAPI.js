import axios from "axios";

const API_URL = "http://localhost:8080/appointments";

const appointmentsAPI = {
    createAppointment: (requestData) => axios.post(API_URL, requestData)
}

export default appointmentsAPI;