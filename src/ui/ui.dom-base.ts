export abstract class DomBase {
    div: HTMLDivElement;
    constructor(div: HTMLDivElement) {
        this.div = div;
        this.setupCSS();
        this.init();
    }
    setupCSS() {
        const style: HTMLStyleElement = document.createElement("style");
        style.textContent = this.CSS();
        document.head.appendChild(style);
    }

    abstract init(): void;
    abstract CSS(): string;
}
