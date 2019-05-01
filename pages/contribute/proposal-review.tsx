import { AlertBar } from 'components/atoms/AlertBar'
import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { FormNeedsLogin } from 'components/atoms/FormNeedsLogin'
import { IntlText } from 'components/atoms/IntlText'
import { Loading } from 'components/atoms/Loading'
import { StatusBar } from 'components/atoms/StatusBar'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { contributionMenu } from 'routes/paths'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
import { StoresType } from '../_app'

@inject('stores')
@observer
export default class ProposingATalk extends React.Component<{ stores: StoresType }> {
  state = {
    // todo : implement here
  }

  render() {
    const { authStore, scheduleStore } = this.props.stores
    const { presentationReviewStartAt, presentationReviewFinishAt } = scheduleStore.schedule

    return (
      <PageTemplate
        header={<Header title='발표 제안 검토하기 :: 파이콘 한국 2019' intlKey=''/>}
        footer={<Footer />}
      >
        <LocalNavigation list={contributionMenu.submenu} />
        <H1><IntlText intlKey='asdfasd'>
          발표 제안 검토하기
        </IntlText></H1>
        <StatusBar
          titleIntlKey='contribute.proposalReview.title'
          actionIntlKey='common.apply'
          openDate={presentationReviewStartAt}
          closeDate={presentationReviewFinishAt}
        />
         <Paragraph><IntlText intlKey='contribute.talkProposal.description1'>
           누구나 파이콘 한국 2019에 제출된 발표 제안 내용들을 검토하고 의견을 남겨주실 수 있습니다.
           여러분의 손으로 풍성한 파이콘 한국을 만들어주세요 :)
        </IntlText></Paragraph>

        <Section>
          <H2><IntlText intlKey='common.schedule'>일정</IntlText></H2>
          <Paragraph><IntlText intlKey='asldfkjasldkj'>
            {`${formatDateInWordsWithWeekdayAndTime(presentationReviewStartAt)}
            - ${formatDateInWordsWithWeekdayAndTime(presentationReviewFinishAt)}`}
          </IntlText></Paragraph>
        </Section>

        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><IntlText intlKey='asdfasdfasdf'>program@pycon.kr</IntlText></Paragraph>
        </Section>

        <Section>
          <H2>
            <IntlText intlKey='contribute.talkProposal.application.title'>검토 참여하기</IntlText>
          </H2>
          <AlertBar text='선택한 카테고리들에 속한 7개의 발표 제안을 검토합니다.' />
          <AlertBar text='파이콘 한국 행동강령에 위배되는 의견은 반영되지 않습니다. 주의해주세요.' />
          {this.props.stores.authStore.isInitialized
            ? authStore.loggedIn
              ? <div>Review Form</div>
              : <FormNeedsLogin />
            : <Loading width={50} height={50}/>
          }
        </Section>
      </PageTemplate>
    )
  }
}
