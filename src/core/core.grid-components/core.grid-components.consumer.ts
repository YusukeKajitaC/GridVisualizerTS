import {
    CalculateType,
    ConceptualElement,
    ConsumerAttribute,
    ElectricCalcElement,
    ElectricElementData,
    GridComponentConnectionData,
    GridComponentContext,
    GridComponentData,
    GridComponentGroupData,
} from "./core.grid-components.grid-component";
import { VoltageLevel } from "./core.grid-components.unit";

export interface ConsumerData extends ElectricElementData {
    consumption: number;
}

export class ConsumerContext extends GridComponentContext<ConsumerData> implements ConsumerAttribute {
    protected electricConnectCheckEach<Target extends ElectricCalcElement & GridComponentData>(to: Target): boolean {
        return to.getVoltageLevel() == this.data.voltageLevel && this.connection.connectionList.length < 1; // 繋がっていたら繋げない
    }
    protected conceptualConnectCheckEach<Target extends ConceptualElement & GridComponentData>(to: Target): boolean {
        return false;
    }
    update(): void {}
    constructor(
        data: ConsumerData,
        connectionList: GridComponentConnectionData[],
        groupList: GridComponentGroupData[]
    ) {
        super(data, connectionList, groupList);
        this.calculateType = "Consumer";
    }
    getVoltageLevel(): VoltageLevel {
        return this.data.voltageLevel;
    }
    getConsumption(): number {
        return this.data.consumption;
    }
    calculateType: CalculateType;
}
