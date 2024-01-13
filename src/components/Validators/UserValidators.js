const userValidators = {
    validateUsername(value) {
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        return usernameRegex.test(value);
    },
    validateEmail(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    validatePassword(value) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return passwordRegex.test(value);
    },
    validateLastName(value){
        const nameRegex = /^[A-Za-z]+$/;
        return nameRegex.test(value);
    },
    validateName(value) {
        const nameRegex = /^[A-Za-z]+$/;
        return nameRegex.test(value);
    },
    validateDescription(value) {
        const descriptionRegex = /^.{50,}$/;
        return descriptionRegex.test(value);
    }
}
export default userValidators;