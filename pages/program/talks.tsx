import { H1, H2, Ul, Li, Paragraph, Section } from 'components/atoms/ContentWrappers'
import ContributionTableRow from 'components/molecules/ContributionTableRow'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import DefaultTable, { Contribution } from 'components/organisms/DefaultTable'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { contributionMenu, paths } from 'routes/paths'
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
export class TalkList extends React.Component<PropsType> {
  state = {
    presentationGroupByCategories: []
  }
  async componentDidMount() {
    const { stores } = this.props
    const presentations = await stores.cfpStore.retrievePresentations()
    this.setState({
      'presentationGroupByCategories': _.chain(presentations).groupBy('category.name').toPairs().value()
    })
  }
  render() {
    const { stores, t } = this.props

    
    return (
      <PageTemplate
        header={<Header title={t('program:talks.pageTitle')} intlKey='' />}
        footer={<Footer />}
      >
        <H1>
          {t('program:talks.title')}
        </H1>
        {
          this.state.presentationGroupByCategories.map(group => {
            return (
              <Section key={ group[0] }>
                <H2>{ group[0] }</H2>
                <Ul>
                  {
                    group[1].map(presentation => {
                      return (
                        <Li key={presentation.id}> 
                          <Link href={`${paths.program.talkDetail}?id=${presentation.id}`}>
                            { presentation.name }
                          </Link>
                        </Li>
                      )
                    })
                  }
                </Ul>
              </Section>
            )
          })
        }
        
        
      </PageTemplate>
    )
  }
}

export default withNamespaces(['program'])(TalkList)
