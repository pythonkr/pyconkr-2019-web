
import { H1, Paragraph } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import MyContribution from 'components/organisms/MyContribution'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import { RouterProps, withRouter } from 'next/router'
import React from 'react'
import { withNamespaces } from '../../i18n'
import { StoresType } from '../_app'

type PropsType = {
    stores: StoresType;
    router: RouterProps;
}

@inject('stores')
@(withRouter as any)
@observer
class Contribution extends React.Component<PropsType> {

  static async getInitialProps() {
    return {
      namespacesRequired: ['account'],
    }
  }
  async componentDidMount() {
    const { stores } = this.props

    if (!stores.cfpStore.isInitialized) await stores.cfpStore.initialize()
    if (!stores.sponsorStore.isInitialized) await stores.sponsorStore.initialize()
    if (!stores.scheduleStore.isInitialized) await stores.scheduleStore.initialize()
  }

  render() {
    const { stores } = this.props

    return (
      <PageTemplate
        header={<Header title='제안 및 신청 내역 :: 파이콘 한국 2019' intlKey='contribution.pageTitle'/>}
        footer={<Footer />}
      >
        <H1>
          <IntlText intlKey='contribution.title'>제안 및 신청 내역</IntlText>
        </H1>
        <Paragraph intlKey='contribution.paragraph'>
          파이콘 한국 2019 에 제안 또는 신청한 내역입니다.<br/>
          파이콘 한국 준비위원회 내부 검토 이후 최종 확정 등의 절차 관련 내용은 메일로 다시 안내드리도록 하겠습니다.
        </Paragraph>
        <MyContribution stores={stores} />
      </PageTemplate>
    )
  }
}

export default withNamespaces('account')(Contribution)
