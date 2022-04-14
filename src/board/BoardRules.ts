import { Block } from "../blocks/Block";
import { BlockAction } from "../blocks/BlockAction";
import { BlockState } from "../blocks/BlockState";
import { BlockType } from "../blocks/BlockType";
import { Hero } from "../blocks/players/Hero";
import { Ogre } from "../blocks/players/Ogre";
import { Point } from "../geometries/Point";
import { Polygon } from "../geometries/Polygon";
import { Check } from "../shared/Check";
import { Board } from "./Board";
import { BlockMovedArgs, FlowConditionResult } from "./control/FlowConditionResult";
import { FlowControl } from "./control/FlowControl";
import { FlowControlEntry } from "./control/FlowControlEntry";

export class BoardRules {
    static get() {
        let control = new FlowControl();
        // Idle
        control.addMany(FlowControlEntry.newMany(BlockState.Idle, 
            [BlockAction.MoveRight, BlockAction.MoveLeft, BlockAction.MoveUp, BlockAction.MoveDown], 
            [BlockState.FacingRight, BlockState.FacingLeft, BlockState.FacingUp, BlockState.FacingDown]));
        
        // FacingLeft
        control.add(new FlowControlEntry(BlockState.FacingLeft, BlockAction.MoveLeft, BlockState.MovingLeft,
            (board, block, action) => BoardRules.MoveBlockConditions(board, block, action),  
            (board, block, action, args) => BoardRules.BlockMovedSuccess(board, block, action, args as BlockMovedArgs)));
        control.addMany(FlowControlEntry.newMany(BlockState.FacingLeft, 
            [BlockAction.MoveUp, BlockAction.MoveRight, BlockAction.MoveDown, BlockAction.Die], 
            [BlockState.FacingUp, BlockState.FacingRight, BlockState.FacingDown, BlockState.Dead]));
        
        // FacingUp
        control.add(new FlowControlEntry(BlockState.FacingUp, BlockAction.MoveUp, BlockState.MovingUp,
            (board, block, action) => BoardRules.MoveBlockConditions(board, block, action),  
            (board, block, action, args) => BoardRules.BlockMovedSuccess(board, block, action, args as BlockMovedArgs)));
        control.addMany(FlowControlEntry.newMany(BlockState.FacingUp, 
            [BlockAction.MoveLeft, BlockAction.MoveRight, BlockAction.MoveDown, BlockAction.Die], 
            [BlockState.FacingLeft, BlockState.FacingRight, BlockState.FacingDown, BlockState.Dead]));
      
        // FacingRight
        control.add(new FlowControlEntry(BlockState.FacingRight, BlockAction.MoveRight, BlockState.MovingRight,
            (board, block, action) => BoardRules.MoveBlockConditions(board, block, action),  
            (board, block, action, args) => BoardRules.BlockMovedSuccess(board, block, action, args as BlockMovedArgs)));
        control.addMany(FlowControlEntry.newMany(BlockState.FacingRight,
            [BlockAction.MoveLeft, BlockAction.MoveUp, BlockAction.MoveDown, BlockAction.Die],
            [BlockState.FacingLeft, BlockState.FacingUp, BlockState.FacingDown, BlockState.Dead]));

        // FacingDown
        control.add(new FlowControlEntry(BlockState.FacingDown, BlockAction.MoveDown, BlockState.MovingDown,
            (board, block, action) => BoardRules.MoveBlockConditions(board, block, action),  
            (board, block, action, args) => BoardRules.BlockMovedSuccess(board, block, action, args as BlockMovedArgs)));
        control.addMany(FlowControlEntry.newMany(BlockState.FacingDown,
            [BlockAction.MoveLeft, BlockAction.MoveUp, BlockAction.MoveRight, BlockAction.Die],
            [BlockState.FacingLeft, BlockState.FacingUp, BlockState.FacingRight, BlockState.Dead]));

        // MovingLeft
        control.add(new FlowControlEntry(BlockState.MovingLeft, BlockAction.MoveLeft, BlockState.MovingLeft,
            (board, block, action) => BoardRules.MoveBlockConditions(board, block, action),  
            (board, block, action, args) => BoardRules.BlockMovedSuccess(board, block, action, args as BlockMovedArgs)));
        control.addMany(FlowControlEntry.newMany(BlockState.MovingLeft,
            [BlockAction.MoveUp, BlockAction.MoveRight, BlockAction.MoveDown, BlockAction.Die],
            [BlockState.FacingUp, BlockState.FacingRight, BlockState.FacingDown, BlockState.Dead]));
        control.add(new FlowControlEntry(BlockState.MovingLeft, BlockAction.Stop, BlockState.FacingLeft));

        // MovingUp
        control.add(new FlowControlEntry(BlockState.MovingUp, BlockAction.MoveUp, BlockState.MovingUp,
            (board, block, action) => BoardRules.MoveBlockConditions(board, block, action),  
            (board, block, action, args) => BoardRules.BlockMovedSuccess(board, block, action, args as BlockMovedArgs)));
        control.addMany(FlowControlEntry.newMany(BlockState.MovingUp,
            [BlockAction.MoveLeft, BlockAction.MoveRight, BlockAction.MoveDown, BlockAction.Die],
            [BlockState.FacingLeft, BlockState.FacingRight, BlockState.FacingDown, BlockState.Dead]));
        control.add(new FlowControlEntry(BlockState.MovingUp, BlockAction.Stop, BlockState.FacingUp));

        // MovingRight
        control.add(new FlowControlEntry(BlockState.MovingRight, BlockAction.MoveRight, BlockState.MovingRight,
            (board, block, action) => BoardRules.MoveBlockConditions(board, block, action),  
            (board, block, action, args) => BoardRules.BlockMovedSuccess(board, block, action, args as BlockMovedArgs)));
        control.addMany(FlowControlEntry.newMany(BlockState.MovingRight,
            [BlockAction.MoveLeft, BlockAction.MoveUp, BlockAction.MoveDown, BlockAction.Die],
            [BlockState.FacingLeft, BlockState.FacingUp, BlockState.FacingDown, BlockState.Dead]));
        control.add(new FlowControlEntry(BlockState.MovingRight, BlockAction.Stop, BlockState.FacingRight));

        // MovingDown
        control.add(new FlowControlEntry(BlockState.MovingDown, BlockAction.MoveDown, BlockState.MovingDown,
            (board, block, action) => BoardRules.MoveBlockConditions(board, block, action),  
            (board, block, action, args) => BoardRules.BlockMovedSuccess(board, block, action, args as BlockMovedArgs)));
        control.addMany(FlowControlEntry.newMany(BlockState.MovingDown,
            [BlockAction.MoveLeft, BlockAction.MoveUp, BlockAction.MoveRight, BlockAction.Die],
            [BlockState.FacingLeft, BlockState.FacingUp, BlockState.FacingRight, BlockState.Dead]));

        // control.add(new FlowControlEntry(BlockState.MovingDown, BlockAction.Stop, BlockState.FacingDown));
        return control;
    }

