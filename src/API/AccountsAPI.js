import axios from "axios";

const API_URL = "http://localhost:8080/accounts"

const accountsAPI = {
    getDoctors: () => axios.get(`${API_URL}/doctors`)
}

export default accountsAPI;