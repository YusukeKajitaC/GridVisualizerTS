export abstract class DrawableObject {
  isVisible;

  constructor(isVisible = true) {
    this.isVisible = isVisible;
    this.init();
  }

  abstract init(): void;
  abstract draw(): void;

}
