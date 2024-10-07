import { DomBase } from "./ui.dom-base";

export class Canvas extends DomBase<HTMLCanvasElement>{
    
    canvas?: HTMLCanvasElement;
    init(): void {
        console.log("read init of canvas")
        this.canvas = document.createElement("canvas");
        this.canvas.id = "GridVisualizer";
        this.canvas.width = 960;
        this.canvas.height = 540;

    }
    protected update(): void {
    }
    CSS(): string {
        return "";
    }
    getElement(){
        return this.canvas;
    }
    constructor(div: HTMLDivElement){
        super(div);
    }
}