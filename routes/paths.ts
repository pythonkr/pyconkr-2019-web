export const paths = {
  home: '/',
  coc: '/coc',
  help: {
    base: '/help',
    faq: '/help/faq',
    notice: '/help/notice',
    venue: '/help/venue',
    childcare: '/help/childcare',
    financialAid: '/help/financial-aid',
    visaSponsing: '/help/visa-sponsing',
  },
  program: {
    base: '/program',
    keynote: '/program/keynote',
    talks: '/program/talks',
    talkDetail: '/program/talk-detail',
    lightningTalk: '/program/lightning-talk',
    proposingLightningTalk: '/program/proposing-lightning-talk',
    openSpaceTalk: '/program/open-space-talk',
    tutorial: '/program/tutorial',
    tutorialDetail: '/program/tutorial-detail',
    sprint: '/program/sprint',
    sprintDetail: '/program/sprint-detail',
    youngcoder: '/program/youngcoder',
    youngcoderDetail: '/program/youngcoder-detail',
    openlunch: '/program/openlunch',
    openLunchDetail: '/program/openlunch-detail',
  },
  timetable: {
    base: '/timetable',
    talks: '/timetable/talks',
    tutorial: '/timetable/tutorial',
    sprint: '/timetable/sprint',
  },
  contribute: {
    base: '/contribute',
    overview: '/contribute/overview',
    recommendingAKeynoteSpeaker: '/contribute/recommending-a-keynote-speaker',
    cfpDetailedGuide: '/contribute/cfp-detailed-guide',
    proposingATalk: '/contribute/proposing-a-talk',
    proposingASprint: '/contribute/proposing-a-sprint',
    proposingATutorial: '/contribute/proposing-a-tutorial',
    proposalReview: '/contribute/proposal-review',
    volunteer: '/contribute/volunteer',
    staff: '/contribute/staff',
  },
  ticket: {
    base: '/ticket',
    overview: '/ticket/overview',
    myTickets: '/ticket/my-tickets',
    myTicket: '/ticket/my-ticket',
    nametag: '/ticket/nametag',
    receipt: '/ticket/receipt',
    conference: '/ticket/conference',
    tutorial: '/ticket/tutorial',
    sprint: '/ticket/sprint',
    youngcoder: '/ticket/youngcoder',
    childcare: '/ticket/childcare',
    payment: '/ticket/payment'
  },
  sponsor: {
    base: '/sponsor',
    prospectus: '/sponsor/prospectus',
    applicationForm: '/sponsor/application-form',
    termsOfService: '/sponsor/terms-of-service',
    patronList: '/sponsor/patrons',
    detail: '/sponsor/detail',
  },
  account: {
    base: '/account',
    login: '/account/login',
    logout: '/account/logout',
    profile: '/account/profile',
    agreement: '/account/agreement',
    contribution: '/account/contribution',
    termsOfService: '/account/terms-of-service',
    privacyPolicy: '/account/privacy-policy',
    editproposal: {
      cfp: '/account/editproposal/cfp',
      cfs: '/account/editproposal/cfs',
      tutorial: '/account/editproposal/tutorial',
      sprint: '/account/editproposal/sprint',
    }
  },
}

export type NormalMenu = {
  title: string;
  intlKey: string;
  link: string;
  permission?: 'public' | 'user' | 'staff';
}

export type SubMenuGroup = {
  title: string;
  intlKey: string;
  link?: string;
  submenu?: NormalMenu[];
  permission?: 'public' | 'user' | 'staff';
}

export type WithSubMenu = {
  title: string;
  intlKey: string;
  basePath: string;
  submenu: (NormalMenu | WithSubMenu)[];
  permission?: 'anonymous' | 'user' | 'staff';
}

export type GNBMenu = NormalMenu | WithSubMenu

export const homeMenu: NormalMenu = {
  title: '홈',
  intlKey: 'gnb.home',
  link: paths.home
}

export const helpMenu: WithSubMenu = {
  title: '지원 및 안내',
  intlKey: 'gnb.help.root',
  basePath: paths.help.base,
  submenu: [
    // {
    //   title: '자주 묻는 질문',
    //   intlKey: 'gnb.help.faq',
    //   link: paths.help.faq
    // },
    // {
    //   title: '알림',
    //   intlKey: 'gnb.help.notice',
    //   link: paths.help.notice
    // },
    {
      title: '장소',
      intlKey: 'gnb.help.venue',
      link: paths.help.venue
    },
    {
      title: '재정지원',
      intlKey: 'gnb.help.financialAid',
      link: paths.help.financialAid
    },
    {
      title: 'Visa Sponsing',
      intlKey: 'gnb.help.visaSponsing',
      link: paths.help.visaSponsing
    },
    {
      title: '아이돌봄',
      intlKey: 'gnb.help.childcare',
      link: paths.help.childcare
    },
  ]
}

