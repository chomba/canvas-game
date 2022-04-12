import { Guid } from "../shared/Guid";
import { IEntity } from "../shared/IEntity";

export class BlockAction implements IEntity {
    private readonly _id: string;
    private readonly _runMany: boolean;
    private readonly _name: string;
    // private readonly repeat: boolean; 
    // private readonly retrigger: boolean;
    // private readonly _stopOnRelease: boolean;

    constructor(runMany: boolean = false) {
        this._id = Guid.new();
        this._runMany = runMany;
    }

    get id() {
        return this._id;
    }

    get runMany(): boolean {
        return this._runMany;
    }

    public static MoveRight = new BlockAction(true);
    public static MoveLeft = new BlockAction(true);
    public static MoveUp = new BlockAction(true);
    public static MoveDown = new BlockAction(true);
    public static Stop = new BlockAction();
    public static MoveUpLeft = new BlockAction(true);
    public static Die = new BlockAction(false);
}