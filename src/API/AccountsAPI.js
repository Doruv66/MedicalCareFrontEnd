import axios from "axios";

const API_URL = "http://localhost:8080/accounts"

const accountsAPI = {
    getDoctors: () => axios.get(`${API_URL}/doctors`),
    getAccount: (id) => axios.get(`${API_URL}/${id}`)
}

export default accountsAPI;