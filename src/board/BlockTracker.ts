import { Block } from "../blocks/Block";
import { BlockType } from "../blocks/BlockType";
import { BlockMoved } from "../blocks/events/BlockMoved";
import { Point } from "../geometries/Point";
import { Polygon } from "../geometries/Polygon";
import { Ogre } from "../blocks/players/Ogre";
import { Hero } from "../blocks/players/Hero";

export class BlockTracker {
    public entries: Map<string, Map<string, Block>>; // Map<entryId, Map<blockId, Block>>

    constructor() {
        this.entries = new Map<string, Map<string, Block>>(); 
    }

    // TODO: Further Optimize it
    add(event: BlockMoved) {
        if (!event)
            return;
        // if (event.block.state == BlockState.Dead)
        //     return;
        if (event.from)
            this.deleteEntries(event.block, event.from.points);
        if (event.to)
            this.addEntries(event.block, event.to.points);
    }

    remove(block: Block) {
        for (let entry of this.entries.values()) {
            entry.delete(block.id);
        }
    }
    
    public *neighbors(block: Block, at: Point = null) {
        // If no anchor point is passed then the block's anchor point is used
        let point: Point = at ?? block.at; 
        let polygon: Polygon = block.polygon.translateTo(point);
        let emitted = new Map<string, boolean>();

        for (let point of polygon.points) {
            let entryId = this.id(point);
            let entry = this.entries.get(entryId);
            if (!entry)
                continue;
            for (let neighbor of entry.values()) {
                if (block == neighbor)
                    continue;
                // Do not yield the same block more than once
                if (emitted.has(neighbor.id))
                    continue;
                emitted.set(neighbor.id, true);
                yield neighbor;
            }
        }
    }
    
    public *overlappers(block: Block, at: Point = null) {
        // If no anchor point is passed then the block's anchor point is used
        let point: Point = at ?? block.at; 
        let polygon: Polygon = block.polygon.translateTo(point);

        for (let neighbor of this.neighbors(block, at))
            if (polygon.overlapsWith(neighbor.polygon))
                yield neighbor;
    }

    public *ogres(block: Block, at: Point = null) {
        for (let overlapper of this.overlappers(block, at))
            if (overlapper instanceof Ogre)
                yield overlapper as Ogre;
    }

    public *heros(block: Block, at: Point = null) {
        for (let overlapper of this.overlappers(block, at))
            if (overlapper instanceof Hero)
                yield overlapper as Hero;
    }

    public *obstacles(block: Block, at: Point = null) {
        for (let overlapper of this.overlappers(block, at))
            if (overlapper.type == BlockType.Obstacle)
                yield overlapper;
    }

    private addEntries(block: Block, points: Point[]): void {
        for (let point of points) {
            let entryId = this.id(point);
            let entry = this.entries.get(entryId);
            if (!entry)
                this.entries.set(entryId, new Map<string, Block>());
            this.entries.get(entryId).set(block.id, block);
        }
    }

    private deleteEntries(block: Block, points: Point[]): void {
        for (let point of points) {
            let entryId = this.id(point);
            let entry = this.entries.get(entryId);
            if (entry)
                this.entries.get(entryId).delete(block.id);
        }
    }

    // TODO: Extrapolate point to grid item
    private id(point: Point): string {
        return `<${Math.floor(point.x / Block.MaxWidth)},${Math.floor(point.y / Block.MaxHeight)}>`
    }
}