export const formInputValidation = (
    user: {
        identifier: string, 
        password: string, 
    }) => {
    const errors = {
        identifier: '',
        password: '', 
    }

    const identifierValidation = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!user.identifier.trim() || !identifierValidation) {
        errors.identifier = 'Email is Required or not Valid !!';
    }
    if (!user.password.trim() || user.password.length < 5 || user.password.length > 12) {
        errors.password = 'Password is Required or so Weak !!';
    }

    return errors;
}