import { H1 } from 'components/atoms/H1'
import { H2 } from 'components/atoms/H2'
import { H3 } from 'components/atoms/H3'
import { Paragraph } from 'components/atoms/Paragraph'
import { Span } from 'components/atoms/Span'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import { injectGlobal } from 'emotion'
import emotionReset from 'emotion-reset'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'
import { parse } from 'qs'
import React from 'react'
import intl from 'react-intl-universal'
import { commonCSS } from 'styles/common'
import { fontCSS } from 'styles/font'
import { homeCSS } from 'styles/home'
import { StoresType } from './_app'

injectGlobal`
  ${emotionReset}
  ${fontCSS}
  ${commonCSS}
  ${homeCSS}
`
@inject('stores')
@observer
class Index extends React.Component<{ stores: StoresType }> {
  async componentDidMount() {
    this.handleOAuthCallback()

  }

  async handleOAuthCallback() {
    const { stores } = this.props
    if (location.search.indexOf('code') === -1) return
    const { state, code } = parse(location.search, { ignoreQueryPrefix: true })
    await stores.authStore.login(state, code)
    Router.push('/')
  }

  render() {
    return (
      <>
        <Header title='파이콘 한국 2019' />
        <section>
          <H1 intlKey='constant.pyconKorea.name'>파이콘 한국 2019</H1>
          <H3 intlKey='constant.pyconKorea.schedule'>2019.08.15(수)-18(일)</H3>
          <H3 intlKey='constant.pyconKorea.venue'>코엑스 그랜드볼룸, 서울</H3>
        </section>
        <section className={'schedule'}>
          <ul>
            <li>
              <H2 intlKey='constant.pyconKorea.sprint.name'>스프린트</H2>
              <H3 intlKey='constant.pyconKorea.sprint.schedule'>8월 15-16일</H3>
              <Span intlKey='constant.pyconKorea.sprint.dayofweek'>&nbsp;+&nbsp;목-금</Span>
              <hr />
              <Paragraph intlKey='home.sprintDescription'>
                관심있는 오픈소스 프로젝트를 같은 장소에 모여 집중적으로 배우고 개발하는 자리입니다.
                새로운 동료를 만나고, 오픈소스에서 얻을 수 있는 경험과 지식을 나눌 수 있습니다.
              </Paragraph>
            </li>
            <li>
              <H2 intlKey='constant.pyconKorea.tutorial.name'>튜토리얼</H2>
              <H3 intlKey='constant.pyconKorea.tutorial.schedule'>8월 16일</H3>
              <Span intlKey='constant.pyconKorea.tutorial.dayofweek'>&nbsp;+&nbsp;금</Span>
              <hr />
              <Paragraph intlKey='home.tutorialDescription'>
                초보자들을 위해, 또는 새로운 것을 접하는 사람들을 위해 진행하는
                교육 프로그램입니다.
              </Paragraph>
            </li>
            <li>
              <H2 intlKey='constant.pyconKorea.conference.name'>컨퍼런스</H2>
              <H3 intlKey='constant.pyconKorea.conference.schedule'>8월 17-18일</H3>
              <Span intlKey='constant.pyconKorea.conference.dayofweek'>&nbsp;+&nbsp;토-일</Span>
              <hr />
              <Paragraph intlKey='home.conferenceDescription'>
                파이썬 사용 사례와 지식을 공유하는 50여개의 다양한 발표 세션이 열립니다.
                또 후원 기업 부스와 영코더, 라이트닝 토크, 열린 공간 등 다양한 이벤트를 통해
                다양한 참가자와 교류할 수 있습니다.
              </Paragraph>
              <button className='support'>
                {intl.get('gnb.contribute.proposingATalk')
                  .defaultMessage('발표안 제안하기')}
              </button>
            </li>
          </ul>
        </section>
        <section className='sponser'>
          <H2 intlKey='home.sponsor.title'>
            파이콘 한국 2019 후원사 (모집 예정)
          </H2>
          <Paragraph intlKey='home.sponsor.description'>
            파이콘 한국은 오픈소스 및 파이썬 커뮤니티의 중요성에 공감하는 후원사들의 감사한 지원 덕분에
            비디오 녹화, 티켓 가격 지원 등 더 많은 개발자들이 참여할 수 있는 행사를 만들어 왔습니다.
            파이콘 후원을 통해 파이썬 커뮤니티의 성장을 지원하고 파이콘 한국 2019의 공식 후원사로서의
            특별한 가치를 갖는 데 관심이 있는 후원사를 모십니다.
          </Paragraph>
          <button>
            {intl.get('home.sponsor.prospectus')
              .defaultMessage('후원 모집 일정 및 안내 보기')}
          </button>
        </section>
        <section className='introduce'>
          <H2 intlKey='constant.pyconKorea.nameOnly'>파이콘 한국</H2>
          <Paragraph intlKey='home.pyconKoreaDescription'>
            파이콘은 세계 각국의 파이썬 프로그래밍 언어 커뮤니티에서 주관하는 비영리 컨퍼런스입니다.
            한국에서는 처음으로 열린 파이콘 한국 2014를 시작으로 파이콘 한국 준비위원회는
            건강한 국내 파이썬 생태계에 지속적인 보탬이 되고자,
            커뮤니티 멤버들의 자발적인 봉사로 운영되고 있습니다.
          </Paragraph>
          <hr />
          <h2>CONNECT THE PYTHONISTAS</h2>
          <Paragraph intlKey='home.sloganDescription'>
            파이콘 한국 2019의 슬로건은 "Connect the Pythonistas"입니다.
          </Paragraph>
          <Paragraph intlKey='home.sloganDescription'>
            파이콘은 파이썬을 쓰는 이들의 만남의 장이 되기도, 또 다른 언어, 커뮤니티와의 접점이 되기도 합니다.
            파이콘에서 당신은 한 분야를 아주 깊게 연구한 사람을 만날 수도,
            완전히 다른 분야의 파이써니스타를 만날 수도, 친한 동료를 만날 수도 있을 것입니다.
          </Paragraph>
          <Paragraph intlKey='home.sloganDescription'>
            우리는 파이콘을 통해, 방향과 분야가 숱하게 흩어져 각기 다른 점으로 존재하는 파이써니스타들이 모여
            아름다운 별자리가 되기를 바랍니다. 2019년에도 우리, 파이콘에서 만나요.
          </Paragraph>
          <hr />
          <H2 intlKey='home.differenceWithOthers.title'>
            파이콘은 다른 개발자 행사와 무엇이 다른가요?
          </H2>
          <Paragraph intlKey='home.differenceWithOthers.description'>
            파이콘 한국은 커뮤니티 주관으로 이뤄지는 비영리 개발자 대상 행사로,
            타 기업 및 기관에서 개최하는 개발자 행사와는 성격이 다릅니다.
            발표자와 튜토리얼 진행자를 포함하여, 자원 봉사자와 준비위원회 담당자 등 모든 인원이
            금전적 이득 없이 순수히 오픈소스 프로그래밍 언어인 파이썬의 저변 확대와
            커뮤니티 활성화를 위해 진행하는 행사입니다.
          </Paragraph>
        </section>
        <Footer />
      </>
    )
  }
}

export default Index
