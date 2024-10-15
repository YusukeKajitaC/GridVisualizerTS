import {
    GridComponentConnectionData,
    GridComponentContext,
    GridComponentData,
    GridComponentGroupData,
} from "./core.grid-components.grid-component";

export interface ConsumerData extends GridComponentData {
    consumption: number;
}

export class ConsumerContext extends GridComponentContext<ConsumerData> {
    update(): void {}
    constructor(
        data: ConsumerData,
        connectionList: GridComponentConnectionData[],
        groupList: GridComponentGroupData[]
    ) {
        super(data, connectionList, groupList);
    }
}
