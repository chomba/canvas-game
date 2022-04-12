import { Block } from "../../blocks/Block";
import { BlockAction } from "../../blocks/BlockAction";
import { BlockState } from "../../blocks/BlockState";
import { IEntity } from "../../shared/IEntity";
import { Board } from "../Board";
import { FlowConditionFailedArgs, FlowConditionResult, FlowConditionSuccededArgs } from "./FlowConditionResult";

export class FlowControlEntry implements IEntity {
    private readonly _id;
    private readonly _initialState: BlockState;
    private readonly _action: BlockAction;
    private readonly _finalState: BlockState;
    public When: ((board: Board, block: Block, action: BlockAction) => FlowConditionResult);
    public OnSuccess: ((board: Board, block: Block, action: BlockAction, args: FlowConditionSuccededArgs) => void);
    public OnFailure: ((board: Board, block: Block, action: BlockAction, args: FlowConditionFailedArgs) => void);

    constructor(initialState: BlockState, action: BlockAction, finalState: BlockState,
        when: ((board: Board, block: Block, action: BlockAction) => FlowConditionResult) = null,
        onSuccess: ((board: Board, block: Block, action: BlockAction, args: FlowConditionSuccededArgs) => void) = null, 
        onFailure: ((board: Board, block: Block, action: BlockAction, args: FlowConditionFailedArgs) => void) = null) {
        this._id = FlowControlEntry.Id(initialState, action);
        this._initialState = initialState;
        this._action = action;
        this._finalState = finalState;
        this.When = when;
        this.OnFailure = onFailure;
        this.OnSuccess = onSuccess;
    }

    static newMany(initialState: BlockState, actions: BlockAction[], finalStates: BlockState[]): FlowControlEntry[] {
        let length = Math.max(actions.length, finalStates.length);
        let entries: FlowControlEntry[] = [];
        while (--length >= 0) {
            entries.push(new FlowControlEntry(initialState, actions[length], finalStates[length]));
        }
        return entries;
    }

    get id() {
        return this._id;
    }

    get initialState() {
        return this._initialState;
    }

    get finalState() {
        return this._finalState;
    }

    static Id(state: BlockState, action: BlockAction): string {
        return `<${state.name},${action.id}>`;
    }
}