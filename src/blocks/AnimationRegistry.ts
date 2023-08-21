import { BlockAnimation } from "./BlockAnimation";
import { BlockState } from "./BlockState";


// TBD: Refactor
// We''ll only have 2 classes: Player and Obstacle in the end
// Each Player subtype will be represented as a string and retrieved from the server


export class AnimationRegistry {
    static readonly #animations = new Map<string, Map<BlockState, BlockAnimation>>();

    static {
        let animations = new Map<string, BlockAnimation>();
        this.registerHeroAnimations();
        this.registerOgreAnimations();
        this.registerBoxAnimations();
        this.registerLogAnimations();
        this.registerTreeAnimations();
        this.registerGroundAnimations();
    }

    static registerHeroAnimations() {
        const animations = new Map<BlockState, BlockAnimation>();
        animations.set(BlockState.Idle, new BlockAnimation(["img/hero.png"]));
        animations.set(BlockState.FacingLeft, new BlockAnimation(["img/hero.png"]));
        animations.set(BlockState.FacingUp, new BlockAnimation(["img/hero.png"]));
        animations.set(BlockState.FacingRight, new BlockAnimation(["img/hero.png"]));
        animations.set(BlockState.FacingDown, new BlockAnimation(["img/hero.png"]));
        animations.set(BlockState.MovingLeft, new BlockAnimation(["img/hero.png"]));
        animations.set(BlockState.MovingUp, new BlockAnimation(["img/hero.png"]));
        animations.set(BlockState.MovingRight, new BlockAnimation(["img/hero.png"]));
        animations.set(BlockState.MovingDown, new BlockAnimation(["img/hero.png"]));
        this.#animations.set("Hero", animations);
    }

    static registerOgreAnimations() {
        const animations = new Map<BlockState, BlockAnimation>();
        animations.set(BlockState.Idle, new BlockAnimation(["img/ogre.png"]));
        animations.set(BlockState.FacingLeft, new BlockAnimation(["img/ogre.png"]));
        animations.set(BlockState.FacingUp, new BlockAnimation(["img/ogre.png"]));
        animations.set(BlockState.FacingRight, new BlockAnimation(["img/ogre.png"]));
        animations.set(BlockState.FacingDown, new BlockAnimation(["img/ogre.png"]));
        animations.set(BlockState.MovingLeft, new BlockAnimation(["img/ogre.png"]));
        animations.set(BlockState.MovingUp, new BlockAnimation(["img/ogre.png"]));
        animations.set(BlockState.MovingRight, new BlockAnimation(["img/ogre.png"]));
        animations.set(BlockState.MovingDown, new BlockAnimation(["img/ogre.png"]));
        this.#animations.set("Ogre", animations);
    }

    static registerBoxAnimations() {
        const animations = new Map<BlockState, BlockAnimation>();
        animations.set(BlockState.Idle, new BlockAnimation(["img/box.png"]));
        this.#animations.set("Box", animations);
    }

    static registerLogAnimations() {
        const animations = new Map<BlockState, BlockAnimation>();
        animations.set(BlockState.Idle, new BlockAnimation(["img/log.png"]));
        this.#animations.set("Log", animations);
    }

    static registerTreeAnimations() {
        const animations = new Map<BlockState, BlockAnimation>();
        animations.set(BlockState.Idle, new BlockAnimation(["img/tree.png"]));
        this.#animations.set("Tree", animations);
    }

    static registerGroundAnimations() {
        let animations = new Map<BlockState, BlockAnimation>();
        animations.set(BlockState.Idle, new BlockAnimation(["img/ground-grass.png"]));
        this.#animations.set("GrassGround", animations);
    }

    static get(block: string, state: BlockState) {
        return this.#animations.get(block)?.get(state);
    }
}