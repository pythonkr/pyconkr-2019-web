import { H1, H2, Ul, Li, Paragraph, Section } from 'components/atoms/ContentWrappers'
import styled from '@emotion/styled'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { StoresType } from '../_app'
import i18next from 'i18next'
import { withNamespaces } from '../../i18n'
import Link from 'next/link'

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

@inject('stores')
@observer
export class Volunteer extends React.Component<PropsType> {
  async componentDidMount() {
  }
  render() {
    const { stores, t } = this.props
    return (
      <PageTemplate
        header={<Header title={t('sponsor:volunteer.pageTitle')} intlKey='' />}
        footer={<Footer />}
      >
        <H1>
          {t('sponsor:volunteer.title')}
        </H1>
        <Section>
          <Paragraph>
            라이트닝 토크는 그날의 프로그램이 모두 끝나고, 모든 참석자가 모여 5분 이내의 가벼운 이야기를 하는 행사입니다. 라이트닝 토크는 아래와 같은 주제로 이야기됩니다!
          </Paragraph>
          <Ul>
            <Li>컨퍼런스에서 발표하기엔 너무 부담스럽지만 그래도 공유해보고 싶은 이야기들</Li>
            <Li>IT와 관련된 재미난 경험들</Li>
            <Li>그냥 뭔가 대나무숲처럼 다 말해버리고 싶은 하소연들</Li>
            <Li>그 외 뭐든 사람들과 나누고 싶은 이야기들</Li>
          </Ul>
          <Paragraph>
            모든 이야기는 5분이라는 시간동안만 이야기할 수 있습니다! (정말입니다. 5분 넘으면 마이크를 잔인하게 뺏어갑니다.)
          </Paragraph>
        </Section>

        <Section>
          <Paragraph>
            이전 라이트닝 토크는 어떤것이 있는지 궁금하시다면 아래 링크로 확인해보세요!
          </Paragraph>
          <Ul>
            <Li>파이콘 2014 : <a href='https://www.pycon.kr/2014/program/22' target='_blank'>https://www.pycon.kr/2014/program/22</a></Li>
            <Li>파이콘 2015 1일차 : <a href='https://www.pycon.kr/2015/program/77' target='_blank'>https://www.pycon.kr/2015/program/77</a></Li>
            <Li>파이콘 2015 2일차 : <a href='https://www.pycon.kr/2015/program/78' target='_blank'>https://www.pycon.kr/2015/program/78</a></Li>
            <Li>파이콘 APAC 2016 : <a href='https://www.pycon.kr/2016apac/program/lightning_talk/' target='_blank'>https://www.pycon.kr/2016apac/program/lightning_talk/</a></Li>
            <Li>파이콘 2017 : <a href='https://www.pycon.kr/2017/program/lightning_talk' target='_blank'>https://www.pycon.kr/2017/program/lightning_talk</a></Li>
            <Li>파이콘 2018 : <a href='https://archive.pycon.kr/2018/program/lightning_talk/' target='_blank'>https://archive.pycon.kr/2018/program/lightning_talk/</a></Li>
            
          </Ul>
          <Paragraph>
            라이트닝 토크 주제는 파이콘 행사에 임박해서 모집할 예정입니다. 여러분들의 재미나고 신기하고 색다른 경험을 들려주세요!!!
          </Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['sponsor'])(Volunteer)
