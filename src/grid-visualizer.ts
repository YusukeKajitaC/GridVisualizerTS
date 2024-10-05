import { Diagram } from "./drawing/drawing.diagram";

export class GridVisualizer {
  diagram: Diagram;
  constructor(div: HTMLDivElement) {
    document.createElement("canvas");
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.id = "GridVisualizer";
    canvas.width = 960;
    canvas.height = 540;

    // 右クリックイベントをキャンバスに追加
    canvas.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      contextMenu.style.display = "block";
      contextMenu.style.left = event.clientX + "px";
      contextMenu.style.top = event.clientY + "px";
    });
    canvas.addEventListener("click", function (event) {
      if (event.button !== 2) {
        contextMenu.style.display = "none";
        const items = document.querySelectorAll(('#contextMenu > li'));
        items.forEach((item) => {
          item.classList.remove("active");
        })
      }
    });

    div.appendChild(canvas);
    this.diagram = new Diagram(canvas);

  }
}
