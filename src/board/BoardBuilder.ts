import { GrassGround } from "../blocks/grounds/GrassGround";
import { Box } from "../blocks/obstacles/Box";
import { Log } from "../blocks/obstacles/Log";
import { Tree } from "../blocks/obstacles/Tree";
import { Point } from "../geometries/Point";
import { Board } from "./Board";

export class BoardBuilder {
    static get(mapName: string, width: number, height: number): Board {
        let board = new Board(new GrassGround(width, height));
        let nx = Math.floor(width / 25);
        let ny = Math.floor(height / 25); 
        for (let i = 0; i < nx; i++) {
            board.add(new Tree(), new Point(i * 25, 0));
            board.add(new Tree(), new Point(i * 25, height - 25));
        }

        for (let j = 1; j < ny - 1; j++) {
            board.add(new Tree(), new Point(0, j * 25));
            board.add(new Tree(), new Point(width - 25, j * 25));
        }

        board.add(new Tree(), new Point(190, 180));
        board.add(new Tree(), new Point(220, 180));
        board.add(new Tree(), new Point(250, 180));
        board.add(new Tree(), new Point(280, 180));
        board.add(new Tree(), new Point(310, 180));
        board.add(new Tree(), new Point(340, 180));

        board.add(new Tree(), new Point(270, 210));
        board.add(new Tree(), new Point(270, 240));
        board.add(new Tree(), new Point(270, 270));
        board.add(new Tree(), new Point(270, 300));
        board.add(new Tree(), new Point(245, 315));
        board.add(new Tree(), new Point(220, 310));
        board.add(new Tree(), new Point(200, 290));
        board.add(new Log());
        board.add(new Log());
        board.add(new Log());
        board.add(new Log());
        board.add(new Log());
        
        return board;
    }
}