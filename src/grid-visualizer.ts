import { Diagram } from "./drawing/drawing.diagram";
import { UIManager } from "./ui/ui.ui-manager";

export class GridVisualizer {
  diagram: Diagram;
  uiManager: UIManager;
  constructor(div: HTMLDivElement) {
    this.uiManager = new UIManager(div);
    this.uiManager.initAll();
    this.diagram = new Diagram(this.uiManager.canvas.canvas!);

  }
}
