import { Block } from "../blocks/Block";
import { BlockAction } from "../blocks/BlockAction";
import { IEntity } from "../shared/IEntity";

export abstract class KeyBinding implements IEntity {
    private readonly _block: Block;
    private readonly _action: BlockAction;
    private readonly _keyCount: number;
    public active: boolean = false;

    constructor(block: Block, action: BlockAction, keyCount: number) {
        this._block = block;
        this._action = action;
        this._keyCount = keyCount;
    }

    get block(): Block { return this._block; }
    get action(): BlockAction { return this._action; }
    get keyCount(): number { return this._keyCount; }

    public abstract eval(pressedKeys: Map<string, KeyboardEvent>): boolean;
    public abstract get id(): string;
}
