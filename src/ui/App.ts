import { Game } from "../game/Game";
import { Popup } from "./Popup";

export class App {
    startupPopup: Popup;
    restartPopup: Popup;
    menuPopup: Popup;
    finishedPopup: Popup;
    game: Game;

    constructor() {
        this.game = new Game();
        this.game.onStatsChanged = () => this.renderStats();
        this.game.onGameCompleted = () =>  { this.finishedPopup.open(); console.log('open'); }

        this.startupPopup =  new Popup("#startup-popup");
        this.restartPopup =  new Popup("#restart-popup", "#restart-popup-trigger");
        this.menuPopup =  new Popup("#menu-popup", "#menu-popup-trigger");
        this.finishedPopup =  new Popup("#finished-popup");

        this.startupPopup.BeforeOpening = this.restartPopup.BeforeOpening = this.menuPopup.BeforeOpening = () =>  {
            this.menuPopup.hide();
            this.restartPopup.hide();
            this.finishedPopup.hide();
        };

        this.startupPopup.OnOKClicked = () =>  {
            this.game.start();  
            document.querySelector("#status-bar")?.classList.remove("hide");  
        }
        
        this.menuPopup.OnOpened = this.restartPopup.OnOpened = () =>  this.game.pause();
        this.menuPopup.OnOKClicked = () => {
            // reload settings
            this.game.resume();
        };
        this.menuPopup.OnCancelClicked = this.restartPopup.OnCancelClicked = () => this.game.resume();
        this.restartPopup.OnOKClicked = this.finishedPopup.OnOKClicked = () => this.restart();
    }

    restart() {
        location.reload();
    }

    renderStats() {
        document.querySelector("#ogres-killed").textContent = this.game.stats.ogresKilled.toString();
        document.querySelector("#time-elapsed").textContent = `${this.game.stats.secondsElapsed.toString()} seconds`;
    }

    startup() {
        window.onload = () => {
            this.startupPopup.open();
        }
    }
}