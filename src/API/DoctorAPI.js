import axios from "axios";

const API_URL = "http://localhost:8080/doctors"

const doctorAPI = {
    getDoctor: (id) => axios.get(`${API_URL}/${id}`),
    getDoctors: (pageNumber, pageSize) => axios.get(`${API_URL}/doctors`, {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize
        }
    }),
    getDoctorsBySpeciality: (speciality) => 
        axios.get(`${API_URL}/speciality`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {
                speciality: speciality
            }
        }),
    getDoctorsByKeyword: (keyword) => axios.get(`${API_URL}/search?keyword=${keyword}`),
    getTopDoctors: () => axios.get(`${API_URL}/top`),
    createDoctor: async (data) => {
        try {
            const response = await axios.post(`${API_URL}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data; 
        } catch (error) {
            throw error; 
        }
    }
}

export default doctorAPI;