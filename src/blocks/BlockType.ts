import { Block } from "./Block";

export class BlockType {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }
    public static Ground = new BlockType("ground");
    public static Player = new BlockType("player");
    public static Obstacle = new BlockType("obstacle");
}
