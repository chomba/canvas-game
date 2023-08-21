import { Block } from "../Block";
import { BlockType } from "../BlockType";
import { BlockState } from "../BlockState";
import { Polygon } from "../../geometries/Polygon";

export class Box extends Block {
    constructor() {
        super(Polygon.rectangle(20, 20), BlockType.Obstacle, BlockState.Idle);
    }
}
