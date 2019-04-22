export const paths = {
  home: '/',
  help: {
    base: '/help',
    faq: '/help/faq',
    notice: '/help/notice',
    venue: '/help/venue'
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
  },
  sponsor: {
    base: '/sponsor',
    prospectus: '/sponsor/prospectus',
    applicationForm: '/sponsor/application-form',
    termsOfService: '/sponsor/terms-of-service',
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
      cfs: '/account/editproposal/cfs'
    }
  }
}

export type NormalMenu = {
  title: string;
  intlKey: string;
  link: string;
  permission?: 'public' | 'user' | 'staff';
}

export type WithSubMenu = {
  title: string;
  intlKey: string;
  basePath: string;
  submenu: NormalMenu[];
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
    {
      title: '자주 묻는 질문',
      intlKey: 'gnb.help.faq',
      link: paths.help.faq
    },
    {
      title: '알림',
      intlKey: 'gnb.help.notice',
      link: paths.help.notice
    },
    {
      title: '장소',
      intlKey: 'gnb.help.venue',
      link: paths.help.venue
    }
  ]
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
      title: '발표 제안 리뷰하기',
      intlKey: 'gnb.contribute.overview', // todo : update intlkey
      link: paths.contribute.proposalReview
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
      title: '발표안 제안하기',
      intlKey: 'gnb.contribute.proposingATalk',
      link: paths.contribute.proposingATalk,
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
  // helpMenu,
  contributionMenu,
  sponsorMenu,
]
