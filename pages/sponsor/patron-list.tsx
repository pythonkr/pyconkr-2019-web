import { AlertBar } from 'components/atoms/AlertBar'
import { H1, Section } from 'components/atoms/ContentWrappers'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { observer } from 'mobx-react'
import React from 'react'
import { withNamespaces } from '../../i18n'
import { PageDefaultPropsType } from 'types/PageDefaultPropsType'

@observer
export class PatronList extends React.Component<PageDefaultPropsType> {
  async componentDidMount() {
  }

  render() {
    const {t} = this.props

    return (
      <PageTemplate
        header={<Header title={t('sponsor:patron.headerTitle')}/>}
        footer={<Footer />}
      >
        <H1>{t('sponsor:patron.headerTitle')}</H1>
        <Section>
          <AlertBar text={t('sponsor:patron.waitingAlert')} />
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['sponsor'])(PatronList)
