import { H1 } from 'components/atoms/ContentWrappers'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import * as React from 'react'
import { withNamespaces } from '../../i18n'

type PropsType = {
    stores: StoresType;
    t: i18next.TFunction;
}

@inject('stores')
@observer
class Tickets extends React.Component<PropsType> {

    static async getInitialProps() {
        return {
            namespacesRequired: ['tickets'],
        }
    }

    render() {
        const { t, stores } = this.props

        return (
            <PageTemplate
                header={<Header title='파이콘 한국 티켓 종류 :: 파이콘 한국 2019' intlKey='sponsor.prospectus.pageTitle'/>}
                footer={<Footer />}
            >
            <H1>{t('tickets:title')}</H1>
            </PageTemplate>
        )
    }
}

export default withNamespaces(['tickets'])(Tickets)
