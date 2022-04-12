import { Block } from "../Block";
import { BlockType } from "../BlockType";
import { BlockAnimation } from "../BlockAnimation";
import { BlockState } from "../BlockState";
import { Polygon } from "../../geometries/Polygon";

export class Tree extends Block {
    constructor() {
        super(Polygon.square(25), BlockType.Obstacle, BlockState.Idle, Tree.Animations);
    }

    private static get Animations(): Map<string, BlockAnimation> {
        let animations = new Map<string, BlockAnimation>();
        animations.set(BlockState.Idle.name, new BlockAnimation(["img/tree.png"]));
        return animations;
    }
}
