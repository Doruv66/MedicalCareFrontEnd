import axios from "axios";

const API_URL = "http://localhost:8080/appointments";

const appointmentsAPI = {
    createAppointment: (requestData) => axios.post(API_URL, requestData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }),
    getPreviousAppointments: (patientId) => axios.get(`${API_URL}/previous/${patientId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }),
    getUpcomingAppointments: (patientId) => axios.get(`${API_URL}/upcoming/${patientId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }),
    deleteAppointment: (appId) => axios.delete(`${API_URL}/${appId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }),
    getDoctorAppointments: (docId) => axios.get(`${API_URL}/doctor/${docId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }),
    updateAppointment: (id, requestData) => axios.put(`${API_URL}/${id}`, requestData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }),

}

export default appointmentsAPI;