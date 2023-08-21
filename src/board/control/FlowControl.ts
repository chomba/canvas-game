import { BlockAction } from "../../blocks/BlockAction";
import { BlockState } from "../../blocks/BlockState";
import { FlowControlEntry } from "./FlowControlEntry";

export class FlowControl {
    entries: Map<string, FlowControlEntry>;

    constructor() {
        this.entries = new Map<string, FlowControlEntry>();
    }

    add(entry: FlowControlEntry) {
        if (!entry)
            return;
        this.entries.set(entry.id, entry);
    }

    addMany(entries: FlowControlEntry[]) {
        for (let entry of entries)
            this.add(entry);
    }

    get(state: BlockState, action: BlockAction): FlowControlEntry {
        return this.entries.get(FlowControlEntry.Id(state, action));
    }
}

