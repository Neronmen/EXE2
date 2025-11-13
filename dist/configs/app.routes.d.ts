export declare const routesV1: {
    apiversion: string;
    auth: {
        login: string;
        login_facebook: string;
        signup: string;
        refresh: string;
        forgotPassword: string;
        veifyOTP: string;
        resetPassword: string;
        resendOTP: string;
    };
    permission: {
        getPermissonByRole: string;
    };
    notification: {
        getUserNotifications: string;
        readUserNotifications: string;
        readAllUserNotifications: string;
        root: string;
        getOne: string;
        update: string;
        delete: string;
    };
    profile: {
        changePassProfile: string;
        changeEmailProfile: string;
        veifyOTPEmail: string;
        resendOTPEmail: string;
        resetEmail: string;
        root: string;
        getOne: string;
        update: string;
        delete: string;
    };
    adddress: {
        getDefaultAddress: string;
        setDefaultAddress: string;
        root: string;
        getOne: string;
        update: string;
        delete: string;
    };
    seller: {
        registerSeller: string;
        resubmitRegisterSeller: string;
        getRegisterSeller: string;
        getSellersRegisterSeller: string;
        getDetailSellersRegisterSeller: string;
        approveRegisterSeller: string;
        rejectRegisterSeller: string;
        root: string;
        getOne: string;
        update: string;
        delete: string;
    };
    shop: {
        followShop: string;
        unfollowShop: string;
        listFollowShop: string;
        createReviewShop: string;
        myReviewShop: string;
        updateReviewShop: string;
        getShopClient: string;
        getShopListClient: string;
        getDetailCategoryShopListClient: string;
        getAllProductShopClient: string;
        getAllProductHomePageClient: string;
        getDetailProductShopClient: string;
        getAllProductCategoryGlobalClient: string;
        root: string;
        getOne: string;
        update: string;
        delete: string;
    };
    categoryGlobal: {
        publicCategoriesGlobal: string;
        root: string;
        getOne: string;
        update: string;
        delete: string;
    };
    categoryShop: {
        root: string;
        getOne: string;
        update: string;
        delete: string;
    };
    product: {
        createProduct: string;
        getDetailProduct: string;
        viewUsersLikeProduct: string;
        addNewImage: string;
        changeStatus: string;
        deleteImage: string;
        setMain: string;
    };
    like: {
        root: string;
        getOne: string;
        update: string;
        delete: string;
    };
    comment: {
        updateComment: string;
        root: string;
        getOne: string;
        update: string;
        delete: string;
    };
    test: {
        root: string;
        getOne: string;
        update: string;
        delete: string;
    };
};
