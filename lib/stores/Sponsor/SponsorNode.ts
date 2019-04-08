import { CreateOrUpdateSponsor_createOrUpdateSponsor_sponsor_creator as SponsorCreator } from 'lib/apollo_graphql/__generated__/CreateOrUpdateSponsor'
import { SponsorLevelType } from 'lib/apollo_graphql/queries/getSponsorLevels'
import { action, configure, observable } from 'mobx'

configure({ enforceActions: 'observed' })

export class SponsorNode {
    @observable id: string = ''
    @observable creator?: SponsorCreator
    @observable name: string = ''
    @observable nameKo: string = ''
    @observable nameEn: string = ''
    @observable level?: SponsorLevelType | null
    @observable desc: string = ''
    @observable descKo: string = ''
    @observable descEn: string = ''
    @observable managerName?: string
    @observable managerPhone?: string
    @observable managerSecondaryPhone?: string
    @observable managerEmail?: string
    @observable businessRegistrationNumber?: string
    @observable businessRegistrationFile?: any | null
    @observable contractProcessRequired: boolean = false
    @observable url?: string | null
    @observable logoImage: any | null
    @observable logoVector: any | null
    @observable paidAt: any | null
    @observable submitted: boolean = false
    @observable accepted: boolean = false

    constructor(data: Partial<SponsorNode>) {
        Object.assign(this, data);
    }
    
    @action
    setNameKor(newNameKor: string) {
        this.nameKo = newNameKor
    }

    @action
    setNameEng(newNameEng: string) {
        this.nameEn = newNameEng
    }

    @action
    setLogoImage(fileUrl: string) {
        this.logoImage = fileUrl
    }

    @action
    setLogoVector(fileUrl: string) {
        this.logoVector = fileUrl
    }

    @action
    setManagerName(newManagerName: string) {
        this.managerName = newManagerName
    }

    @action
    setManagerPhone(newManagerPhoneNumber: string) {
        this.managerPhone = newManagerPhoneNumber
    }

    @action
    setManagerEmail(newManagerEmail: string) {
        this.managerEmail = newManagerEmail
    }

    @action
    setManagerSecondaryPhone(newManagerSecondaryPhoneNumber: string) {
        this.managerSecondaryPhone = newManagerSecondaryPhoneNumber
    }

    @action
    setBusinessRegistrationNumber(newBusinessRegistrationNumber: string) {
        this.businessRegistrationNumber = newBusinessRegistrationNumber
    }

    @action
    setBusinessRegistrationFile(fileUrl: string) {
        this.businessRegistrationFile = fileUrl
    }

    @action
    setContractProcessRequired(isContractProcessRequired: boolean) {
        this.contractProcessRequired = isContractProcessRequired
    }

    @action
    setUrl(newUrl: string) {
        this.url = newUrl
    }

    @action
    setDescKo(newDescKo: string) {
        this.descKo = newDescKo
    }

    @action
    setDescEn(newDescEn: string) {
        this.descEn = newDescEn
    }

    @action
    setSumitted(isSumitted: boolean) {
        this.submitted = isSumitted
    }
}
