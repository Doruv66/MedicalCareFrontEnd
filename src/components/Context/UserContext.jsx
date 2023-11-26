import { createContext, useContext, useEffect, useState } from "react";
import accountsAPI from "../../API/AccountsAPI";
import { jwtDecode } from "jwt-decode";

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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            const parsedToken = jwtDecode(token);
            if(parsedToken && parsedToken.accountId) {
                accountsAPI.getAccount(parsedToken.accountId)
                .then(response => setUser(response.data.account))
                .catch(error => console.log(error))
            }
        }
    }, [])

    return (
        <UserContext.Provider value={user}>
            <UpdateUserContext.Provider value={setUser}>
                {children}
            </UpdateUserContext.Provider>
        </UserContext.Provider>
    );
}