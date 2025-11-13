"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateHelper = void 0;
class DateHelper {
    static parseDateStringToDate(dateStr) {
        return new Date(dateStr + 'T00:00:00Z');
    }
    static formatDateToDateString(date) {
        return date.toISOString().split('T')[0];
    }
    static formatDateToDDMMYYYY(date) {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    }
    static formatDateToDDMMYYYYHHmm(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
    static formatScheduledAt(dateInput) {
        const dateObj = new Date(dateInput);
        const date = dateObj.toLocaleDateString('vi-VN');
        const time = dateObj.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
        return `${date} lúc ${time}`;
    }
}
exports.DateHelper = DateHelper;
//# sourceMappingURL=date.helper.js.map