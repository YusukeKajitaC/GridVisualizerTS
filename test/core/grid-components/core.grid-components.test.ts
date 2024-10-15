import * as GridComponents from "../../../src/core/index";

test("core.GridComponents.exportToJsonString", () => {
    let a: GridComponents.GridComponentsManager;
    a = new GridComponents.GridComponentsManager();
    const genData:GridComponents.GeneratorData ={
        ratedPower: 0,
        componentId: 999,
        name: "",
        description: "",
        type: "Generator"
    } 
    a.createComponent(genData);
    console.log(a.exportToJsonString())
    const b = new GridComponents.GridComponentsManager();
    b.importFromJsonString(a.exportToJsonString());
    
    expect(a.exportToJsonString()).toEqual(b.exportToJsonString());
});
