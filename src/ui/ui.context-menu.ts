import { DomBase } from "./ui.dom-base";


export interface MenuData{
    id: number;
    groupId: number;
    title: string;
    description: string;
    OnClick: (this: HTMLDivElement, ev: MouseEvent) => any;
    parentId: number; // -1 is root
    liDom?: HTMLDivElement; // target
    ulDom?: HTMLDivElement; // sub
}

export class ContextMenu extends DomBase<HTMLDivElement> {
    
    contextMenu?: HTMLDivElement;
    menuData: MenuData[] = [];
    
    constructor(div: HTMLDivElement) {
        super(div);
    }
    protected init(): void {
        console.log("read init of context")
        this.contextMenu = document.createElement("div");
        this.contextMenu.id = "contextMenu";

        this.menuData.push({
            id: 0,
            groupId: 0,
            title: "ああああ",
            description: "",
            OnClick: function (this: HTMLDivElement, ev: MouseEvent) {
                console.log("test")
            },
            parentId: -1
        });

        this.menuData.push({
            id: 1,
            groupId: 0,
            title: "いいいいい",
            description: "",
            OnClick: function (this: HTMLDivElement, ev: MouseEvent) {
                console.log("test")
            },
            parentId: -1
        });


        this.menuData.push({
            id: 2,
            groupId: 0,
            title: "うううう",
            description: "",
            OnClick: function (this: HTMLDivElement, ev: MouseEvent) {
                console.log("test")
            },
            parentId: 1
        });
        this.menuData.push({
            id: 3,
            groupId: 0,
            title: "ええええ",
            description: "",
            OnClick: function (this: HTMLDivElement, ev: MouseEvent) {
                console.log("test")
            },
            parentId: 1
        });
        // const contextMenuItem: HTMLDivElement = document.createElement("div");
        // contextMenuItem.textContent = "選択";
        // contextMenuItem.addEventListener("click", function (event) {
        //     if (event.target != contextMenuItem) return;
        //     event.stopPropagation();
        //     var isActive = contextMenuItem.classList.contains("active");
        //     if (!isActive) {
        //         contextMenuItem.classList.add("active");
        //     } else {
        //         contextMenuItem.classList.remove("active");
        //     }
        // });
        // this.contextMenu.appendChild(contextMenuItem);

        // const submenu: HTMLDivElement = document.createElement("div");
        // submenu.className = "submenu";
        // const submenuItem: HTMLDivElement = document.createElement("div");
        // submenuItem.textContent = "中";
        // submenu.appendChild(submenuItem);
        // contextMenuItem.appendChild(submenu);
        this.update();
    }
    protected update(): void {
        const sortedMenuData = this.menuData.sort((a, b) => {
            if (a.parentId != b.parentId) { return a.parentId - b.parentId; }
            return a.groupId - b.groupId;
        });
        const contextMenu = this.contextMenu!;


        sortedMenuData.filter((menuData) => {
            return menuData.parentId == -1; // only root
        }).forEach((menuData) => {
            const contextMenuItem: HTMLDivElement = document.createElement("div");
            contextMenuItem.textContent = menuData.title; //TODO:description
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
            if (sortedMenuData.filter((targetMenuData) => { return targetMenuData.parentId == menuData.id }).length > 0) { // has child
                const submenu: HTMLDivElement = document.createElement("div");
                submenu.className = "submenu";
                contextMenuItem.appendChild(submenu);
                menuData.ulDom = submenu;
            } else {
                contextMenuItem.addEventListener("click",menuData.OnClick);
            }
            contextMenu.appendChild(contextMenuItem);
            menuData.liDom = contextMenuItem;
        });

        sortedMenuData.filter((menuData) => {
            return menuData.parentId != -1; // only not root
        }).forEach((submenuData) => {
            const submenu = sortedMenuData.find((menuData) => {
                return menuData.id == submenuData.parentId;
            })?.ulDom;
            const submenuItem: HTMLDivElement = document.createElement("div");
            submenuItem.textContent = submenuData.title;
            submenuItem.addEventListener("click", submenuData.OnClick);
            if (!submenu) throw new Error("invalid menu data!");
            submenu.appendChild(submenuItem);
            submenuData.liDom = submenuItem;
        });

    }
    CSS(): string {
        return `
#contextMenu {
    display: none;
    position: fixed;
    width: 150px;
    background-color: rgba(255, 255, 255, 1.0);
    front-color: rgba(0,0,0,1.0);
    user-select: none;
    border: 1px solid #ccc;
    padding: 0;
}
#contextMenu div {
    background-color: rgba(255, 255, 255, 1.0);
    position: relative;
    cursor: pointer;
    padding: 8px 8px 8px 28px;
}
#contextMenu div:hover {
    background-color: rgba(127, 127, 127, 1.0);
}
#contextMenu .submenu {
    display: none;
    position: absolute;
    top: 0;
    left: 150px;
    width: 150px;
    background-color: rgba(255, 255, 255, 1.0);
    front-color: rgba(0,0,0,1.0);
    border: 1px solid #ccc;
    padding: 0;
}
#contextMenu div.active .submenu {
    display: block;
}
        `;
    }
    getElement(){
        return this.contextMenu;
    }
}
