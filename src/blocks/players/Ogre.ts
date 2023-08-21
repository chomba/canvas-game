import { Polygon } from "../../geometries/Polygon";
import { Block } from "../Block";
import { BlockState } from "../BlockState";
import { BlockType } from "../BlockType";

export class Ogre extends Block {
    constructor() {
        super(Polygon.square(30), BlockType.Player, BlockState.Idle);
    }
}