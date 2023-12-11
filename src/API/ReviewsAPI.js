import axios from "axios";

const API_URL = "http://localhost:8080/reviews";

const reviewsAPI = {
    getAverage: (doctorid) => axios.get(`${API_URL}/average/${doctorid}`),
    getDoctorReviews: (doctorid) => axios.get(`${API_URL}/doctors/${doctorid}`),
    createReview: (request) => axios.post(API_URL, request, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }),
}

export default reviewsAPI;

