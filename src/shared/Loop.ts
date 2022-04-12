export class Loop<T> {
    private items: T[];
    private index: number;
    private loopCount: number;
    public OnLoopCompleted: (loopCount: number) => void;

    constructor(items: T[]) {
        this.loopCount = 0;
        this.index = 0;
        this.items = items;
    }

    add(value: T) {
        this.items.push(value);
    }

    get current(): T {
        return this.items[this.index];
    }

    get length(): number {
        return this.items.length;
    }

    next() {
        if (this.items.length == 0)
            return;
        if (this.index == this.items.length - 1) {
            this.index = 0;
            this.loopCount +=1;
            this.OnLoopCompleted(this.loopCount);
        } else {    
            this.index++;
        }
    }

    reset() {
        this.index = 0;
    }
}