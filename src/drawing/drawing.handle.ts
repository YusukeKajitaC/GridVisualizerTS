import { DrawElement } from "./drawing.drawable-object";
import { Point } from "./drawing.point";

export abstract class HandleHolder{
    handleList: Handle[] = [];

    checkHandle(handleProvider: HandleProvider) {
        this.handleList = 
    };
}

export interface HandleProvider extends DrawElement{
    
}

export type HandleType = "Line" | "Point";

export abstract class Handle{
    constructor(operationManager:Operaion) {
        
    }
    abstract handleType(): HandleType;
    associatedPoints: Point[] = [];
    abstract dragStart(): void;
    abstract move(): void;
    abstract dragEnd(): void;
}

export class LineHandle extends Handle{
    handleType(): HandleType {
        return "Line";
    }
    dragStart(): void {
        throw new Error("Method not implemented.");
    }
    move(): void {
        throw new Error("Method not implemented.");
    }
    dragEnd(): void {
        throw new Error("Method not implemented.");
    }

}

export class PointHandle extends Handle{
    
    handleType(): HandleType {
        return "Point";
    }
    dragStart(): void {
        throw new Error("Method not implemented.");
    }
    move(): void {
        throw new Error("Method not implemented.");
    }
    dragEnd(): void {
        throw new Error("Method not implemented.");
    }

}
