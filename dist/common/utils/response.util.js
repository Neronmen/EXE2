"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = successResponse;
exports.createdResponse = createdResponse;
exports.noContentResponse = noContentResponse;
exports.errorResponse = errorResponse;
exports.badRequest = badRequest;
exports.unauthorized = unauthorized;
exports.forbidden = forbidden;
exports.notFound = notFound;
exports.conflict = conflict;
exports.validationError = validationError;
exports.internalServerError = internalServerError;
exports.paginationResponse = paginationResponse;
const common_1 = require("@nestjs/common");
function successResponse(statusCode = 200, data = null, message = 'Thành công') {
    return {
        success: true,
        statusCode,
        message,
        data,
    };
}
function createdResponse(data = null, message = 'Tạo mới thành công') {
    return successResponse(201, data, message);
}
function noContentResponse(message = 'Xử lý thành công') {
    return {
        success: true,
        statusCode: 204,
        message,
        data: null,
    };
}
function errorResponse(statusCode, message = 'Đã xảy ra lỗi', error = null) {
    throw new common_1.HttpException({
        success: false,
        statusCode,
        message,
        error,
    }, statusCode);
}
function badRequest(message = 'Dữ liệu không hợp lệ', error = null) {
    return errorResponse(400, message, error);
}
function unauthorized(message = 'Chưa xác thực') {
    return errorResponse(401, message);
}
function forbidden(message = 'Bạn không có quyền truy cập') {
    return errorResponse(403, message);
}
function notFound(message = 'Không tìm thấy dữ liệu') {
    return errorResponse(404, message);
}
function conflict(message = 'Dữ liệu bị trùng') {
    return errorResponse(409, message);
}
function validationError(errors, message = 'Dữ liệu không hợp lệ') {
    return errorResponse(422, message, errors);
}
function internalServerError(message = 'Lỗi hệ thống', error = null) {
    return errorResponse(500, message, error);
}
function paginationResponse(data, total, page, size, message = 'Lấy danh sách thành công') {
    return {
        success: true,
        statusCode: 200,
        message,
        data,
        meta: {
            total,
            page,
            size,
        },
    };
}
//# sourceMappingURL=response.util.js.map