import axios from "axios";

const API_URL = "http://localhost:8080/tokens"

const loginAPI = {
    login: async (data) => {
        try {
            const response = await axios.post(`${API_URL}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    refreshToken: async () => {
        try {
            const response = await axios.post(`${API_URL}/refresh-token`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default loginAPI;