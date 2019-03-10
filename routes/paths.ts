export const paths = {
  home: '/',
  help: {
    faq: '/help/faq',
    notice: '/help/notice',
    venue: '/help/venue',
  },
  contribute: {
    overview: '/contribute/overview',
    recommendingAKeynoteSpeaker: '/contribute/recommending-a-keynote-speaker',
    cfpDetailedGuide: '/contribute/cfp-detailed-guide',
    proposingATalk: '/contribute/proposing-a-talk',
    proposingASprint: '/contribute/proposing-a-sprint',
    proposingATutorial: '/contribute/proposing-a-tutorial'
  },
  sponsor: {
    prospectus: '/sponsor/prospectus',
    applicationForm: '/sponsor/application-form'
  },
  account: {
    login: '/account/login',
    profile: '/account/profile',
    contribution: '/account/contribution',
  }
}

export const contributionMenu = [
  {
    title: '공헌 안내',
    intlKey: 'gnb.contribute.overview',
    link: paths.contribute.overview,
  },
  {
    title: '키노트 연사 추천하기',
    intlKey: 'gnb.contribute.recommendKeynoteSpeaker',
    link: paths.contribute.recommendingAKeynoteSpeaker
  },
  {
    title: '발표안 작성 가이드',
    intlKey: 'gnb.contribute.cfpDetailedGuide',
    link: paths.contribute.cfpDetailedGuide,
  },
  // {
  //   title: '발표안 제안하기',
  //   intlKey: 'gnb.contribute.proposingATalk',
  //   link: paths.contribute.proposingATalk,
  // },
]

export const sponsorMenu = [{
  title: '후원사 안내',
  intlKey: 'gnb.sponsor.prospectus',
  link: paths.sponsor.prospectus,
}]
