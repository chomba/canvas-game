import { Polygon } from "../../geometries/Polygon";
import { AnimationRegistry } from "../AnimationRegistry";
import { Block } from "../Block";
import { BlockState } from "../BlockState";
import { BlockType } from "../BlockType";

export abstract class Ground extends Block {
    constructor(width: number, height: number) {
        super(Polygon.rectangle(width, height), BlockType.Ground, BlockState.Idle);
    }

    renderOn(ctx: CanvasRenderingContext2D): void {
        this._image.src = AnimationRegistry.get(this.constructor.name, BlockState.Idle)?.image ?? "404-image"; 
        let dx = this.polygon.width / this._image.width;
        let dy = this.polygon.height / this._image.height;
        if (!isFinite(dx) || !isFinite(dy))
            return;
        let nx = Math.ceil(dx);
        let ny = Math.ceil(dy);

        for (let i = 0; i < nx; i++)
            for (let j = 0; j < ny; j++)
                ctx.drawImage(this.image, this.at.x + i * this.image.width, this.at.y + j * this.image.height);
    }  
}