import { Buffers, DrawableObject } from "./drawing.drawable-object";

export class PolygonObject extends DrawableObject{
    draw(gl: WebGL2RenderingContext, drawMethod: (buffers: Buffers, mode: GLenum, drawTarget: DrawableObject) => void): void {
        throw new Error("Method not implemented.");
    }
    
    update(gl: WebGL2RenderingContext): void {
        
    }
    init(gl:WebGL2RenderingContext): void {
        
    }

}