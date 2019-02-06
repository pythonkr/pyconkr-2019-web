import { IRootStore } from '../stores/RootStore'

type PagePropsType = {
    isServer: boolean;
    initialState: IRootStore;
}

type PageStatesType = {
    stores: IRootStore;
}

export { PagePropsType, PageStatesType }
