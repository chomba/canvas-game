import { Check } from "../shared/Check";

export class Popup {
    popupSelector: string;
    triggerSelector: string;
    popup: HTMLElement;
    trigger: HTMLElement;
    OnOKClicked: () => void;
    OnCancelClicked: () => void;
    OnOpened: () => void;
    BeforeOpening: () => void;
    
    constructor(popUpselector: string, triggerSelector: string = "none") {
        this.popupSelector = popUpselector;
        this.triggerSelector = triggerSelector;
        this.popup = document.querySelector(popUpselector);
        this.trigger = document.querySelector(triggerSelector);
        this.bind();
    }

    bind() {
        this.trigger?.addEventListener("click", (e) => this.open());
        this.popup?.querySelector(".btn-cancel")?.addEventListener("click", (e) => this.cancel());
        this.popup?.querySelector(".btn-ok")?.addEventListener("click", (e) => this.ok());
    }

    hide() {
        this.popup.classList.add("hide");
    }

    unhide() {
        this.popup.classList.remove("hide");
    }

    ok() {
        if (!Check.IsNull(this.OnOKClicked))
            this.OnOKClicked();
        this.hide();
    }

    cancel() {
        this.hide();
        if (!Check.IsNull(this.OnCancelClicked))
            this.OnCancelClicked();
    }

    open() {
        if (!Check.IsNull(this.BeforeOpening)) 
            this.BeforeOpening();
        this.unhide();
        if (!Check.IsNull(this.OnOpened))
            this.OnOpened();
    }
}