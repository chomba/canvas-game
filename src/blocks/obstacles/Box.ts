import { Block } from "../Block";
import { BlockType } from "../BlockType";
import { BlockAnimation } from "../BlockAnimation";
import { BlockState } from "../BlockState";
import { Polygon } from "../../geometries/Polygon";

export class Box extends Block {

    constructor() {
        super(Polygon.rectangle(20, 20), BlockType.Obstacle, BlockState.Idle, Box.Animations);
    }

    private static get Animations(): Map<string, BlockAnimation> {
        let animations = new Map<string, BlockAnimation>();
        animations.set(BlockState.Idle.name, new BlockAnimation(["img/box.png"]));
        return animations;
    }

    renderOn(ctx: CanvasRenderingContext2D): void {
        let image = new Image();
        image.src = this.animation?.image; 
        ctx.drawImage(image, this.at.x, this.at.y, this.polygon.width, this.polygon.height);
    }   
}
