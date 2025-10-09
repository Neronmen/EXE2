
const auth = 'auth';
const permission = 'permission';
const notification = 'notification';
const user = 'user';
const profile = 'profile';
const adddress = 'adddress';
const seller = 'seller';
const sellers = 'sellers';
const shop = 'shop';
const categoryGlobal = 'categories-global';
const categoryShop = 'categories-shop';
const product = 'product';
const like = 'like';
const comment = 'comment';
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
    shop: {
        ...baseRoutes(`${shop}/profile`),
        followShop: `${shop}/:id/follow`,
        unfollowShop: `${shop}/:id/unfollow`,
        listFollowShop: `${shop}/:id/follow`,
        createReviewShop: `${shop}/:id/review`,
        myReviewShop: `${shop}/:id/my-review`,
        updateReviewShop: `${shop}/review/:id`,
        getShopClient: `public/${shop}/:slug`,
        getShopListClient: `public/${shop}/list`,
        getDetailCategoryShopListClient: `public/${shop}/:slug/categories/:categoryID`,
        getAllProductShopClient: `public/${shop}/:slug/products`,
        getAllProductHomePageClient: `public/homePage/products`,
        getDetailProductShopClient: `public/product/:id`,
        getAllProductCategoryGlobalClient: `public/categories-global/:id`,


    },
    categoryGlobal: {
        ...baseRoutes(`${categoryGlobal}`),

        publicCategoriesGlobal: `public/${categoryGlobal}`,
    },
    categoryShop: {
        ...baseRoutes(`${categoryShop}`),
    },
    product: {
        // ...baseRoutes(`${product}`),
        createProduct: `${shop}/seller/${product}`,
        getDetailProduct: `${shop}/seller/${product}/:id`,
        viewUsersLikeProduct: `${shop}/seller/${product}/:id/likes`,
        addNewImage: `${shop}/seller/${product}/:id/images`,
        changeStatus: `${shop}/seller/${product}/:id/change-status`,
        deleteImage: `${shop}/seller/${product}/:id/images/:imageId`,
        setMain: `${shop}/seller/${product}/:id/images/:imageId/set-main`,

    },
    like: {
        ...baseRoutes(`${like}`),
    },
    comment: {
        ...baseRoutes(`${comment}`),
        updateComment: `${comment}/:commentId`
    },


    test: {
        ...baseRoutes(`test`),
    },

}