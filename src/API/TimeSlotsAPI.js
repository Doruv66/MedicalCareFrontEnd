import axios from "axios";

const API_URL = "http://localhost:8080/timeslots";

const timeSlotsAPI = {
    getByDate: (timestamp, doctorid) => axios.get(`${API_URL}/${doctorid}/${timestamp}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }),
    generateTimeSlots: (data) => axios.post(API_URL, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }),
}

export default timeSlotsAPI;