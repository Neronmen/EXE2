"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformToInt = void 0;
const class_transformer_1 = require("class-transformer");
const TransformToInt = () => (0, class_transformer_1.Transform)(({ value }) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? undefined : parsed;
});
exports.TransformToInt = TransformToInt;
//# sourceMappingURL=transfomers.js.map