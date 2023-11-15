import axios from "axios";

const API_URL = "http://localhost:8080/timeslots";

const timeSlotsAPI = {
    getByDate: (timestamp, doctorid) => axios.get(`${API_URL}/${doctorid}/${timestamp}`)
}

export default timeSlotsAPI;