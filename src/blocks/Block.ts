import { IEntity } from "../shared/IEntity";
import { Guid } from "../shared/Guid";
import { BlockType } from "./BlockType";
import { BlockMoved } from "./events/BlockMoved";
import { BlockState} from "./BlockState";
import { Polygon } from "../geometries/Polygon";
import { Point } from "../geometries/Point";
import { AnimationRegistry } from "./AnimationRegistry";

export abstract class Block implements IEntity {
    private readonly _id: string;
    private readonly _type: BlockType;
    private _polygon: Polygon;
    private _state: BlockState;
    protected _image: HTMLImageElement;
    public static MaxWidth: number = 50;
    public static MaxHeight: number = 50;   
    public OnMoved: ((args: BlockMoved) => void) | undefined = undefined;
    
    constructor(polygon: Polygon, type: BlockType, state: BlockState) {
        // Path Width and Height must be lower than Max values
        this._id = Guid.new();
        this._type = type;
        this._polygon = polygon;
        this._state = state;
        this._image = new Image();
    }

    get id() {
        return this._id;
    }

    get type() {
        return this._type;
    }

    get polygon(): Polygon {
        return this._polygon;
    }

    get at(): Point {
        return this.polygon.origin; // Anchored at
    }

    get state(): BlockState {
        return this._state;
    }

    get image(): HTMLImageElement {
        return this._image;
    }

    set state(newState: BlockState) {
        if (!newState || !this.state || newState.equals(this.state))
            return;
        this._state = newState;  
        // this.OnStateChanged()
    }

    overlapsWith(block: Block): boolean {
        return this.polygon.overlapsWith(block.polygon);
    }

    move(to: Point) {
        let from = this._polygon;
        this._polygon = this._polygon.translateTo(to);
        if (this.OnMoved) {
            this.OnMoved(new BlockMoved(this, from, this._polygon));
        }   
    }

    renderOn(ctx: CanvasRenderingContext2D): void {
        this._image.src = AnimationRegistry.get(this.constructor.name, this.state)?.image ?? "404-image.png"; 
        ctx.drawImage(this.image, this.at.x, this.at.y, this.polygon.width, this.polygon.height);
    }    
}

