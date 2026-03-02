let logoutHandler: (() => void) | null = null;

export const registerLogoutHandler = (f: () => void) => {
    logoutHandler = f;
    return () => {
        if (logoutHandler === f) {
            logoutHandler = null;
        }
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('phone');
    if (logoutHandler) {
        logoutHandler();
    }
};

export default {
    registerLogoutHandler,
    logout
};
