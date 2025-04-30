const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function isValidLoginForm(username: string, password: string) {
    if (!username || !password) {
        return false;
    }

    if (username.length < 6 || username.length > 32) {
        return false
    }

    if (password.length < 6 || password.length > 32) {
        return false
    }
    
    return true;
};

export function isValidSignUpForm(username: string, email: string, password: string) {
    if (!username || !email || !password) {
        return false;
    }

    if (!emailRegex.test(email)) {
        return false;
    }

    if (username.length < 6 || username.length > 32) {
        return false
    }

    if (email.length < 6 || email.length > 64) {
        return false
    }

    if (password.length < 6 || password.length > 32) {
        return false
    }
    
    return true;
};