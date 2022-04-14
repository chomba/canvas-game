export abstract class Check {
    static isNull(obj: any): boolean {
        return typeof obj == 'undefined' || obj == null;
    }

    static notNull(obj: any): boolean {
        return typeof obj != 'undefined' && obj != null; 
    }
}