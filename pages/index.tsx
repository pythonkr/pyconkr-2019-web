import styled from '@emotion/styled'
import { Button, StyledA } from 'components/atoms/Button'
import { ContentWidthWrapper } from 'components/atoms/ContentWidthWrapper'
import { Li, Ul } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { Loading } from 'components/atoms/Loading'
import { MainBannerSvg, MainBannerSvgCompact } from 'components/atoms/SVG'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import SponsorBanners from 'components/organisms/SponsorBanners'
import gql from 'graphql-tag'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { Query } from 'react-apollo'
import { paths } from 'routes/paths'
import { BG_GRAY, CORAL, HEADING_LIGHT_BLACK, TEAL } from 'styles/colors'
import {
  contentWidth,
  contentWidthPadding,
  mobileWidth,
  wideContentWidth
} from 'styles/layout'
import { PageDefaultPropsType } from 'types/PageDefaultPropsType'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
import { withNamespaces } from '../i18n'

const NOTICES = gql`
query Notices {
  notices {
    id
    title
    link
    publishedAt
  }
}
`

const BannerSection = styled.section`
  height: 65vw;
  max-height: 560px;
  background-color: ${CORAL};
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    height: auto;
    max-height: none;
    align-items: center;
    flex-direction: column;
    padding: 30px 0;
    justify-content: flex-start;
  }
`
const MainBannerSvgWrapper = styled.div`
  padding: 0;
  width: 100%;
  margin-left: 5%;
  pointer-events: none;
  position: relative;
  svg {
    height: 100%;
    width: auto;
  }
  @media (max-width: 500px) {
    display: none;
    margin: 0;
  }
`
const MainBannerSvgWrapperCompact = styled.div`
  padding: 0;
  width: 95%;
  pointer-events: none;
  svg {
    height: auto;
    width: 100%;
  }
  @media (min-width: 500px) {
    display: none;
  }
`
const MainBannerInfoWrapper = styled.div`
  position: absolute;
  right: 10%;
  color: white;
  h1,
  p {
    margin: 20px 0;
  }
  h1 {
    font-weight: 700;
    font-size: 1.4em;
    margin-top: 5.5em;
  }
  p {
    font-size: 1.1em;
    line-height: 1.6em;
  }
  @media (max-width: 500px) {
    position: initial;
  }
`
const ScheduleSection = styled.section`
  max-width: ${wideContentWidth};
  margin: 0 auto;
  padding: 128px ${contentWidthPadding} 116px;

  @media (max-width: 920px) {
    max-width: ${contentWidth};
  }

  ul {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
    @media (max-width: 920px) {
      display: block;
    }
  }

  li {
    width: 281px;
    @media (max-width: 920px) {
      width: auto;
      padding-bottom: 40px;
      margin-bottom: 58px;
      border-bottom: solid 1px ${CORAL};
      &:last-of-type {
        border: none;
        padding-bottom: 0;
      }
    }
  }

  li > h2 {
    font-size: 30px;
    line-height: 39px;
    font-weight: bold;
    color: ${TEAL};
    @media (max-width: ${mobileWidth}) {
      font-size: 28px;
      line-height: 36px;
    }
  }
  li > h3 {
    display: inline-block;
    margin-top: 10px;
    font-size: 20px;
    line-height: 39px;
    font-weight: bold;
    color: ${HEADING_LIGHT_BLACK};
    @media (max-width: ${mobileWidth}) {
      font-size: 18px;
      line-height: 32px;
    }
  }
  li > p {
    max-width: 85%;
    font-size: 15px;
    line-height: 1.8;
    @media (max-width: 920px) {
      margin-top: 16px;
      font-size: 16px;
      line-height: 1.9em;
      max-width: none;
    }
  }
  li > span {
    font-size: 20px;
    line-height: 39px;
    font-weight: bold;
    color: ${BG_GRAY};
    @media (max-width: ${mobileWidth}) {
      font-size: 18px;
      line-height: 32px;
    }
    &:before {
      display: inline-block;
      content: "✦";
      font-size: 10px;
      vertical-align: middle;
      margin: -5px 6px 0;
    }
  }
  li > hr {
    height: 1px;
    margin: 10px 0 17px 0;
    border: none;
    background: #fcb5b5;
    @media (max-width: 920px) {
      display: none;
    }
  }
  ${StyledA} {
    margin: 10px 0 4px;
    @media (max-width: 920px) {
      width: 52%;
      height: 54px;
      margin: 10px 0 6px;
    }
    @media (max-width: ${mobileWidth}) {
      width: 100%;
    }
  }
`
const ScheduleButtonsWrapper = styled.p`
  margin: 22px 0;
  @media (max-width: 920px) {
    margin: 30px 0;
  }
`
const SponsorComingSoonBadge = styled.div`
  font-family: "Sriracha", cursive;
  text-align: center;
  color: ${CORAL};
  font-size: 24px;
  margin-bottom: 20px;
  span {
    font-size: 12px;
    vertical-align: middle;
  }
  @media (max-width: ${mobileWidth}) {
    text-align: left;
  }
`
const NoticeSection = styled.section<{ backgroundColor: string }>`
  background-color: ${props => props.backgroundColor};
  padding: 86px 0;
  opacity: .9;
  h2 {
    font-size: 36px;
    line-height: 1.4;
    font-weight: bold;
    text-align: center;
    color: #4a4a4a;
    max-width: 400px;
    margin: 0 auto;
    @media (max-width: ${mobileWidth}) {
      width: auto;
      margin: 0;
      text-align: left;
      font-size: 34px;
    }
  }
  p {
    margin: 20px 0 63px;
    font-size: 17px;
    line-height: 1.9em;
    @media (max-width: ${mobileWidth}) {
      font-size: 16px;
    }
  }
  p + p {
    margin: 20px 0 63px;
    @media (max-width: ${mobileWidth}) {
      margin-bottom: 40px;
    }
  }
  ${StyledA} {
    @media (max-width: ${mobileWidth}) {
      width: 100%;
    }
  }
`

