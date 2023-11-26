import axios from "axios";

const API_URL = "http://localhost:8080/accounts"

const accountsAPI = {
    getDoctors: () => axios.get(`${API_URL}/doctors`),
    getAccount: (id) => axios.get(`${API_URL}/${id}`),
    createPatient: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/create-patient`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default accountsAPI;