import { IEntity } from "../shared/IEntity";
import { Guid } from "../shared/Guid";
import { Block } from "../blocks/Block";
import { BlockType } from "../blocks/BlockType";
import { BlockMoved } from "../blocks/events/BlockMoved";
import { BlockAction } from "../blocks/BlockAction";
import { BlockTracker } from "./BlockTracker";
import { FlowControl } from "./control/FlowControl";
import { Point } from "../geometries/Point";
import { Ground } from "../blocks/grounds/Ground";
import { BoardRules } from "./BoardRules";
import { FlowConditionResult } from "./control/FlowConditionResult";

export class Board implements IEntity {
    private readonly _id;
    private readonly ground: Ground;
    private readonly players: Map<string, Block> // Map<playerId, Player>
    private readonly obstacles: Map<string, Block> // Map<obstacleId, Obstacle>
    public readonly tracker: BlockTracker;   // Lookup Table for Blocks
    public control: FlowControl;  // State Machine
    onPlayerAdded: ((block: Block) => void);
    onPlayerRemoved: ((block: Block) => void);

    constructor(ground: Ground) {
        this._id = Guid.new();
        this.ground = ground;
        this.players = new Map<string, Block>();
        this.obstacles = new Map<string, Block>();
        this.tracker = new BlockTracker();
        this.control = BoardRules.get();
    }

    get id() { return this._id; }
    get width() { return this.ground.polygon.width; }
    get height() { return this.ground.polygon.height; }

    do(block: Block, action: BlockAction): boolean {
        let entry = this.control.get(block.state, action);
        // No entry in State Machine (Block)
        if (!entry)
            return false;
        // There's an entry but no condition (Allow)
        if (!entry.When) {
            block.state = entry.finalState;
            if (entry.OnSuccess)
                entry.OnSuccess(this, block, action, null);
            return true;
        }
        // There's an entry and there's a condition (Allow if condition is met)
        let result: FlowConditionResult = entry.When(this, block, action);
        if (!result.success) {
            if (entry.OnFailure)
                entry.OnFailure(this, block, action, result.onFailureArgs);
            return false;
        }
        block.state = entry.finalState;
        if (entry.OnSuccess)
            entry.OnSuccess(this, block, action, result.onSuccessArgs);
        return true;
    }

    doMany(block: Block, action: BlockAction, ntimes: number = 1) {
        while(this.do(block, action) && --ntimes > 0);
    }

    add(block: Block, at: Point = null) {
        if (!at) {
            let point = Point.random(this.width, this.height);
            while (!this.isObstacleFree(block, point))
                point = Point.random(this.width, this.height);
            at = point;
        }

        if (!this.contains(block, at))
            return;
        block.OnMoved = (e: BlockMoved) => this.tracker.add(e);
        block.move(at);
        switch (block.type) {
            case BlockType.Player:
                this.players.set(block.id, block);
                if (this.onPlayerAdded)
                    this.onPlayerAdded(block);
                break;   
            case BlockType.Obstacle:
                this.obstacles.set(block.id, block);
                break;
        }
    }

    remove(block: Block) {
        if (block.type == BlockType.Player) {
            this.players.delete(block.id);
            if (this.onPlayerRemoved)
                this.onPlayerRemoved(block);
        }
        if (block.type == BlockType.Obstacle)
            this.obstacles.delete(block.id);
        this.tracker.remove(block);
    }

    getPlayer(playerId: string): Block {
        if (!this.players.has(playerId))
            return null;
        return this.players.get(playerId);
    }

    isObstacleFree(block: Block, to: Point): boolean {
        let result = true;
        for (let obstacle of this.tracker.obstacles(block, to)) {
            result = false;
            break;
        }
        return result;
    }

    contains(block: Block, at: Point = null) {
        let point = at ?? block.at;
        let polygon = block.polygon.translateTo(point);
        return !polygon.points.some(p => p.x < 0 || p.x > this.width || p.y < 0 || p.y > this.height);
    }

    renderOn(ctx: CanvasRenderingContext2D): number {
        if (!ctx)
            return;
         
        this.ground.renderOn(ctx);
        this.obstacles.forEach(obstacle => {
            obstacle.renderOn(ctx);
        });
        this.players.forEach(player => {
            player.renderOn(ctx);
        });
        return requestAnimationFrame(() => this.renderOn(ctx));
    }
}