// const NoticeSection = styled.section`
//   background-color: #0584870f;
//   padding: 60px 20px;
//   h2 {
//     font-size: 26px;
//     line-height: 1.4;
//     font-weight: bold;
//     text-align: center;
//     color: #4a4a4a;
//     max-width: 400px;
//     margin: 0 auto;
//   }

//   ul {
//     padding: 0 20%;

//     li {
//       margin: 20px 10px;
//     }

//     li:before {
//       content: "📍";
//     }
//   }

//   @media (max-width: ${mobileWidth}) {
//     h2 {
//       width: auto;
//       margin: 0;
//       text-align: left;
//       font-size: 21px;
//     }

//     ul {
//       padding: 0 5%
//     }
//   }
// `
const IntroduceSection = styled.section`
  padding: 155px 0 171px 0;
  h2 {
    font-size: 26px;
    font-weight: bold;
    line-height: 1.6;
    color: ${TEAL};
    @media (max-width: ${mobileWidth}) {
      font-size: 28px;
      line-height: 36px;
    }
  }
  p {
    font-size: 17px;
    line-height: 1.9em;
    margin-top: 30px;
    @media (max-width: ${mobileWidth}) {
      font-size: 16px;
    }
  }
  p + p {
    margin-top: 20px;
  }
  hr {
    border: none;
    height: 1px;
    background: ${CORAL};
    width: 100%;
    margin: 40px auto 58px;
  }
`

@inject('stores')
@observer
class Index extends React.Component<PageDefaultPropsType> {

  static async getInitialProps() {
    return {
      namespacesRequired: ['home', 'account', 'contribute'],
    }
  }

