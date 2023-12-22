import axios from "axios";

const API_URL = "http://localhost:8080/accounts"

const accountsAPI = {
    getDoctors: () => axios.get(`${API_URL}/doctors`),
    getAccount: (id) => axios.get(`${API_URL}/${id}`),
    getDoctorsByKeyword: (keyword) => axios.get(`${API_URL}/doctors/search?keyword=${keyword}`),
    getTopDoctors: () => axios.get(`${API_URL}/doctors-top`),
    createPatient: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/create-patient`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updatePatient: async (id, data) => {
        try {
            const response = axios.put(`${API_URL}/update-patient/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            return (await response).data;
        } catch (error) {
            throw error;    
        }
    }
}

export default accountsAPI;