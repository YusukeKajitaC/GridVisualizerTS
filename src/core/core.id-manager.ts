import {
    GridComponentContext,
    GridComponentData,
    GridConnectionContext,
    GridGroupContext,
    IdOwner,
} from "./core.grid-components";

export class IdManager<owner extends IdOwner<number>> {
    static ID_MAX = 100000;
    idSet: Set<number>;

    private counter: number;
    constructor() {
        this.idSet = new Set();
        this.counter = 0;
    }
    setup(idOwnerList: owner[]) {
        this.idSet = new Set(
            idOwnerList.map((targetIdOwner) => {
                return targetIdOwner.getId();
            })
        );
    }
    getNewId() {
        for (; this.counter < IdManager.ID_MAX; this.counter++) {
            if (!this.idSet.has(this.counter)) {
                this.idSet.add(this.counter);
                return this.counter;
            }
        }
        return -1;
    }
    resetCounter() {
        this.counter = 0;
    }
}

export class ComponentIdManager extends IdManager<GridComponentContext<GridComponentData>> {}
export class ConnectionIdManager extends IdManager<GridConnectionContext> {}
export class GroupIdManager extends IdManager<GridGroupContext> {}
