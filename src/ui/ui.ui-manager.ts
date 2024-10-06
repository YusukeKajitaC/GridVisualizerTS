import { Canvas } from "./ui.canvas";
import { ContextMenu } from "./ui.context-menu";

export class UIManager {
    contextMenu: ContextMenu;
    canvas: Canvas;
    constructor(div: HTMLDivElement) {
        this.canvas = new Canvas(div);
        this.contextMenu = new ContextMenu(div);

    }
    initAll(){
        this.canvas.initAll();
        this.contextMenu.initAll();
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
                const items = document.querySelectorAll("#contextMenu > li");
                items.forEach((item) => {
                    item.classList.remove("active");
                });
            }
        });
    }
}