  render() {
    const { stores, t } = this.props
    const { schedule } = stores.scheduleStore

    return (
      <>
        <Header title='파이콘 한국 2019' intlKey='constant.pyconKorea.name' />
        <BannerSection>
          <MainBannerSvgWrapper>
            <MainBannerSvg color='white' />
          </MainBannerSvgWrapper>
          <MainBannerSvgWrapperCompact>
            <MainBannerSvgCompact color='white' />
          </MainBannerSvgWrapperCompact>
          <MainBannerInfoWrapper>
            <h1>
              <IntlText intlKey='constant.pyconKorea.name'>
                파이콘 한국 2019
              </IntlText>
            </h1>
            <p>
              <IntlText intlKey='constant.pyconKorea.venue'>
                코엑스 그랜드볼룸, 서울
              </IntlText>
              <br />
              <IntlText intlKey='constant.pyconKorea.schedule'>
                2019.08.15(목)-18(일)
              </IntlText>
            </p>
            <p>
              <strong style={{ fontWeight: 'bold' }}>
                {`${formatDateInWordsWithWeekdayAndTime(schedule.earlybirdTicketStartAt)} `}
              </strong>
              <IntlText intlKey='constant.pyconKorea.earlybirdTicketOpen'>얼리버드 티켓 오픈</IntlText>
              <br />
              <strong style={{ fontWeight: 'bold' }}>
                {`${formatDateInWordsWithWeekdayAndTime(schedule.conferenceTicketStartAt)} `}
              </strong>
              <IntlText intlKey='constant.pyconKorea.generalTicketOpen'>일반 티켓 오픈</IntlText>
            </p>
          </MainBannerInfoWrapper>
        </BannerSection>
        {/* <NoticeSection>
          <h2>
            Notice 🗣
          </h2>
          <ul>
            <Query query={NOTICES}>
              {({ loading, error, data }) => {
                if (loading) return (<Loading width={50} height={50}/>)
                return (
                  data.notices.map((notice) => {
                    return (
                      <li key={notice.id}>
                        <a href={notice.link}>
                          {notice.title}
                        </a>
                      </li>
                    )
                  })
                )
              }}
            </Query>
          </ul>
        </NoticeSection> */}
        <NoticeSection backgroundColor='rgba(5, 132, 135, 0.06)'>
          <ContentWidthWrapper>
            <h2>
              {t('home:notice.title')}
            </h2>
            <Ul>
              <Query query={NOTICES}>
                {({ loading, error, data }) => {
                  if (loading) return (<Loading width={50} height={50} />)

                  return (
                    data.notices.map((notice) => {
                      return (
                        <Li key={notice.id} style={{ fontSize: '1.1em' }}>
                          <a href={notice.link}>
                            {notice.title}
                          </a>
                        </Li>
                      )
                    })
                  )
                }}
              </Query>
            </Ul>
          </ContentWidthWrapper>
        </NoticeSection>
        <ScheduleSection>
          <ul>
            <li>
              <h2>
                <IntlText intlKey='constant.pyconKorea.sprint.name'>
                  스프린트
                </IntlText>
              </h2>
              <h3>
                <IntlText intlKey='constant.pyconKorea.sprint.schedule'>
                  8월 15-16일
                </IntlText>
              </h3>
              <span>
                <IntlText intlKey='constant.pyconKorea.sprint.dayofweek'>
                  목-금
                </IntlText>
              </span>
              <hr />
              <p>
                <IntlText intlKey='home.sprintDescription'>
                  관심있는 오픈소스 프로젝트를 같은 장소에 모여 집중적으로
                  배우고 개발하는 자리입니다. 새로운 동료를 만나고, 오픈소스에서
                  얻을 수 있는 경험과 지식을 나눌 수 있습니다.
                </IntlText>
              </p>
            </li>
            <li>
              <h2>
                <IntlText intlKey='constant.pyconKorea.tutorial.name'>
                  튜토리얼
                </IntlText>
              </h2>
              <h3>
                <IntlText intlKey='constant.pyconKorea.tutorial.schedule'>
                  8월 15-16일
                </IntlText>
              </h3>
              <span>
                <IntlText intlKey='constant.pyconKorea.tutorial.dayofweek'>
                  목-금
                </IntlText>
              </span>
              <hr />
              <p>
                <IntlText intlKey='home.tutorialDescription'>
                  초보자들 또는 새로운 것을 접하는 사람들을 위해
                  진행하는 교육 프로그램입니다.
                </IntlText>
              </p>
              <ScheduleButtonsWrapper>
                {/* <Button
                  intlKey='gnb.contribute.proposingATutorial'
                  to={paths.contribute.proposingATutorial}
                  fontSize={14}
                >
                  튜토리얼 제안하기
                </Button> */}
              </ScheduleButtonsWrapper>
            </li>
            <li>
              <h2>
                <IntlText intlKey='constant.pyconKorea.conference.name'>
                  컨퍼런스
                </IntlText>
              </h2>
              <h3>
                <IntlText intlKey='constant.pyconKorea.conference.schedule'>
                  8월 17-18일
                </IntlText>
              </h3>
              <span>
                <IntlText intlKey='constant.pyconKorea.conference.dayofweek'>
                  토-일
                </IntlText>
              </span>
              <hr />
              <p>
                <IntlText intlKey='home.conferenceDescription'>
                  파이썬 사용 사례와 지식을 공유하는 50여 개의 다양한 발표 세션이
                  열립니다. 또 후원 기업 부스와 영코더, 라이트닝 토크, 열린공간
                  등 다양한 이벤트를 통해 다양한 참가자와 교류할 수 있습니다.
                </IntlText>
              </p>
              <ScheduleButtonsWrapper>
                {/* <Button
                  intlKey='gnb.contribute.recommendKeynoteSpeaker'
                  to={paths.contribute.recommendingAKeynoteSpeaker}
                  fontSize={14}
                >
                  키노트 연사 추천하기
                </Button> */}
                {/* <Button
                  primary={false}
                  intlKey='gnb.contribute.proposingATalk'
                  to={paths.contribute.proposingATalk}
                  fontSize={14}
                >
                  발표안 제안하기
                </Button> */}
                {/* <Button
                  primary={false}
                  intlKey='gnb.contribute.proposalReview'
                  to={paths.contribute.proposalReview}
                  fontSize={14}
                >
                  발표 제안 검토하기
                </Button> */}
              </ScheduleButtonsWrapper>
            </li>
          </ul>
        </ScheduleSection>
        <NoticeSection backgroundColor='#fde5e3'>
          <ContentWidthWrapper>
            {/* <SponsorComingSoonBadge>
              <span>✦</span> Coming Soon <span>✦</span>
            </SponsorComingSoonBadge>
            <h2>
              <IntlText intlKey='home.sponsor.title'>
                파이콘 한국 2019 후원사
              </IntlText>
            </h2>
            <p>
              <IntlText intlKey='home.sponsor.description1'>
                파이콘 한국은 오픈소스 및 파이썬 커뮤니티의 중요성에 공감하는
                후원사들의 감사한 지원 덕분에 비디오 녹화, 티켓 가격 지원 등 더
                많은 개발자들이 참여할 수 있는 행사를 만들어 왔습니다.
              </IntlText>
            </p>
            <p>
              <IntlText intlKey='home.sponsor.description2'>
                파이콘 후원을 통해 파이썬 커뮤니티의 성장을 지원하고 파이콘 한국
                2019의 공식 후원사로서의 특별한 가치를 갖는 데에 관심이 있는
                후원사를 모십니다.
              </IntlText>
            </p>
            <div style={{ textAlign: 'center' }}>
              <Button
                intlKey='home.sponsor.prospectus'
                to={paths.sponsor.prospectus}
                size='big'
              >
                자세한 후원 안내 보기
              </Button>
            </div> */}
            <h2 style={{ maxWidth: '800px' }}>
              {t('contribute:staff.pyconKoreaOrganizer.title')}
            </h2>
            <p>
              {t('contribute:staff.pyconKoreaOrganizer.desc')}
            </p>
            <div style={{ textAlign: 'center' }}>
              <Button
                intlKey='common.more'
                to={paths.contribute.staff}
                size='big'
              >
                자세히 보기
              </Button>
            </div>
          </ContentWidthWrapper>
        </NoticeSection>
        <IntroduceSection>
          <ContentWidthWrapper>
            <h2>
              <IntlText intlKey='home.pyconKoreaTitle'>
                파이콘 한국이란
              </IntlText>
            </h2>
            <p>
              <IntlText intlKey='home.pyconKoreaDescription'>
                파이콘은 세계 각국의 파이썬 프로그래밍 언어 커뮤니티에서
                주관하는 비영리 컨퍼런스입니다. 한국에서는 처음으로 열린 파이콘
                한국 2014를 시작으로 파이콘 한국 준비위원회는 건강한 국내 파이썬
                생태계에 지속적인 보탬이 되고자, 커뮤니티 멤버들의 자발적인
                봉사로 운영되고 있습니다.
              </IntlText>
            </p>
            <hr />
            <h2>CONNECT THE PYTHONISTAS</h2>
            <p>
              <IntlText intlKey='home.sloganDescription1'>
                파이콘 한국 2019의 슬로건은 "Connect the Pythonistas"입니다.
              </IntlText>
            </p>
            <p>
              <IntlText intlKey='home.sloganDescription2'>
                파이콘은 파이썬을 쓰는 이들의 만남의 장이 되기도, 또 다른 언어,
                커뮤니티와의 접점이 되기도 합니다. 파이콘에서 당신은 한 분야를
                아주 깊게 연구한 사람을 만날 수도, 완전히 다른 분야의
                파이써니스타를 만날 수도, 친한 동료를 만날 수도 있을 것입니다.
              </IntlText>
            </p>
            <p>
              <IntlText intlKey='home.sloganDescription3'>
                우리는 파이콘을 통해, 방향과 분야가 숱하게 흩어져 각기 다른
                점으로 존재하는 파이써니스타들이 모여 아름다운 별자리가 되기를
                바랍니다. 2019년에도 우리, 파이콘에서 만나요.
              </IntlText>
            </p>
            <hr />
            <h2>
              <IntlText intlKey='home.differenceWithOthers.title'>
                파이콘은 다른 개발자 행사와 무엇이 다른가요?
              </IntlText>
            </h2>
            <p>
              <IntlText intlKey='home.differenceWithOthers.description'>
                파이콘 한국은 커뮤니티 주관으로 이뤄지는 비영리 개발자 대상
                행사로, 타 기업 및 기관에서 개최하는 개발자 행사와는 성격이
                다릅니다. 발표자와 튜토리얼 진행자를 포함하여, 자원봉사자와
                준비위원회 담당자 등 모든 인원이 금전적 이득 없이 순수히
                오픈소스 프로그래밍 언어인 파이썬의 저변 확대와 커뮤니티
                활성화를 위해 진행하는 행사입니다.
              </IntlText>
            </p>
          </ContentWidthWrapper>
        </IntroduceSection>
        <ContentWidthWrapper>
          <SponsorBanners />
        </ContentWidthWrapper>
        <Footer />
      </>
    )
  }
}

export default withNamespaces(['home', 'account', 'contribute'])(Index)
