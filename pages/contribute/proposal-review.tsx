import { AlertBar } from 'components/atoms/AlertBar'
import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { FormNeedsLogin } from 'components/atoms/FormNeedsLogin'
import { Loading } from 'components/atoms/Loading'
import { StatusBar } from 'components/atoms/StatusBar'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import ProposalReviewForm from 'components/organisms/ProposalReviewForm'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { contributionMenu } from 'routes/paths'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
import { withNamespaces } from '../../i18n'
import { StoresType } from '../_app'

type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

@inject('stores')
@observer
export class ProposalReview extends React.Component<PropsType> {

  static async getInitialProps() {
    return {
      namespacesRequired: ['contribute'],
    }
  }

  renderProposalReviewForm () {
    const { stores } = this.props
    const isAuthStoreInitialized = stores.authStore.isInitialized
    const isLoggedIn = stores.authStore.loggedIn

    if (!isAuthStoreInitialized) {
      return <Loading width={50} height={50}/>
    }

    return isLoggedIn
      ? <ProposalReviewForm stores={stores} />
      : <FormNeedsLogin />
  }

  render() {
    const { stores, t } = this.props
    const { scheduleStore } = stores
    const { presentationReviewStartAt, presentationReviewFinishAt } = scheduleStore.schedule

    return (
      <PageTemplate
        header={<Header title='발표 제안 검토하기 :: 파이콘 한국 2019' intlKey=''/>}
        footer={<Footer />}
      >
        <LocalNavigation list={contributionMenu.submenu} />
        <H1>{t('contribute:proposalReview.title')}</H1>
        <StatusBar
          titleIntlKey='contribute.proposalReview.title'
          actionIntlKey='common.apply'
          openDate={presentationReviewStartAt}
          closeDate={presentationReviewFinishAt}
        />
         <Paragraph>
          {t('contribute:proposalReview.description')}
         </Paragraph>

        <Section>
          <H2>{t('common:schedule')}</H2>
          <Paragraph>
            {`${formatDateInWordsWithWeekdayAndTime(presentationReviewStartAt)} - ${formatDateInWordsWithWeekdayAndTime(presentationReviewFinishAt)}`}
          </Paragraph>
        </Section>

        <Section>
          <H2>{t('common:contact')}</H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>

        <Section>
          <H2>{t('contribute:proposalReview.review.title')}</H2>
          <AlertBar text={t('contribute:proposalReview.review.alert1')} />
          <AlertBar text={t('contribute:proposalReview.review.alert2')} />
          {this.renderProposalReviewForm()}
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['contribute'])(ProposalReview)
