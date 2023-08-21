import { Guid } from "../shared/Guid";
import { IEntity } from "../shared/IEntity";

export class BlockState implements IEntity {
    private readonly _id: string;
    private readonly _name: string;

    public static Idle = new BlockState("Idle");
    public static FacingRight = new BlockState("FacingRight");
    public static FacingLeft = new BlockState("FacingLeft");
    public static FacingUp = new BlockState("FacingUp");
    public static FacingDown = new BlockState("FacingDown");
    public static MovingRight = new BlockState("MovingRight");
    public static MovingLeft = new BlockState("MovingLeft");
    public static MovingUp = new BlockState("MovingUp");
    public static MovingDown = new BlockState("MovingDown");
    public static Dead = new BlockState("Dead");

    constructor(name: string) {
        this._id = Guid.new();
        this._name = name;
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public equals(action: BlockState) {
        return action.name == this.name;
    }

    public new(): BlockState {
        return new BlockState(this._name);
    }
}
