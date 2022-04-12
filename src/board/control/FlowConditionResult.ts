import { Block } from "../../blocks/Block";
import { Ogre } from "../../blocks/players/Ogre";
import { Point } from "../../geometries/Point";

export class FlowConditionResult {
    success: boolean;
    onSuccessArgs: FlowConditionSuccededArgs;
    onFailureArgs: FlowConditionFailedArgs;

    constructor(success: boolean, onSuccessArgs: FlowConditionSuccededArgs = null, onFailureArgs: FlowConditionFailedArgs = null) {
        this.success = success;
        this.onSuccessArgs = onSuccessArgs;
        this.onFailureArgs = onFailureArgs;
    }
}


export abstract class FlowConditionSuccededArgs { }

export abstract class FlowConditionFailedArgs { }

export class BlockMovedArgs extends FlowConditionSuccededArgs {
    target: Point;
    ogresToKill: Block[];

    constructor(target: Point, ogresKilled: Ogre[] = []) {
        super();
        this.target = target;
        this.ogresToKill = ogresKilled;
    }
}
