import accountsAPI from '../../API/AccountsAPI'
import { jwtDecode } from 'jwt-decode'
import Toasts from '../Toasts/Toasts'
import userValidators from '../Validators/UserValidators';



const handleLoginSignUp = {
    //send sign up request
    async handleSignUp (newaccount, updateUser, navigate) {
        if(userValidators.validateUsername(Patient.username) && userValidators.validateEmail(Patient.email) && userValidators.validatePassword(Patient.password) && userValidators.validateLastName(Patient.lastName) && userValidators.validateName(Patient.firstName) && Patient.dateOfBirth !== null) {
            try {
                const response = await accountsAPI.createPatient(newaccount);
                Login.username = newaccount.username;
                Login.password = newaccount.password;
                handleLogin({username: Patient.username, password: Patient.password}, updateUser, navigate)
                Toasts.success('Account created with success');
            } catch(error) {
                if(error.response.data === "USERNAME_ALREADY_EXISTS") {
                    setErrorMessageSignUp("This username is already used, please use another one")
                } else if(error.response.data === "EMAIL_ALREADY_EXISTS") {
                    setErrorMessageSignUp("This email is already used, please use another one")
                } else {
                    setErrorMessageSignUp(error.response.data);
                }
            }
        } else {
            setErrorMessageSignUp("Please complete the form with valid data");
        }
    },

    //send login request
    async handleLogin (login, updateUser, navigate) {
        
        if(userValidators.validateUsername(login.username) && userValidators.validatePassword(login.password)) {
            try {
                const response = await loginAPI.login(login);
                console.log(response)
                const token = response.accessToken;
                console.log(token);
                if(token) {
                    localStorage.setItem('token', token);
                    if(token) {
                        const parsedToken = jwtDecode(token);
                        if(parsedToken && parsedToken.accountId) {
                            accountsAPI.getAccount(parsedToken.accountId)
                            .then(response => updateUser(response.data.account))
                            .catch(error => console.log(error))
                        }
                    }
                    navigate();
                    Toasts.success('Logged in succesfuly');
                }
            } catch (error) {
                if(error.response.data === "USERNAME_NOT_FOUND") {
                    setErrorMessageLogin("There is no user with provided username")
                } else if(error.response.data === "WRONG_PASSWORD") {
                    setErrorMessageLogin("Incorrect password!!!")
                } else {
                    setErrorMessageLogin(error.response.data);
                }
            }   
        } else {
            setErrorMessageLogin("provide valid data for login")
        }
    }
}

export default handleLoginSignUp;