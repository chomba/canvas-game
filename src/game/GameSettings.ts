export class GameSettings {
    width: number;
    height: number;
    canvasId: string;
    mapName: string;
    maxOgresKilled: number;

    constructor() {
        this.canvasId = "#game-canvas";
        this.width = 600;
        this.height = 500;
        this.mapName = "grass";
        this.maxOgresKilled = 20;
    }
}