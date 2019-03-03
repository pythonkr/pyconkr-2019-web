import intl from 'react-intl-universal';
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'
import { parse } from 'qs'
import React from 'react'
import { StoresType } from './_app';
import { H1 } from 'components/atoms/H1';
import { H2 } from 'components/atoms/H2';
import { H3 } from 'components/atoms/H3';
import { Paragraph } from 'components/atoms/Paragraph';

@inject('stores')
@observer
class Index extends React.Component<{stores: StoresType}> {
    async componentDidMount () {
      this.handleOAuthCallback()
      
    }

    async handleOAuthCallback () {
      const { stores } = this.props
      if (location.search.indexOf('code') === -1) return
      const { state, code } = parse(location.search, { ignoreQueryPrefix: true })
      await stores.authStore.login(state, code)
      Router.push('/')
    }

    render () {
      return (
        <PageTemplate
          header={<Header title='파이콘 한국 2019' />}
          footer={<Footer />}
        >
          <H1 intlKey='constant.pyconKorea.name'>파이콘 한국 2019</H1>
          <H3 intlKey='constant.pyconKorea.schedule'>2019.08.15(수)-18(일)</H3>
          <H3 intlKey='constant.pyconKorea.venue'>코엑스 그랜드볼룸, 서울</H3>

          <H2 intlKey='constant.pyconKorea.sprint.name'>스프린트</H2>
          <H3 intlKey='constant.pyconKorea.sprint.schedule'>8월 15-16일</H3>
          <H3 intlKey='constant.pyconKorea.sprint.dayofweek'>목-금</H3>
          <Paragraph intlKey='home.sprintDescription'>관심있는 오픈소스 프로젝트를 같은 장소에 모여 집중적으로 배우고 개발하는 자리입니다. 새로운 동료를 만나고, 오픈소스에서 얻을 수 있는 경험과 지식을 나눌 수 있습니다.</Paragraph>

          <H2 intlKey='constant.pyconKorea.tutorial.name'>튜토리얼</H2>
          <H3 intlKey='constant.pyconKorea.tutorial.schedule'>8월 16일</H3>
          <H3 intlKey='constant.pyconKorea.tutorial.dayofweek'>금</H3>
          <Paragraph intlKey='home.tutorialDescription'>초보자들을 위해, 또는 새로운 것을 접하는 사람들을 위해 진행하는 교육 프로그램입니다.</Paragraph>

          <H2 intlKey='constant.pyconKorea.conference.name'>컨퍼런스</H2>
          <H3 intlKey='constant.pyconKorea.conference.schedule'>8월 17-18일</H3>
          <H3 intlKey='constant.pyconKorea.conference.dayofweek'>토-일</H3>
          <Paragraph intlKey='home.conferenceDescription'>파이썬 사용 사례와 지식을 공유하는 50여개의 다양한 발표 세션이 열립니다. 또 후원 기업 부스와 영코더, 라이트닝  토크, 열린 공간 등 다양한 이벤트를 통해 다양한 참가자와 교류할 수 있습니다.</Paragraph>

          <button>
            { intl.get('gnb.contribute.proposingATalk').defaultMessage('발표안 제안하기') }
          </button>

          <H2 intlKey='home.sponsor.title'>파이콘 한국 2019 후원사 (모집 예정)</H2>
          <Paragraph intlKey='home.sponsor.description'>파이콘 한국은 오픈소스 및 파이썬 커뮤니티의 중요성에 공감하는 후원사들의 감사한 지원 덕분에 비디오 녹화, 티켓 가격 지원 등 더 많은 개발자들이 참여할 수 있는 행사를 만들어 왔습니다. 파이콘 후원을 통해 파이썬 커뮤니티의 성장을 지원하고 파이콘 한국 2019의 공식 후원사로서의 특별한 가치를 갖는 데 관심이 있는 후원사를 모십니다.</Paragraph>
          
          <button>
            { intl.get('home.sponsor.prospectus').defaultMessage('후원 모집 일정 및 안내 보기') }
          </button>

          <H2 intlKey='constant.pyconKorea.nameOnly'>파이콘 한국</H2>
          <Paragraph intlKey='home.pyconKoreaDescription'>home.pyconKoreaDescription</Paragraph>

          <h2>CONNECT THE PYTHONISTAS</h2>
          <Paragraph intlKey='home.sloganDescription'>home.sloganDescription</Paragraph>

          <H2 intlKey='home.differenceWithOthers.title'>파이콘은 다른 개발자 행사와 무엇이 다른가요?</H2>
          <Paragraph intlKey='home.differenceWithOthers.description'>home.differenceWithOthers.description</Paragraph>
        </PageTemplate>
      )
    }
}

export default Index