export const programMenu: WithSubMenu = {
  title: '프로그램',
  intlKey: 'gnb.program.root',
  basePath: paths.program.base,
  submenu: [{
    title: '컨퍼런스',
    intlKey: 'gnb.program.keynote',
    basePath: paths.program.base,
    submenu: [
      {
        title: '키노트',
        intlKey: 'gnb.program.keynote',
        link: paths.program.keynote,
      },
      {
        title: '발표 세션',
        intlKey: 'gnb.program.talks',
        link: paths.program.talks,
      },
      {
        title: '라이트닝 토크',
        intlKey: 'gnb.program.lightningTalk',
        link: paths.program.lightningTalk,
      },
      {
        title: '열린공간',
        intlKey: 'gnb.program.openSpaceTalk',
        link: paths.program.openSpaceTalk,
      },
      {
        title: '열린점심',
        intlKey: 'gnb.program.openlunch',
        link: paths.program.openlunch,
      }
    ]
  }, {
    title: '튜토리얼',
    intlKey: 'gnb.program.tutorial',
    link: paths.program.tutorial,
  },
  {
    title: '스프린트',
    intlKey: 'gnb.program.sprint',
    link: paths.program.sprint,
  },
  {
    title: '영코더',
    intlKey: 'gnb.program.youngcoder',
    link: paths.program.youngcoder,
  }]
}

export const timetableMenu: WithSubMenu = {
  title: '시간표',
  intlKey: 'gnb.timetable.root',
  basePath: paths.timetable.base,
  submenu: [{
    title: '컨퍼런스',
    intlKey: 'gnb.timetable.talks',
    link: paths.timetable.talks,
  }, {
    title: '튜토리얼',
    intlKey: 'gnb.timetable.tutorial',
    link: paths.timetable.tutorial,
  },
  {
    title: '스프린트',
    intlKey: 'gnb.timetable.sprint',
    link: paths.timetable.sprint,
  }]
}

export const contributionMenu: WithSubMenu = {
  title: '공헌하기',
  intlKey: 'gnb.contribute.root',
  basePath: paths.contribute.base,
  submenu: [
    {
      title: '공헌 안내',
      intlKey: 'gnb.contribute.overview',
      link: paths.contribute.overview
    },
    {
      title: '발표 제안 검토하기',
      intlKey: 'gnb.contribute.proposalReview',
      link: paths.contribute.proposalReview
    },
    {
      title: '튜토리얼 제안하기',
      intlKey: 'gnb.contribute.proposingATutorial',
      link: paths.contribute.proposingATutorial
    },
    {
      title: '키노트 연사 추천하기',
      intlKey: 'gnb.contribute.recommendKeynoteSpeaker',
      link: paths.contribute.recommendingAKeynoteSpeaker
    },
    {
      title: '발표안 작성 가이드',
      intlKey: 'gnb.contribute.cfpDetailedGuide',
      link: paths.contribute.cfpDetailedGuide
    },
    {
      title: '발표 제안하기',
      intlKey: 'gnb.contribute.proposingATalk',
      link: paths.contribute.proposingATalk,
    },
    {
      title: '자원봉사',
      intlKey: 'gnb.contribute.volunteer',
      link: paths.contribute.volunteer,
    },
    {
      title: '파이콘 한국 준비위원회',
      intlKey: 'gnb.contribute.staff',
      link: paths.contribute.staff,
    }
  ]
}

export const ticketMenu: WithSubMenu = {
  title: '티켓',
  intlKey: 'gnb.ticket.root',
  basePath: paths.ticket.base,
  submenu: [
    {
      title: '티켓 종류',
      intlKey: 'gnb.ticket.overview',
      link: paths.ticket.overview
    },
    {
      title: '내 티켓',
      intlKey: 'gnb.ticket.myTickets',
      link: paths.ticket.myTickets
    },
    {
      title: '컨퍼런스',
      intlKey: 'gnb.ticket.conference',
      link: paths.ticket.conference
    },
    {
      title: '튜토리얼',
      intlKey: 'gnb.ticket.tutorial',
      link: paths.ticket.tutorial
    },
    {
      title: '스프린트',
      intlKey: 'gnb.ticket.sprint',
      link: paths.ticket.sprint
    },
    {
      title: '영코더',
      intlKey: 'gnb.ticket.youngcoder',
      link: paths.ticket.youngcoder
    },
    {
      title: '아이돌봄',
      intlKey: 'gnb.ticket.childcare',
      link: paths.ticket.childcare
    }
  ]
}

export const sponsorMenu: WithSubMenu = {
  title: '후원',
  intlKey: 'gnb.sponsor.root',
  basePath: paths.sponsor.base,
  submenu: [
    {
      title: '후원사 안내',
      intlKey: 'gnb.sponsor.prospectus',
      link: paths.sponsor.prospectus
    },
    {
      title: '후원사 신청',
      intlKey: 'gnb.sponsor.invitation',
      link: paths.sponsor.applicationForm,
    },
    {
      title: '개인 후원자 목록',
      intlKey: 'gnb.sponsor.patron',
      link: paths.sponsor.patronList,
    }
  ]
}

export const accountMenu: WithSubMenu = {
  title: '내 정보',
  intlKey: 'gnb.info.root',
  basePath: paths.account.base,
  permission: 'user',
  submenu: [
    {
      title: '제안 및 신청 내역',
      intlKey: 'gnb.info.history',
      link: paths.account.contribution
    },
    {
      title: '프로필',
      intlKey: 'gnb.info.profile',
      link: paths.account.profile
    },
    {
      title: '로그아웃',
      intlKey: 'gnb.info.logout',
      link: paths.account.logout
    }
  ]
}

export const loginMenu: NormalMenu = {
  title: '로그인',
  intlKey: 'gnb.info.login',
  link: paths.account.login,
}

export const globalNavigationMenu: GNBMenu[] = [
  homeMenu,
  helpMenu,
  programMenu,
  timetableMenu,
  contributionMenu,
  sponsorMenu,
]
