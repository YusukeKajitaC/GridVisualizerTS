import {
    GridComponentConnectionData,
    GridComponentContext,
    GridComponentData,
    GridComponentGroupData,
} from "./core.grid-components.grid-component";

export interface TransformerData extends GridComponentData {
    ratedPower: number;
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
