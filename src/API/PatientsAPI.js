import axios from "axios";

const API_URL = "http://localhost:8080/patients"

const patientAPI = {
    getAccount: (id) => axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }),
    createPatient: async (data) => {
        try {
            const response = await axios.post(`${API_URL}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updatePatient: async (id, data) => {
        try {
            const response = axios.put(`${API_URL}/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            return (await response).data;
        } catch (error) {
            throw error;    
        }
    },
}

export default patientAPI;