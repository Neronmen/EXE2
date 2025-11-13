export declare function successResponse(statusCode?: number, data?: any, message?: string): {
    success: boolean;
    statusCode: number;
    message: string;
    data: any;
};
export declare function createdResponse(data?: any, message?: string): {
    success: boolean;
    statusCode: number;
    message: string;
    data: any;
};
export declare function noContentResponse(message?: string): {
    success: boolean;
    statusCode: number;
    message: string;
    data: null;
};
export declare function errorResponse(statusCode: number, message?: string, error?: any): never;
export declare function badRequest(message?: string, error?: any): never;
export declare function unauthorized(message?: string): never;
export declare function forbidden(message?: string): never;
export declare function notFound(message?: string): never;
export declare function conflict(message?: string): never;
export declare function validationError(errors: any, message?: string): never;
export declare function internalServerError(message?: string, error?: any): never;
export declare function paginationResponse<T>(data: T[], total: number, page: number, size: number, message?: string): {
    success: boolean;
    statusCode: number;
    message: string;
    data: T[];
    meta: {
        total: number;
        page: number;
        size: number;
    };
};
