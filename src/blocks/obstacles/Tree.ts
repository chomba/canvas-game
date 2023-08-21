import { Block } from "../Block";
import { BlockType } from "../BlockType";
import { BlockState } from "../BlockState";
import { Polygon } from "../../geometries/Polygon";

export class Tree extends Block {
    constructor() {
        super(Polygon.square(25), BlockType.Obstacle, BlockState.Idle);
    }
}
