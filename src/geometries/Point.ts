import { IEntity } from "../shared/IEntity";
import { Random } from "../shared/Random";
import { Vector } from "./Vector";

export class Point implements IEntity {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static distance(p1: Point, p2: Point) {
        return Math.sqrt(Math.pow(p1.y - p2.y, 2) + Math.pow(p1.x - p2.x, 2));
    }

    get id(): string {
        return this.toString();
    }

    distanceTo(other: Point) {
        return Point.distance(this, other);
    }

    equals(other: Point): boolean {
        if (other == null)
            return false;
        return this.x == other.x && this.y == other.y;
    }

    translate(dx: number, dy: number): Point {
        return new Point(this.x + dx, this.y + dy);
    }

    translateX(dx: number): Point {
        return new Point(this.x + dx, this.y);
    }

    translateY(dy: number): Point {
        return new Point(this.x, this.y + dy);
    }

    get vector() {
        return new Vector(this.x, this.y);
    }

    componentAlong(v: Vector): number {
        return Vector.dotProduct(this.vector, v) / v.magnitude;
    }

    toString(): string {
        return `(${this.x},${this.y})`;
    }

    static random(dx: number, dy: number) {
        return new Point(Random.new(0, dx), Random.new(0, dy));
    }
}
