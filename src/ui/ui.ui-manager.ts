import { Canvas } from "./ui.canvas";
import { ContextMenu } from "./ui.context-menu";
import { DomBase } from "./ui.dom-base";

export class UIManager {
    contextMenu: ContextMenu;
    canvas: Canvas;
    private domList:DomBase<any>[] = [];
    constructor(div: HTMLDivElement) {
        this.canvas = new Canvas(div);
        this.domList.push(this.canvas);

        this.contextMenu = new ContextMenu(div);
        this.domList.push(this.contextMenu);

    }
    initAll(){
        this.domList.forEach((value) => { value.initAll() });
        this.initRelativeEvents();
    }


    initRelativeEvents() {
        const contextMenu = this.contextMenu.getElementFact();
        this.canvas.getElementFact().addEventListener("contextmenu", function (event) {
            event.preventDefault();
            contextMenu.style.display = "block";
            contextMenu.style.left = event.clientX + "px";
            contextMenu.style.top = event.clientY + "px";
        });
        // 右クリックイベントをキャンバスに追加
        this.canvas.getElementFact().addEventListener("click", function (event) {
            if (event.button !== 2) {
                contextMenu.style.display = "none";
                const items = document.querySelectorAll("#contextMenu > div");
                items.forEach((item) => {
                    item.classList.remove("active");
                });
            }
        });
        
    }
    
    updateAll() {
        this.domList.forEach((value) => { value.updateAll() });
        
    }
}
