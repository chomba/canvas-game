export abstract class Check {
    static IsNull(obj: any): boolean {
        return typeof obj == 'undefined' || obj == null;
    }

    static NotNull(obj: any): boolean {
        return typeof obj != 'undefined' && obj != null; 
    }

    static isOf<T>(obj: any): Boolean {
        let x:T = null;
        return obj.constructor == x;
    } 
}