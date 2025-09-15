export const formInputValidation = (
    user: {
        email: string, 
        password: string, 
    }) => {
    const errors = {
        email: '',
        password: '', 
    }

    const emailValidation = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!user.email.trim() || !emailValidation) {
        errors.email = 'Email is Required or not Valid !!';
    }
    if (!user.password.trim() || user.password.length < 5 || user.password.length > 12) {
        errors.password = 'Password is Required or so Weak !!';
    }

    return errors;
}