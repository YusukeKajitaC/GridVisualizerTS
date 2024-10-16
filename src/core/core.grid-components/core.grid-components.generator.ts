import {
    CalculateType,
    GeneratorAttribute,
    GridComponentConnectionData,
    GridComponentContext,
    GridComponentData,
    GridComponentGroupData,
} from "./core.grid-components.grid-component";

export interface GeneratorData extends GridComponentData {
    ratedPower: number;
}

export class GeneratorContext extends GridComponentContext<GeneratorData> implements GeneratorAttribute {
    update(): void {}
    constructor(
        data: GeneratorData,
        connectionList: GridComponentConnectionData[],
        groupList: GridComponentGroupData[]
    ) {
        super(data, connectionList, groupList);
        this.calculateType = "Generator";
    }
    getRatedPower(): number {
        return this.data.ratedPower;
    }
    calculateType: CalculateType;
}
