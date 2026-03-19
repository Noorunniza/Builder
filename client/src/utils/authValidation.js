/**
 ✅ EMAIL VALIDATION
*/
export const isValidEmail = (email) => {
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
};

/**
 ✅ PASSWORD VALIDATION
 (Minimum 6 characters)
*/
export const isValidPassword = (password) => {
    return password.length >= 6;
};

/**
 ✅ REGISTER VALIDATION
 Returns error message OR null
*/
export const validateRegister = ({
    email,
    password,
    confirmPassword,
}) => {

    if (!email || !password || !confirmPassword) {
        return "All fields are required";
    }

    if (!isValidEmail(email)) {
        return "Please enter a valid email";
    }

    if (!isValidPassword(password)) {
        return "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
        return "Passwords do not match";
    }

    return null;
};

/**
 ✅ LOGIN VALIDATION
 Returns error message OR null
*/
export const validateLogin = ({
    email,
    password,
}) => {

    if (!email || !password) {
        return "Both email and password are required";
    }

    if (!isValidEmail(email)) {
        return "Please enter a valid email";
    }

    return null;
};
