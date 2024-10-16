import * as GridComponents from "../../../src/core/index";

test("core.GridComponents.fundamental", () => {
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
    console.log(a.dump());
    expect(a.exportToJsonString()).toEqual(b.exportToJsonString());
});


test("core.GridComponents.exportToJsonString", () => {
    let a: GridComponents.GridComponentsManager;
    a = new GridComponents.GridComponentsManager();
    const generator1:GridComponents.GeneratorData ={
        ratedPower: 100,
        componentId: 999,
        name: "GEN1",
        description: "test Generator 1",
        type: "Generator"
    } 
    const consumer1:GridComponents.ConsumerData ={
        componentId: 999,
        name: "CONS1",
        description: "test consumer 1",
        type: "Consumer",
        consumption: 100
    } 
    const generator1id = a.createComponent(generator1);
    const consumer1id = a.createComponent(consumer1);
    a.createConnection([generator1id, consumer1id]);
    console.log(a.exportToJsonString());
    console.log(a.dump());
    const b = new GridComponents.GridComponentsManager();
    b.importFromJsonString(a.exportToJsonString());
    expect(a.exportToJsonString()).toEqual(b.exportToJsonString());
});
