import { Block } from "../Block";
import { BlockType } from "../BlockType";
import { BlockState } from "../BlockState";
import { Polygon } from "../../geometries/Polygon";

export class Log extends Block {
    constructor() {
        super(Polygon.square(15), BlockType.Obstacle, BlockState.Idle);
    }
}
