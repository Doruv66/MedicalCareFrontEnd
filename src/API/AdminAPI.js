import axios from "axios";

const API_URL = "http://localhost:8080/admins"

const adminAPI = {
    getAdmin: (id) => axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export default adminAPI;