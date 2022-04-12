import { Point } from "./Point";

export class Circle {
    private readonly _center: Point;
    private readonly _radius: number;

    constructor(center: Point, radius: number) {
        this._center = center;
        this._radius = radius;
    }

    get center() { return this._center; }
    get radius() { return this._radius; }
    get diameter() { return this.radius * 2; }
    
    static overlaps(c1: Circle, c2: Circle): boolean {
        let x = c1.center.distanceTo(c2._center) <= c1.radius + c2.radius + 0.0001;
        return x;
    }

    overlapsWith(other: Circle): boolean {
        return Circle.overlaps(this, other);
    }
}