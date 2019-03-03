import { configure, observable } from 'mobx'

configure({ enforceActions: 'always' })

export class Sponsor {
    @observable id: string = '';
    @observable name?: string;
    @observable nameKo?: string;
    @observable desc?: string;
}

export class SponsorStore {
    @observable sponsors: Sponsor[] = [
        { id: '1', name: 'one', nameKo: '하나', desc: 'sample1'},
        { id: '2', name: 'two', nameKo: '둘', desc: 'sample2'},
    ]
}

export default new SponsorStore()
