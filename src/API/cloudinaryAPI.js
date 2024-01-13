import axios from "axios";

const preset_key = "fontys_student";
const clould_name = "dgtga6kde";

const API_URL = `https://api.cloudinary.com/v1_1/${clould_name}/image/upload`

const cloudinaryAPI = {
    saveImage: async (formData) => {
        try {
            formData.append('upload_preset', preset_key);
            const response = await axios.post(`${API_URL}`, formData);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default cloudinaryAPI;