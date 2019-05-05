import { action, configure, observable } from 'mobx'
import {PresentationProposal} from '../CFP/PresentationProposal'

configure({ enforceActions: 'observed' })

export class CFPReview {
    @observable id: string | null=null;
    @observable presentation: PresentationProposal | null = null
    @observable comment: string | null=null
    
    @action
    setComment(newComment: string) {
        this.comment = newComment
    }
}
