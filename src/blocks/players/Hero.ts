import { Polygon } from "../../geometries/Polygon";
import { Block } from "../Block";
import { BlockState } from "../BlockState";
import { BlockType } from "../BlockType";

export class Hero extends Block {
    name: string;

    constructor(name: string) {
        super(Polygon.square(32), BlockType.Player, BlockState.Idle);
        this.name = name;
    }
}