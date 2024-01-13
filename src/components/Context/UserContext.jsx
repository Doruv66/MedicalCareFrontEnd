import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import loginAPI from "../../API/LoginAPI";
import doctorAPI from "../../API/DoctorAPI";
import patientAPI from "../../API/PatientsAPI";
import adminAPI from "../../API/AdminAPI";

const UserContext = createContext();
const UpdateUserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const useUpdateUser = () => {
    return useContext(UpdateUserContext);
};

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            const parsedToken = jwtDecode(token);
            if(parsedToken && parsedToken.accountId) {
                //call the api based on a switch statement 
                switch(parsedToken.role) {
                    case "DOCTOR":
                        doctorAPI.getDoctor(parsedToken.accountId)
                        .then(response => setUser(response.data.account))
                        .catch(error => console.log(error))
                        break;
                    case "PATIENT":
                        patientAPI.getAccount(parsedToken.accountId)
                        .then(response => setUser(response.data.account))
                        .catch(error => console.log(error))
                        break;
                    case "ADMIN":
                        adminAPI.getAdmin(parsedToken.accountId)
                        .then(response => setUser(response.data.account))
                        .catch(error => console.log(error))
                        break;
                }
            }
            if(user === null) {
                loginAPI.refreshToken()
                .then((res) => {
                    localStorage.setItem('token', res.accessToken);
                    setReload(!reload);
                    console.log('token updated')
                })
                .catch(err => console.log(err))
            }
        }
    }, [reload])

    return (
        <UserContext.Provider value={user}>
            <UpdateUserContext.Provider value={setUser}>
                {children}
            </UpdateUserContext.Provider>
        </UserContext.Provider>
    );
}