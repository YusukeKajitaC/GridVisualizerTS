import { Diagram } from "./drawing/diagram";

export class GridVisualizer {
  diagram: Diagram;
  constructor(div: HTMLDivElement) {
    document.createElement("canvas");
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.id = "GridVisualizer";
    canvas.width = 960;
    canvas.height = 540;

    const contextMenu: HTMLUListElement = document.createElement("ul");
    contextMenu.id = "contextMenu";
    const contextMenuItem: HTMLLIElement = document.createElement("li");
    contextMenuItem.textContent = "選択";
    contextMenuItem.addEventListener("click", function (event) {
      if (event.target != contextMenuItem) return;
      event.stopPropagation();
      var isActive = contextMenuItem.classList.contains("active");
      if (!isActive) {
        contextMenuItem.classList.add("active");
      } else {
        contextMenuItem.classList.remove("active");
      }
    });
    contextMenu.appendChild(contextMenuItem);

    const submenu: HTMLUListElement = document.createElement("ul");
    submenu.className = "submenu";
    const submenuItem: HTMLLIElement = document.createElement("li");
    submenuItem.textContent = "中";
    submenu.appendChild(submenuItem);

    contextMenuItem.appendChild(submenu);

    const style: HTMLStyleElement = document.createElement("style");
    style.textContent = `
    #contextMenu {
      display: none;
      position: fixed;
      width: 150px;
      background-color: rgba(0, 0, 0, 0.5);
      User-select: none;
      border: 1px solid #ccc;

    }
    #contextMenu li {
          position: relative;
          padding: 8px;
          cursor: pointer;
    }
    #contextMenu li:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
    #contextMenu .submenu {
      display: none;
      position: absolute;
      top: 0;
      left: 150px;
      width: 150px;
      background-color: rgba(0, 0, 0, 0.5);
      border: 1px solid #ccc;
      box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
    }
    #contextMenu li.active .submenu {
      display: block;
    }
      `;
    document.head.appendChild(style);
    div.appendChild(canvas);
    div.appendChild(contextMenu);

    this.diagram = new Diagram(canvas);

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
  }
}
