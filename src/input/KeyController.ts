import { Board } from "../board/Board";
import { InputController } from "./InputController";

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
        window.clearInterval(this.timer);
        this.timer = window.setInterval(() => this.runKeys(), 20);
    }

    detach() {
        window.clearInterval(this.timer);
    }
}





