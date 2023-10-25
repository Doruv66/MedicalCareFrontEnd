import axios from "axios";

const API_URL = "http://localhost:8080/reviews";

const reviewsAPI = {
    getAverage: (doctorid) => axios.get(`${API_URL}/doctor/${doctorid}`),
    getDoctorReviews: (doctorid) => axios.get(`${API_URL}/doctors/${doctorid}`)
}

export default reviewsAPI;

