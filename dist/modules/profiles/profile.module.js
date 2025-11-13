"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../libs/prisma/prisma.module");
const jwt_1 = require("@nestjs/jwt");
const getProfile_controller_1 = require("./controllers/getProfile.controller");
const getProfile_service_1 = require("./services/getProfile.service");
const editProfile_controller_1 = require("./controllers/editProfile.controller");
const editProfile_service_1 = require("./services/editProfile.service");
const supabase_service_1 = require("../common/subapase/supabase.service");
const profile_repository_1 = require("./repositories/profile.repository");
const changePassProfile_controller_1 = require("./controllers/changePassProfile.controller");
const changePassProfile_service_1 = require("./services/changePassProfile.service");
const changePassProfile_repository_1 = require("./repositories/changePassProfile.repository");
const changeEmail_controller_1 = require("./controllers/changeEmail.controller");
const changeEmail_service_1 = require("./services/changeEmail.service");
const verify_otp_email_controller_1 = require("./controllers/verify-otp-email.controller");
const verify_otp_email_service_1 = require("./services/verify-otp-email.service");
const mail_module_1 = require("../common/mail/mail.module");
const resend_otp_email_controller_1 = require("./controllers/resend-otp-email.controller");
const resend_otp_email_service_1 = require("./services/resend-otp-email.service");
const resetEmail_controller_1 = require("./controllers/resetEmail.controller");
const resetEmail_service_1 = require("./services/resetEmail.service");
const httpController = [
    getProfile_controller_1.GetProfileController,
    editProfile_controller_1.EditProfileController,
    changePassProfile_controller_1.ChangePassProfileController,
    changeEmail_controller_1.ChangeEmailProfileController,
    verify_otp_email_controller_1.VerifyOtpEmailController,
    resend_otp_email_controller_1.ResendOTPEmailController,
    resetEmail_controller_1.ResetEmailController
];
const Repository = [
    profile_repository_1.ProfileRepository,
    changePassProfile_repository_1.ChangePassProfileRepository
];
const Services = [
    getProfile_service_1.GetProfileService,
    editProfile_service_1.EditProfileService,
    supabase_service_1.SupabaseService,
    jwt_1.JwtService,
    changePassProfile_service_1.ChangePassProfileService,
    changeEmail_service_1.ChangeEmailService,
    verify_otp_email_service_1.VerifyOtpEmailService,
    resend_otp_email_service_1.ResendOTPEmailService,
    resetEmail_service_1.ResetPasswordService
];
let ProfileModule = class ProfileModule {
};
exports.ProfileModule = ProfileModule;
exports.ProfileModule = ProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, mail_module_1.MailerModule],
        controllers: [...httpController],
        providers: [...Services, ...Repository],
    })
], ProfileModule);
//# sourceMappingURL=profile.module.js.map