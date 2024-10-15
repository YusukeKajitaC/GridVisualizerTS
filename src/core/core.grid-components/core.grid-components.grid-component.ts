export type GridComponentType =
    | "Generator"
    | "Consumer"
    | "Line"
    | "Joint"
    | "LineElement"
    | "Station"
    | "TransFormer"
    | "BusBar"
    | "CircuitBreaker"
    | "DisconnectSwitch";

export type GridComponentId = number;
export type GridComponentConnectionId = number;
export type GridComponentGroupId = number;

export interface IdOwner<Id>{
    getId():Id;
}
export class IdUtility {
    static getIdFirstSecond<Id>(ids: [Id, Id]) {
        if (ids[0] <= ids[1]) return ids;
        return [ids[1], ids[0]] as [Id, Id];
    }
}

export interface GridComponentData {
    componentId: GridComponentId;
    name: string;
    description: string;
    type: GridComponentType;
}

// Data of Grid Component GroupInfo
export interface GridComponentGroupData{
    groupId: GridComponentGroupId;
    parentGroupId: GridComponentGroupId | null;

    groupInfo: GridComponentId[];
}

export interface GridComponentConnectionData {
    connectionId: GridComponentConnectionId;
    connectionInfo: [GridComponentId, GridComponentId];
}

export class GridComponentConnectionContext {
    // self
    data: GridComponentData;
    connectionList: GridComponentConnectionData[];
    constructor(data: GridComponentData, connectionList: GridComponentConnectionData[]) {
        this.data = data;
        this.connectionList = [];
        this.update(connectionList);
    }

    update(connections: GridComponentConnectionData[]) {
        this.connectionList = connections.filter((target) => {
            return target.connectionInfo.includes(this.data.componentId);
        });
    }
    getComponentIdListOfConnectedTo() {
        return this.connectionList.map((target) => {
            if (target.connectionInfo[0] != this.data.componentId) return target.connectionInfo[0];
            return target.connectionInfo[1];
        });
    }
}

export class GridComponentGroupContext {
    data: GridComponentData;
    groupOf: GridComponentGroupData[];
    constructor(data: GridComponentData, groups: GridComponentGroupData[]) {
        this.data = data;
        this.groupOf = [];
        this.update(groups);
    }
    update(groupList: GridComponentGroupData[]) {
        this.groupOf = groupList.filter((target) => {
            return target.groupInfo.includes(this.data.componentId);
        });
    }
}

export abstract class GridComponentContext<ComponentData extends GridComponentData> implements IdOwner<GridComponentId> {
    data: ComponentData;

    connection: GridComponentConnectionContext;
    group: GridComponentGroupContext;
    constructor(
        data: ComponentData,
        connectionList: GridComponentConnectionData[],
        groupList: GridComponentGroupData[]
    ) {
        this.data = data;

        this.connection = new GridComponentConnectionContext(this.data, connectionList);
        this.group = new GridComponentGroupContext(this.data, groupList);
    }
    getId() {
        return this.data.componentId;
    }

    updateConnection(connectionList: GridComponentConnectionData[]) {
        this.connection.update(connectionList);
    }
    updateGroup(groupList: GridComponentGroupData[]) {
        this.group.update(groupList);
    }

    abstract update():void;

}

export class GridConnectionContext implements IdOwner<GridComponentConnectionId>{
    data: GridComponentConnectionData;
    constructor(data: GridComponentConnectionData) {
        this.data = data;
    }
    getId(){
        return this.data.connectionId;
    }
}


export class GridGroupContext implements IdOwner<GridComponentGroupId>{
    data: GridComponentGroupData;
    constructor(data: GridComponentGroupData) {
        this.data = data;
    }
    getId(){
        return this.data.groupId;
    }
}