    /// block to be moved
    static MoveBlockConditions(board: Board, block: Block, action: BlockAction): FlowConditionResult  {
        let to: Point = null;
        let futurePolygon: Polygon = null;
        switch (action) {
            case BlockAction.MoveDown: 
                to = block.at.translateY(1);
                break;
            case BlockAction.MoveRight:
                to = block.at.translateX(1);
                break;
            case BlockAction.MoveLeft:
                to = block.at.translateX(-1);
                break;
            case BlockAction.MoveUp:
                to = block.at.translateY(-1);
                break;
        }

        // If future block is beyond the board limits
        if (!board.contains(block, to))
            return new FlowConditionResult(false);

        if (board.isObstacleFree(block, to)) {
            let ogresToKill: Ogre[] = [];
            if (block instanceof Hero)
                ogresToKill = Array.from(board.tracker.ogres(block, to));
            return new FlowConditionResult(true, new BlockMovedArgs(to, ogresToKill));
        }
        return new FlowConditionResult(false);
    }

    static BlockMovedSuccess(board: Board, block: Block, action: BlockAction, args: BlockMovedArgs) {
        if (Check.isNull(args))
            return;
        block.move(args.target);
        for (let ogre of args.ogresToKill) {
            board.do(ogre, BlockAction.Die);
            board.remove(ogre);
        }
                    
    }
}

