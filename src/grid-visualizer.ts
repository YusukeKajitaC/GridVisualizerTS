import { Diagram } from "./drawing/drawing.diagram";
import { LinesObject } from "./drawing/drawing.lines-object";
import { UIManager } from "./ui/ui.ui-manager";

export class GridVisualizer {
  diagram: Diagram;
  uiManager: UIManager;
  constructor(div: HTMLDivElement) {
    this.uiManager = new UIManager(div);
    this.uiManager.initAll();
    this.diagram = new Diagram(this.uiManager.canvas.canvas!);
    this.diagram.objectList.push(new LinesObject());
    this.diagram.init();
    this.diagram.draw();
  }
}
