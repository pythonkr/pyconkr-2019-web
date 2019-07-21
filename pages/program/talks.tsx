import { H1, Section } from 'components/atoms/ContentWrappers'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import { CategoryTitleDecorator, CategoryTitleText, CategoryTitleWrapper, ProgramItem, ProgramUl } from 'components/molecules/Program/List'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import { PresentationProposal } from 'lib/stores/CFP/PresentationProposal'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { paths, programMenu } from 'routes/paths'
import { withNamespaces } from '../../i18n'
import { StoresType } from '../_app'

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
      presentationGroupByCategories: _.chain(presentations)
        .filter(p => !p.isKeynote)
        .groupBy('category.name')
        .mapValues(presentations => _.sortBy(presentations, ['difficulty.id']))
        .toPairs()
        .value()
    })
  }

  getSpeakerName(presentation: any) {
    const ownerName = presentation.owner.profile.name
    if (presentation.secondaryOwner) {
      const secondaryOwnerName = presentation.secondaryOwner.profile.name
      if (secondaryOwnerName) {
        return `${ownerName} / ${secondaryOwnerName}`
      }
    }

    return ownerName
  }

  render() {
    const { t } = this.props
    const title = t('program:talks.title')

    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title })} intlKey='' />}
        footer={<Footer />}
      >
        <LocalNavigation list={programMenu.submenu} />
        <H1>{ title }</H1>
        {
          this.state.presentationGroupByCategories.map(group => {
            return (
              <Section key={ group[0] }>
                <CategoryTitleWrapper>
                  <CategoryTitleText>{group[0]}</CategoryTitleText>
                  <CategoryTitleDecorator />
                </CategoryTitleWrapper>
                <ProgramUl>
                  {
                    group[1].map((presentation: PresentationProposal) => {
                      const href = `${paths.program.talkDetail}?id=${presentation.id}`

                      return (
                        <ProgramItem
                          key={presentation.id}
                          href={href}
                          speakerName={ this.getSpeakerName(presentation) }
                          name={ presentation.name }
                          difficulty={presentation.difficulty}/>
                      )
                    })
                  }
                </ProgramUl>
              </Section>
            )
          })
        }
      </PageTemplate >
    )
  }
}

export default withNamespaces(['program'])(TalkList)
