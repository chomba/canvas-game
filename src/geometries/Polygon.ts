import { Circle } from "./Circle";
import { Point } from "./Point";
import { Vector } from "./Vector";

// http://web.archive.org/web/20141127210836/http://content.gpwiki.org/index.php/Polygon_Collision

export class Polygon implements Iterable<Point> {
    private readonly _origin: Point;
    private readonly _points: Point[];
    private readonly _width: number;
    private readonly _height: number;
    private readonly _circle: Circle;

    constructor(points: Point[], width: number, height: number, origin: Point = new Point(0,0)) {
        this._points = points;
        this._origin = origin;
        this._width = width;
        this._height = height;
        let dx = this._width / 2;
        let dy = this._height / 2;
        let radius = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        // Outermost Circle containing the polygon
        this._circle = new Circle(origin.translate(dx, dy), radius);
    }

    get origin() { return this._origin; }
    get points(): Point[] { return this._points; }
    get width() { return this._width; }
    get height() { return this._height; }
    get circle() { return this._circle; }

    translateX(dx: number): Polygon {
        let points: Point[] = [];
        this.points.forEach(p => {
            points.push(p.translateX(dx));
        })
        return new Polygon(points, this.width, this.height, this.origin.translateX(dx));
    }

    translateY(dy: number): Polygon {
        let points: Point[] = [];
        this.points.forEach(p => {
            points.push(p.translateY(dy));
        })
        return new Polygon(points, this.width, this.height, this.origin.translateY(dy));
    }

    translate(dx: number, dy: number): Polygon {
        let points: Point[] = [];
        this.points.forEach(p => {
            points.push(p.translate(dx, dy));
        })
        return new Polygon(points, this.width, this.height, this.origin.translate(dx, dy));
    }

    translateTo(target: Point): Polygon {
        let dx = target.x - this.origin.x;
        let dy = target.y - this.origin.y;
        let points: Point[] = [];
        this.points.forEach(p => {
            points.push(p.translate(dx, dy));
        })
        return new Polygon(points, this.width, this.height, this.origin.translate(dx, dy));       
    }

    isValid(): boolean {
        return this.points.length >= 3;
    }

    static square(length: number, origin: Point = new Point(0,0)) {
        return Polygon.rectangle(length, length, origin);
    }

    static rectangle(width: number, height: number, origin: Point = new Point(0,0)) {
        let points: Point[] = [];
        points.push(origin);
        points.push(origin.translateX(width));
        points.push(origin.translate(width, height));
        points.push(origin.translateY(height));
        return new Polygon(points, width, height, origin);
    }

    /// Separating Axis Theorem (SAT): Two convex objects do not overlap if
    /// there exists a line (called axis) onto which the two objects' projections do not overlap.
    overlapsWith(other: Polygon): boolean {
        if (!this.isValid()) {
            return false;
        }

        /// Optimization #1: If their circles do not overlap then their polygons won't either
        if (!this.circle.overlapsWith(other.circle))
            return false;
        /// TODO: Only check on the sides affected by the movement
        for (let i = 0; i < this.points.length - 1; i++) {
            // Take each side of the polygon and project the other polygon onto its perperdicular vector
            let vector = Vector.from(this.points[i], this.points[i+1]).perpendicular();
            if (!this.overlapBetween(this.projectOnto(vector), other.projectOnto(vector)))
                return false;
        }
        return true;
    }

    // Checks if there are overlaps between projections
    private overlapBetween(set1: number[], set2: number[]): boolean {
        set1.sort((a, b) =>  a - b);
        set2.sort((a, b) =>  a - b);
        let s1Max = set1[set1.length-1];
        let s1Min = set1[0];
        let s2Max = set2[set2.length-1];
        let s2Min = set2[0];
        if (s1Min <= s2Min) // s2 ahead of s1
            return s1Max >= s2Min;
        else    // s1 ahead of s2
            return s2Max >= s1Min;
    }

    contains(point: Point): boolean {
        // only works for rectangles for now
        return point.x >= this.origin.x && point.x <= this.origin.x + this.width &&
            point.y >= this.origin.y && point.y <= this.origin.y + this.height;
    }

    projectOnto(v: Vector): number[] {
        let values: number[] = [];
        for (let point of this.points) {
            values.push(point.componentAlong(v));
        }
        return values;
    }

    public [Symbol.iterator]() {
        return {
            next: function() {
                return {
                    done: this.index == this.points.length - 1,
                    value: this.points[this.index]
                }
            }.bind(this)
        };
    }

}