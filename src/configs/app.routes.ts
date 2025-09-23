
const auth = 'auth';
const permission = 'permission';
const user = 'user';
const baseRoutes = (root: string) => {
    return {
        root,
        getOne: `/${root}/:id`,
        update: `/${root}/:id`,
        delete: `/${root}/:id`,
    };
};

// Api Versions
const v1api = 'api/v1';

export const routesV1 = {
    apiversion: v1api,
    auth: {
        // ...baseRoutes(`${auth}`),
        login: `${auth}/login`,
        login_facebook: `${auth}/login-facebook`,
        signup: `${auth}/signup`,
        refresh: `${auth}/refresh-token`,
        forgotPassword: `${auth}/forgot-password`,
        veifyOTP: `${auth}/verify-otp`,
        resetPassword: `${auth}/reset-password`,
        resendOTP: `${auth}/resend-otp`,
    },
    permission: {
        getPermissonByRole: `${permission}/:roleID`,
    },
    test: {
        ...baseRoutes(`test`),
    },
}