import { Loop } from "../shared/Loop";

export class BlockAnimation {
    // private timer: number;
    // private autoRepeat: boolean;
    // Each blockState has an animation associated with it
    // Such animation is automatically stopped and reset when switching to another state
    private imageLoop: Loop<string>;

    constructor(images: string[]) {
        this.imageLoop = new Loop(images);
    }
    
    cancel() {
        // Stop Animation
        // Reset Loop
    }

    // Should be idempotent
    play() {
        // if (this.timer != -1)
        //     return;
        // this.timer = window.setInterval(() => {
        //     if (this._status == AnimationStatus.Running)
        //         this.imageLoop.next();
        // }, 100);
        // this._status = AnimationStatus.Running;
    }

    stop() {
        // window.clearInterval(this.timer);
        // this.timer = -1;
        // this._status = AnimationStatus.Stopped;
    }

    restart() {
        this.imageLoop.reset();
        this.play();
    }

    reset() {
        this.imageLoop.reset();
    }

    public get image() {
        return this.imageLoop.current;
    }

}