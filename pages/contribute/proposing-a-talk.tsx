import { H1 } from 'components/atoms/H1'
import { H2 } from 'components/atoms/H2'
import { Paragraph } from 'components/atoms/Paragraph'
import Stage1 from 'components/organisms/CFPForm/Stage1'
import Stage2 from 'components/organisms/CFPForm/Stage2'
import Stage3 from 'components/organisms/CFPForm/Stage3'
import Stage4 from 'components/organisms/CFPForm/Stage4'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { CFPFormStage } from 'lib/stores/CFPStore'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { StoresType } from '../_app'

@inject('stores')
@observer
export default class ProposingATalk extends React.Component<{ stores: StoresType }> {
  render() {
    const { stores } = this.props
    const { currentStage } = toJS(stores.cfpStore)

    return (
      <PageTemplate
        header={<Header title='발표안 제안하기 :: 파이콘 한국 2019' />}
        footer={<Footer />}
      >
        <H1 intlKey='contribute.overview.title'>
          발표안 제안하기
          </H1>
        {/* Status Bar */}
        <Paragraph>
          파이썬에 대한 학술적 또는 상업적 프로젝트, 케이스 스터디 등 다양한 파이썬 관련 발표를 아래와 같은 일정으로 모집합니다.
          자세한 내용은 발표안 작성 가이드를 참고해주세요.
          </Paragraph>
        <section>
          <H2 intlKey='aaa'>세부 일정</H2>
          {/* 일정 테이블  */}
        </section>
        <section>
          <H2 intlKey='bbb'>문의</H2>
          <Paragraph>program@pycon.kr</Paragraph>
        </section>
        <section>
          <H2 intlKey='ccc'>제안서 작성</H2>
          {(currentStage === CFPFormStage.stage1) && <Stage1 stores={stores} />}
          {(currentStage === CFPFormStage.stage2) && <Stage2 stores={stores} />}
          {(currentStage === CFPFormStage.stage3) && <Stage3 stores={stores} />}
          {(currentStage === CFPFormStage.stage4) && <Stage4 stores={stores} />}
          {(currentStage === CFPFormStage.completed) && <div>
            발표안을 제출했습니다! 호호호
            </div>}
        </section>
      </PageTemplate>
    )
  }
}
