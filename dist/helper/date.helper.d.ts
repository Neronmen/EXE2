export declare class DateHelper {
    static parseDateStringToDate(dateStr: string): Date;
    static formatDateToDateString(date: Date): string;
    static formatDateToDDMMYYYY(date: string): string;
    static formatDateToDDMMYYYYHHmm(date: Date): string;
    static formatScheduledAt(dateInput: string | Date): string;
}
