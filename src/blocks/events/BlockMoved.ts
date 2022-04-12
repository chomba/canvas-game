import { Polygon } from "../../geometries/Polygon";
import { Block } from "../Block";

export class BlockMoved {
    private readonly _from: Polygon;
    private readonly _to: Polygon;
    private readonly _block: Block;

    constructor(block: Block, from: Polygon, to: Polygon) {
        this._block = block;
        this._from = from;
        this._to = to;
    }

    get from(): Polygon {
        return this._from;
    }

    get to(): Polygon {
        return this._to;
    }

    get block(): Block {
        return this._block;
    }
}