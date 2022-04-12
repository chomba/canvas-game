import { Block } from "../blocks/Block";
import { BlockAction } from "../blocks/BlockAction";
import { BlockState } from "../blocks/BlockState";
import { Hero } from "../blocks/players/Hero";
import { Ogre } from "../blocks/players/Ogre";
import { Board } from "../board/Board";
import { BoardBuilder } from "../board/BoardBuilder";
import { Point } from "../geometries/Point";
import { AutoController } from "../input/AutoController";
import { KeyController } from "../input/KeyController";
import { OneKeyBinding } from "../input/OneKeyBinding";
import { Check } from "../shared/Check";
import { GameSettings } from "./GameSettings";
import { GameStats } from "./GameStats";
import { GameStatus } from "./GameStatus";

export class Game {
    private settings: GameSettings;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private keyboardController: KeyController;
    private autopilots: Map<string, AutoController>;
    public board: Board;
    private requestId: number;
    public stats: GameStats;
    public status: GameStatus;
    onStatsChanged: () => void;
    onGameCompleted: () => void;
    private timer: any;

    constructor(settings: GameSettings = null) {
        this.settings = settings ?? new GameSettings();
        this.board = BoardBuilder.get(this.settings.mapName, this.settings.width, this.settings.height);
        this.stats = new GameStats();
        this.status = GameStatus.Uninitilized;
        this.board.onPlayerRemoved = (block: Block) => {
            if (block instanceof Ogre) {
                this.stats.ogresKilled++;
                this.statsChanged();
                this.board.add(new Ogre());
                if (this.stats.ogresKilled == this.settings.maxOgresKilled)
                    this.gameCompleted();
            }
        };

        this.keyboardController = new KeyController(this.board);
        this.autopilots = new Map<string, AutoController>();
        this.canvas = document.querySelector(this.settings.canvasId);
        this.canvas.width = this.settings.width;
        this.canvas.height = this.settings.height;
        this.ctx = this.canvas?.getContext("2d");
    }

    gameCompleted() {
        this.pause();
        if (!Check.IsNull(this.onGameCompleted))
            this.onGameCompleted();
        this.status = GameStatus.Completed;
    }

    statsChanged() {
        if (!Check.IsNull(this.onStatsChanged))
            this.onStatsChanged();
    }

    private addPlayers() {
        let player1 = new Hero("Jhon");
        this.board.add(player1);
        this.keyboardController.attach();

        // Bind Keys
        this.keyboardController.add(new OneKeyBinding("ArrowRight", player1, BlockAction.MoveRight));
        this.keyboardController.add(new OneKeyBinding("ArrowLeft", player1, BlockAction.MoveLeft));
        // this.keyboardController.add(new TwoKeyBinding("ArrowLeft", "ArrowUp", player1, BlockAction.MoveUpLeft));
        this.keyboardController.add(new OneKeyBinding("ArrowUp", player1, BlockAction.MoveUp));
        this.keyboardController.add(new OneKeyBinding("ArrowDown", player1, BlockAction.MoveDown));

        // Add Ogres
        this.board.onPlayerAdded = (block: Block) => {
            if (block instanceof Ogre) {
                let ogre: Ogre = block as Ogre;
                let ogreAutopilot = new AutoController(this.board, ogre);
                this.autopilots.set(ogre.id, ogreAutopilot);
                ogreAutopilot.attach();
            }
        }
        this.board.add(new Ogre());
        this.board.add(new Ogre());
        this.board.add(new Ogre());
        this.board.add(new Ogre());
    }

    start() {
        this.addPlayers();
        this.requestId = this.board.renderOn(this.ctx);
        this.status = GameStatus.Running;
        this.timer = setInterval(() => {
            if (this.status == GameStatus.Running)
                this.stats.secondsElapsed++;
        }, 1000);
    }

    resume() {
        this.keyboardController.attach();
        for (let autopilot of this.autopilots.values()) {
            autopilot.attach();
        }
        this.status = GameStatus.Running;
    }

    pause() {
        this.keyboardController.detach();
        for (let autopilot of this.autopilots.values()) {
            autopilot.detach();
        }
        this.status = GameStatus.Paused;
    }

    dispose() {
        this.status = GameStatus.Completed;
        this.pause();
        cancelAnimationFrame(this.requestId);
    }
}