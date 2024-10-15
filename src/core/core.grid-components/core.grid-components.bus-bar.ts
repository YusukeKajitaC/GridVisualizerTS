import {
    GridComponentConnectionData,
    GridComponentContext,
    GridComponentData,
    GridComponentGroupData,
} from "./core.grid-components.grid-component";

export interface BusBarData extends GridComponentData {
    consumption: number;
}

export class BusBarContext extends GridComponentContext<BusBarData> {
    update(): void {}
    constructor(
        data: BusBarData,
        connectionList: GridComponentConnectionData[],
        groupList: GridComponentGroupData[]
    ) {
        super(data, connectionList, groupList);
    }
}