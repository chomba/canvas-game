import { Point } from "./Point";

// 2D Vector
export class Vector {
    private readonly _x: number;
    private readonly _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
    
    get x() { return this._x; }
    get y() { return this._y; }
    get magnitude() { return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); }
    get point() { return new Point(this.x, this.y); }

    static from(initialPoint: Point, terminalPoint: Point): Vector {
        return new Vector(terminalPoint.x - initialPoint.x, terminalPoint.y - initialPoint.y);
    }

    static dotProduct(v1: Vector, v2: Vector) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    multipliedBy(k: number): Vector {
        return new Vector(this.x * k, this.y * k);
    }

    perpendicular(clockwise: boolean = false): Vector {
        return new Vector(-1 * this.y, this.x); 
    }

    projectOnto(v: Vector): Vector {
        return v.multipliedBy(Vector.dotProduct(this, v) / Math.pow(v.magnitude, 2));
    }

    toString() {
        return `<${this.x},${this.y}>`;
    }
}