export abstract class DomBase<DOM extends HTMLElement> {
    div: HTMLDivElement;
    constructor(div: HTMLDivElement) {
        this.div = div;
    }
    setupCSS() {
        const style: HTMLStyleElement = document.createElement("style");
        style.textContent = this.CSS();
        document.head.appendChild(style);
    }
    getId(){
        return this.getElementFact().id;
    }
    
    getElementFact(){
        const element = this.getElement();
        if(!element){
            throw new Error("no element!");
        }
        return element;
    }
    
    private preInit(){
        
    }
    protected abstract init(): void;
    private postInit(){
        this.setupCSS();
        this.div.appendChild( this.getElementFact());
    }

    initAll(){
        this.preInit();
        this.init();
        this.postInit();
    }

    protected abstract update(): void;

    updateAll() {
        this.update();
    }

    abstract CSS(): string;
    abstract getElement(): DOM | undefined;
}
