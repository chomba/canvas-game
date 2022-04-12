import { Polygon } from "../../geometries/Polygon";
import { Block } from "../Block";
import { BlockAnimation } from "../BlockAnimation";
import { BlockState } from "../BlockState";
import { BlockType } from "../BlockType";

export class Hero extends Block {
    name: string;

    constructor(name: string) {
        super(Polygon.square(32), BlockType.Player, BlockState.Idle, Hero.Animations);
        this.name = name;
    }

    private static get Animations(): Map<string, BlockAnimation> {
        let animations = new Map<string, BlockAnimation>();
        animations.set(BlockState.Idle.name, new BlockAnimation(["img/hero.png"]));
        animations.set(BlockState.FacingLeft.name, new BlockAnimation(["img/hero.png"]));
        animations.set(BlockState.FacingUp.name, new BlockAnimation(["img/hero.png"]));
        animations.set(BlockState.FacingRight.name, new BlockAnimation(["img/hero.png"]));
        animations.set(BlockState.FacingDown.name, new BlockAnimation(["img/hero.png"]));
        animations.set(BlockState.MovingLeft.name, new BlockAnimation(["img/hero.png"]));
        animations.set(BlockState.MovingUp.name, new BlockAnimation(["img/hero.png"]));
        animations.set(BlockState.MovingRight.name, new BlockAnimation(["img/hero.png"]));
        animations.set(BlockState.MovingDown.name, new BlockAnimation(["img/hero.png"]));
        return animations;
    }
}