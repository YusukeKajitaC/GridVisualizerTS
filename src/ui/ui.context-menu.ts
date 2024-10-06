import { DomBase } from "./ui.dom-base";

export class ContextMenu extends DomBase<HTMLUListElement> {
    getElement(){
        return this.contextMenu;
    }
    contextMenu?:HTMLUListElement;
    constructor(div: HTMLDivElement) {
        super(div);
    }
    init(): void {
        console.log("read init of context")
        this.contextMenu = document.createElement("ul");
        this.contextMenu.id = "contextMenu";
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
        this.contextMenu.appendChild(contextMenuItem);

        const submenu: HTMLUListElement = document.createElement("ul");
        submenu.className = "submenu";
        const submenuItem: HTMLLIElement = document.createElement("li");
        submenuItem.textContent = "中";
        submenu.appendChild(submenuItem);
        contextMenuItem.appendChild(submenu);
    }

    CSS(): string {
        return `
#contextMenu {
    display: none;
    position: fixed;
    width: 150px;
    background-color: rgba(0, 0, 0, 0.5);
    user-select: none;
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
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}
#contextMenu li.active .submenu {
    display: block;
}
        `;
    }
}
