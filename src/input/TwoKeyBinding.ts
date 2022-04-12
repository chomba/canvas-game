import { Block } from "../blocks/Block";
import { BlockAction } from "../blocks/BlockAction";
import { KeyBinding } from "./KeyBinding";

export class TwoKeyBinding extends KeyBinding {
    private readonly _key1: string;
    private readonly _key2: string;

    constructor(key1: string, key2: string, block: Block, action: BlockAction) {
        super(block, action, 2);
        if (key1 < key2) {
            this._key1 = key1;
            this._key2 = key2;
        } else {
            this._key1 = key2;
            this._key2 = key1;
        }
    }

    get key1() {
        return this._key1;
    }

    get key2() {
        return this._key2;
    }

    get id() {
        return `${this.key1}+${this.key2}`;
    }

    eval(pressedKeys: Map<string, KeyboardEvent>): boolean {
        return pressedKeys.has(this.key1) && pressedKeys.has(this.key2);
    }
}