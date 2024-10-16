import {
    GridComponentConnectionData,
    GridComponentContext,
    GridComponentData,
    GridComponentGroupData,
} from "./core.grid-components.grid-component";
import { VoltageLevel } from "./core.grid-components.unit";

export interface TransformerData extends GridComponentData {
    ratedPower: number;
    highVoltageLevel: VoltageLevel;
    rowVoltageLevel: VoltageLevel;
}

export class TransformerContext extends GridComponentContext<TransformerData> {
    update(): void {}
    constructor(
        data: TransformerData,
        connectionList: GridComponentConnectionData[],
        groupList: GridComponentGroupData[]
    ) {
        super(data, connectionList, groupList);
    }
}
