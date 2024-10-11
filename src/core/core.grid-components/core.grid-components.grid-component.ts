export type GridComponentType =
  | "Generator"
  | "Consumer"
  | "Line"
  | "Joint"
  | "LineElement"
  | "Station"
  | "TransFormer"
  | "CircuitBreaker"
  | "DisconnectSwitch";
  
export type GridComponentId = string;

export interface GridComponentData {
    id: GridComponentId; 
    type: GridComponentType;
}

export interface GridComponentConnectionData {
    id: GridComponentId;
    connectionInfo: [GridComponentId, GridComponentId];
}


export interface GridComponentGroupData {
    id: GridComponentId;
    groupInfo:GridComponentId[]
}


export interface GridComponent{
    data: GridComponentData;
    connection: GridComponentConnectionData[];
    
}