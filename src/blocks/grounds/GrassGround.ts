import { Polygon } from "../../geometries/Polygon";
import { BlockAnimation } from "../BlockAnimation";
import { BlockState } from "../BlockState";
import { BlockType } from "../BlockType";
import { Ground } from "./Ground";

export class GrassGround extends Ground {
    constructor(width: number, height: number) {
        super(width, height, GrassGround.Animations);
    }

    private static get Animations(): Map<string, BlockAnimation> {
        let animations = new Map<string, BlockAnimation>();
        animations.set(BlockState.Idle.name, new BlockAnimation(["img/ground-grass.png"]));
        return animations;
    }
}