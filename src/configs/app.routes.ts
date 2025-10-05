
const auth = 'auth';
const permission = 'permission';
const notification = 'notification';
const user = 'user';
const profile = 'profile';
const adddress = 'adddress';
const seller = 'seller';
const sellers = 'sellers';
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
    notification: {
        ...baseRoutes(`${notification}`),
        getUserNotifications: `${notification}/:userID`,
        readUserNotifications: `${notification}/:notificationID/read`,
        readAllUserNotifications: `${notification}/readAll`,

    },
    profile: {
        ...baseRoutes(`${profile}`),
        changePassProfile: `${profile}/change-password/:userID`,
    },
    adddress: {
        ...baseRoutes(`${adddress}`),
        getDefaultAddress: `${adddress}/default`,
        setDefaultAddress: `${adddress}/:id/default`,
    },
    seller: {
        ...baseRoutes(`${seller}`),
        registerSeller: `${seller}/register`,
        resubmitRegisterSeller: `${seller}/register/resubmit`,
        getRegisterSeller: `${seller}/register/profile`,
        getSellersRegisterSeller: `${sellers}`,
        getDetailSellersRegisterSeller: `${sellers}/:id`,
        approveRegisterSeller: `${sellers}/:id/approve`,
        rejectRegisterSeller: `${sellers}/:id/reject`,
    },
    test: {
        ...baseRoutes(`test`),
    },

}