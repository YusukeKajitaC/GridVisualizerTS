import {
    CalculateType,
    ConceptualElement,
    ConductorAttribute,
    ElectricCalcElement,
    ElectricElementData,
    GridComponentConnectionData,
    GridComponentContext,
    GridComponentData,
    GridComponentGroupData,
    hasCapacity,
} from "./core.grid-components.grid-component";
import { VoltageLevel } from "./core.grid-components.unit";

export interface BusBarData extends ElectricElementData {
    consumption: number;
}

export class BusBarContext extends GridComponentContext<BusBarData> implements ConductorAttribute, hasCapacity {
    protected electricConnectCheckEach<Target extends ElectricCalcElement & GridComponentData>(to: Target): boolean {
        return to.getVoltageLevel() == this.data.voltageLevel; //電圧が同じなら好きなだけつなげる
    }
    protected conceptualConnectCheckEach<Target extends ConceptualElement & GridComponentData>(to: Target): boolean {
        return false;
    }
    update(): void {}
    constructor(data: BusBarData, connectionList: GridComponentConnectionData[], groupList: GridComponentGroupData[]) {
        super(data, connectionList, groupList);
        this.calculateType = "Conductor";
    }
    getVoltageLevel(): VoltageLevel {
        return this.data.voltageLevel;
    }
    getCapacity(): number {
        //TODO
        throw new Error("Method not implemented.");
    }
    getResistance(): number {
        return 0;
    }
    calculateType: CalculateType;
}
