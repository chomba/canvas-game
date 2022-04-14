import { Check } from "../shared/Check";
import { Board } from "../board/Board";
import { OneKeyBinding } from "./OneKeyBinding";
import { TwoKeyBinding } from "./TwoKeyBinding";
import { KeyBinding } from "./KeyBinding";

export abstract class InputController {
    private readonly oneKeyBindings: Map<string, OneKeyBinding>;
    private readonly twoKeyBindings: Map<string, TwoKeyBinding>;
    private readonly _pressedKeys: Map<string, KeyboardEvent>;   // Map<KeyId, Keydata>
    private readonly board: Board;
    protected timer: any;

    constructor(board: Board) {
        this.board = board;
        this.oneKeyBindings = new Map<string, OneKeyBinding>();
        this.twoKeyBindings = new Map<string, TwoKeyBinding>();
        this._pressedKeys = new Map<string, KeyboardEvent>();
    }

    get pressedKeys(): Map<string, KeyboardEvent> { return this._pressedKeys; }

    protected exists(binding: KeyBinding): boolean {
        switch (binding.keyCount) {
            case 1: return this.oneKeyBindings.has(binding.id);
            case 2: return this.twoKeyBindings.has(binding.id);
        }
    }

    protected track(pressedKeys: Map<string, KeyboardEvent>)  {
        for (let oneKeyBinding of this.oneKeyBindings.values()) {
            oneKeyBinding.active = oneKeyBinding.eval(pressedKeys); 
        }
        for (let twoKeyBinding of this.twoKeyBindings.values()) {
            let isActive = twoKeyBinding.eval(pressedKeys); 
            twoKeyBinding.active = isActive;
            if (isActive) {
                this.oneKeyBindings.get(twoKeyBinding.key1).active = this.oneKeyBindings.get(twoKeyBinding.key2).active = false;
            }
        }
    }

    protected runKey(binding: KeyBinding) {
        if (!binding.active)
            return;
        if (binding.action.runMany) {
            // pass stepSize (e.g 5 pixels per movement)
            this.board.doMany(binding.block, binding.action, 5);
        } else {
            this.board.do(binding.block, binding.action);
        }
    }

    protected runKeys() {
        this.track(this.pressedKeys);
        this.twoKeyBindings.forEach((binding, key) => this.runKey(binding));
        this.oneKeyBindings.forEach((binding, key) => this.runKey(binding));
    }

    add(binding: KeyBinding) {
        if (Check.isNull(binding) || this.exists(binding))
            return;
        switch (binding.keyCount) {
            case 1: 
                this.oneKeyBindings.set(binding.id, binding as OneKeyBinding);
                break;
            case 2: 
                this.twoKeyBindings.set(binding.id, binding as TwoKeyBinding);
                break;
        }
    }

    abstract attach(): void;
    abstract detach(): void;
}

