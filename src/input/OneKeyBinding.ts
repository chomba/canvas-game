import { Block } from "../blocks/Block";
import { BlockAction } from "../blocks/BlockAction";
import { KeyBinding } from "./KeyBinding";

export class OneKeyBinding extends KeyBinding {
    private _key: string;

    constructor(key: string, block: Block, action: BlockAction) {
        super(block, action, 1);
        this._key = key;
    }

    get key() {
        return this._key;
    }

    get id() {
        return this.key;
    }

    eval(pressedKeys: Map<string, KeyboardEvent>): boolean {
        return pressedKeys.has(this.key);
    }
}