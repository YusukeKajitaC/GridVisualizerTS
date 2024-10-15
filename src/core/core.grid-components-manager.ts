import { ConsumerContext, ConsumerData } from "./core.grid-components/core.grid-components.consumer";
import { GeneratorContext, GeneratorData } from "./core.grid-components/core.grid-components.generator";
import {
    GridComponentConnectionContext,
    GridComponentConnectionData,
    GridComponentContext,
    GridComponentData,
    GridComponentGroupContext,
    GridComponentGroupData,
    GridComponentId,
    GridConnectionContext,
    GridGroupContext,
} from "./core.grid-components/core.grid-components.grid-component";
import { TransformerContext, TransformerData } from "./core.grid-components/core.grid-components.transformer";
import { ComponentIdManager, ConnectionIdManager, GroupIdManager, IdManager } from "./core.id-manager";

export interface GridComponentManagerData {
    componentDataList: GridComponentData[];
    connectionDataList: GridComponentConnectionData[];
    groupDataList: GridComponentGroupData[];
}

export interface GridComponentManagerContext {
    componentList: GridComponentContext<any>[];
    connectionList: GridConnectionContext[];
    groupList: GridGroupContext[];
}

export interface IDManagers {
    componentIdManager: ComponentIdManager;
    connectionIdManager: ConnectionIdManager;
    groupIdManager: GroupIdManager;
}

export class GridComponentsManager {
    data: GridComponentManagerData;

    context: GridComponentManagerContext;

    idManagers: IDManagers;

    constructor(
        data: GridComponentManagerData = {
            componentDataList: [],
            connectionDataList: [],
            groupDataList: [],
        },
        context: GridComponentManagerContext = {
            componentList: [],
            connectionList: [],
            groupList: [],
        },
        idManagers: IDManagers = {
            componentIdManager: new ComponentIdManager(),
            connectionIdManager: new ConnectionIdManager(),
            groupIdManager: new GroupIdManager(),
        }
    ) {
        this.data = data;
        this.context = context;
        this.idManagers = idManagers;
    }

    resetIdManagers() {
        this.idManagers.componentIdManager.setup(this.context.componentList);
        this.idManagers.connectionIdManager.setup(this.context.connectionList);
        this.idManagers.groupIdManager.setup(this.context.groupList);
    }

    initializeContextFromData() {
        // init
        this.context = {
            componentList: [],
            connectionList: this.data.connectionDataList.map((connectionData) => {
                return new GridConnectionContext(connectionData);
            }),
            groupList: this.data.groupDataList.map((groupData) => {
                return new GridGroupContext(groupData);
            }),
        };

        // recreate
        this.data.componentDataList.forEach((componentData) => {
            this.createComponentContextFromData(componentData);
        });

        // reset id managers
        this.resetIdManagers();
    }

    // create new one
    createComponent(componentData: GridComponentData) {
        componentData.componentId = this.idManagers.componentIdManager.getNewId();
        this.data.componentDataList.push(componentData);
        this.createComponentContextFromData(componentData);
    }
    createComponentContextFromData(componentData: GridComponentData) {
        let componentContext: GridComponentContext<any> | null = null;
        switch (componentData.type) {
            case "Generator":
                componentContext = new GeneratorContext(
                    componentData as GeneratorData,
                    this.data.connectionDataList,
                    this.data.groupDataList
                );
            case "Consumer":
                componentContext = new ConsumerContext(
                    componentData as ConsumerData,
                    this.data.connectionDataList,
                    this.data.groupDataList
                );
            case "Line":
            case "Joint":
            case "LineElement":
            case "Station":
            case "TransFormer":
                componentContext = new TransformerContext(
                    componentData as TransformerData,
                    this.data.connectionDataList,
                    this.data.groupDataList
                );
            case "CircuitBreaker":
            case "DisconnectSwitch":
        }
        if (componentContext) {
            this.context.componentList.push(componentContext);
        }
    }

    createConnection(connectInfo: [GridComponentId, GridComponentId]) {}

    importFromJsonString(jsonString: string) {
        this.data = JSON.parse(jsonString);
    }
    exportToJsonString() {
        return JSON.stringify(this.data);
    }
}
