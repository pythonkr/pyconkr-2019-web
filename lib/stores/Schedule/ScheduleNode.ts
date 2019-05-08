import { action, configure, observable, set} from 'mobx'

configure({ enforceActions: 'observed' })

export class ScheduleNode {
    @observable name: string = ''
    @observable nameKo: string = ''
    @observable nameEn: string = ''
    @observable conferenceStartAt: any | null
    @observable conferenceFinishAt: any | null
    @observable tutorialStartAt: any | null
    @observable tutorialFinishAt: any | null
    @observable sprintStartAt: any | null
    @observable sprintFinishAt: any | null
    @observable keynoteRecommendationStartAt: any | null
    @observable keynoteRecommendationFinishAt: any | null
    @observable keynoteRecommendationAnnounceAt: any | null
    @observable presentationProposalStartAt: any | null
    @observable presentationProposalFinishAt: any | null
    @observable presentationReviewStartAt: any | null
    @observable presentationReviewFinishAt: any | null
    @observable presentationAnnounceAt: any | null
    @observable tutorialProposalStartAt: any | null
    @observable tutorialProposalFinishAt: any | null
    @observable tutorialProposalAnnounceAt: any | null
    @observable tutorialTicketStartAt: any | null
    @observable tutorialTicketFinishAt: any | null
    @observable sprintProposalStartAt: any | null
    @observable sprintProposalFinishAt: any | null
    @observable sprintProposalAnnounceAt: any | null
    @observable sprintTicketStartAt: any | null
    @observable sprintTicketFinishAt: any | null
    @observable sponsorProposalStartAt: any | null
    @observable sponsorProposalFinishAt: any | null
    @observable volunteerRecruitingStartAt: any | null
    @observable volunteerRecruitingFinishAt: any | null
    @observable volunteerAnnounceAt: any | null
    @observable lightningTalkProposalStartAt: any | null
    @observable lightningTalkProposalFinishAt: any | null
    @observable lightningTalkAnnounceAt: any | null
    @observable earlybirdTicketStartAt: any | null
    @observable earlybirdTicketFinishAt: any | null
    @observable financialAidStartAt: any | null
    @observable financialAidFinishAt: any | null
    @observable financialAidAnnounceAt: any | null
    @observable patronTicketStartAt: any | null
    @observable patronTicketFinishAt: any | null
    @observable conferenceTicketStartAt: any | null
    @observable conferenceTicketFinishAt: any | null
    @observable babycareTicketStartAt: any | null
    @observable babycareTicketFinishAt: any | null
    @observable youngcoderTicketStartAt: any | null
    @observable youngcoderTicketFinishAt: any | null
  }
