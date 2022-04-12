import { Block } from "../blocks/Block";
import { BlockAction } from "../blocks/BlockAction";
import { Board } from "../board/Board";
import { Check } from "../shared/Check";
import { Random } from "../shared/Random";
import { InputController } from "./InputController";
import { OneKeyBinding } from "./OneKeyBinding";

export class AutoController extends InputController {
    private changeActionTimer: any;
    private currentAction: BlockAction;

    constructor(board: Board, block: Block) {
        super(board);
        this.add(new OneKeyBinding(BlockAction.MoveRight.id, block, BlockAction.MoveRight));
        this.add(new OneKeyBinding(BlockAction.MoveLeft.id, block, BlockAction.MoveLeft));
        this.add(new OneKeyBinding(BlockAction.MoveUp.id, block, BlockAction.MoveUp));
        this.add(new OneKeyBinding(BlockAction.MoveDown.id, block, BlockAction.MoveDown));
        this.changeAction();
    }

    changeAction() {
        let action = this.randomAction();
        while (action == this.currentAction) { 
            action = this.randomAction();
        }
        this.pressedKeys.delete(BlockAction.MoveRight.id);
        this.pressedKeys.delete(BlockAction.MoveLeft.id);
        this.pressedKeys.delete(BlockAction.MoveDown.id);
        this.pressedKeys.delete(BlockAction.MoveUp.id);
        this.pressedKeys.set(action.id, null);
        this.currentAction = action;
    }

    randomAction(): BlockAction {
        let selector = Random.new(1, 4);
        switch (selector) {
            case 1: return BlockAction.MoveRight;
            case 2: return BlockAction.MoveUp;
            case 3: return BlockAction.MoveLeft
            case 4: return BlockAction.MoveDown;
        }
    }

    attach() {
        this.detach();
        this.changeActionTimer = window.setInterval(() =>  this.changeAction(), Random.new(500, 1000));
        this.timer = window.setInterval(() => this.runKeys(), Random.new(15, 20));
    }

    detach() {
        window.clearInterval(this.timer);
        window.clearInterval(this.changeActionTimer);
    }
}