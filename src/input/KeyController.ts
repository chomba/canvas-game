import { Check } from "../shared/Check";
import { Board } from "../board/Board";
import { OneKeyBinding } from "./OneKeyBinding";
import { TwoKeyBinding } from "./TwoKeyBinding";
import { KeyBinding } from "./KeyBinding";
import { InputController } from "./InputController";

//KeyTracker
export class KeyController extends InputController {
    constructor(board: Board) {
        super(board);
        onkeydown = onkeyup = (e: KeyboardEvent) => {
            if (e.type == "keydown")
                this.pressedKeys.set(e.code, e);
            else
                this.pressedKeys.delete(e.code);
        };
    }

    attach() {
        this.detach();
        this.timer = window.setInterval(() => this.runKeys(), 20);
    }

    detach() {
        window.clearInterval(this.timer);
    }
}





