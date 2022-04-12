import { Polygon } from "../../geometries/Polygon";
import { Block } from "../Block";
import { BlockAnimation } from "../BlockAnimation";
import { BlockState } from "../BlockState";
import { BlockType } from "../BlockType";

export class Ogre extends Block {

    constructor() {
        super(Polygon.square(30), BlockType.Player, BlockState.Idle, Ogre.Animations);
    }

    private static get Animations(): Map<string, BlockAnimation> {
        let animations = new Map<string, BlockAnimation>();
        animations.set(BlockState.Idle.name, new BlockAnimation(["img/ogre.png"]));
        animations.set(BlockState.FacingLeft.name, new BlockAnimation(["img/ogre.png"]));
        animations.set(BlockState.FacingUp.name, new BlockAnimation(["img/ogre.png"]));
        animations.set(BlockState.FacingRight.name, new BlockAnimation(["img/ogre.png"]));
        animations.set(BlockState.FacingDown.name, new BlockAnimation(["img/ogre.png"]));
        animations.set(BlockState.MovingLeft.name, new BlockAnimation(["img/ogre.png"]));
        animations.set(BlockState.MovingUp.name, new BlockAnimation(["img/ogre.png"]));
        animations.set(BlockState.MovingRight.name, new BlockAnimation(["img/ogre.png"]));
        animations.set(BlockState.MovingDown.name, new BlockAnimation(["img/ogre.png"]));
        return animations;
    }
}