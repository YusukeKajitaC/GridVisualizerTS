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
    NoElectricAttribute,
} from "./core.grid-components.grid-component";
import { VoltageLevel } from "./core.grid-components.unit";

export interface LineData extends GridComponentData {
    length: number;
    voltageLevel: VoltageLevel;
}

export class LineContext extends GridComponentContext<LineData> implements ConceptualElement {
    protected electricConnectCheckEach<Target extends ElectricCalcElement & GridComponentData>(to: Target): boolean {
        return false;
    }
    protected conceptualConnectCheckEach<Target extends ConceptualElement & GridComponentData>(to: Target): boolean {
        return true;
    }
    update(): void {}
    constructor(
        data: LineData,
        connectionList: GridComponentConnectionData[],
        groupList: GridComponentGroupData[]
    ) {
        super(data, connectionList, groupList);
        this.calculateType = "Nothing";
    }
    calculateType: CalculateType;
}


export interface LineElementData extends ElectricElementData {
    length: number;
    capacity: number;
    resistance: number; // only first use case is to be 0;
}


export class LineElementContext extends GridComponentContext<LineElementData> implements ConductorAttribute, hasCapacity {
    protected electricConnectCheckEach<Target extends ElectricCalcElement & GridComponentData>(to: Target): boolean {
        throw new Error("Method not implemented.");
    }
    protected conceptualConnectCheckEach<Target extends ConceptualElement & GridComponentData>(to: Target): boolean {
        throw new Error("Method not implemented.");
    }
    update(): void {}
    constructor(
        data: LineElementData,
        connectionList: GridComponentConnectionData[],
        groupList: GridComponentGroupData[]
    ) {
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
        return this.data.resistance;
    }
    calculateType: CalculateType;
}
