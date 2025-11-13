"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const login_controller_1 = require("./controllers/login.controller");
const login_service_1 = require("./services/login.service");
const prisma_module_1 = require("../../libs/prisma/prisma.module");
const jwt_1 = require("@nestjs/jwt");
const auth_repository_1 = require("./repositories/auth.repository");
const signup_controller_1 = require("./controllers/signup.controller");
const signup_service_1 = require("./services/signup.service");
const refresh_token_controller_1 = require("./controllers/refresh-token.controller");
const refresh_token_service_1 = require("./services/refresh-token.service");
const forgot_password_controller_1 = require("./controllers/forgot-password.controller");
const forgot_password_service_1 = require("./services/forgot-password.service");
const mail_module_1 = require("../common/mail/mail.module");
const reset_password_controller_1 = require("./controllers/reset-password.controller");
const reset_password_service_1 = require("./services/reset-password.service");
const verify_otp_controller_1 = require("./controllers/verify-otp.controller");
const verify_otp_service_1 = require("./services/verify-otp.service");
const resend_otp_controller_1 = require("./controllers/resend-otp.controller");
const resend_otp_service_1 = require("./services/resend-otp.service");
const login_facebook_controller_1 = require("./controllers/login-facebook.controller");
const login_facebook_service_1 = require("./services/login-facebook.service");
const supabase_service_1 = require("../common/subapase/supabase.service");
const httpController = [
    login_controller_1.LoginController,
    signup_controller_1.SignUpController,
    refresh_token_controller_1.RefreshController,
    forgot_password_controller_1.ForgotPasswordController,
    verify_otp_controller_1.VerifyOtpController,
    reset_password_controller_1.ResetPasswordController,
    resend_otp_controller_1.ResendOTPController,
    login_facebook_controller_1.LoginFacebookController,
];
const Repository = [
    auth_repository_1.AuthRepository
];
const Services = [
    login_service_1.LoginService,
    signup_service_1.SignUpService,
    refresh_token_service_1.RefreshService,
    forgot_password_service_1.ForgotPasswordService,
    verify_otp_service_1.VerifyOtpService,
    reset_password_service_1.ResetPasswordService,
    resend_otp_service_1.ResendOTPService,
    login_facebook_service_1.LoginFacebookService,
    supabase_service_1.SupabaseService,
    jwt_1.JwtService
];
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, mail_module_1.MailerModule],
        controllers: [...httpController],
        providers: [...Services, ...Repository],
        exports: [auth_repository_1.AuthRepository, jwt_1.JwtService]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map