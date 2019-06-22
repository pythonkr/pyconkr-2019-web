import styled from '@emotion/styled'
import { H1, H2, Li, Section, Ul } from 'components/atoms/ContentWrappers'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import { PresentationProposal } from 'lib/stores/CFP/PresentationProposal'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import React from 'react'
import { paths, programMenu } from 'routes/paths'
import { CORAL_SEMI_LIGHT, TEAL_SEMI_LIGHT } from 'styles/colors'
import { withNamespaces } from '../../i18n'
import { StoresType } from '../_app'

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

const CategoryTitleWrapper = styled(H2)`
  display: flex;
`

const CategoryTitleText = styled.span`
  padding-right: 20px;
`

const CategoryTitleDecorator = styled.span`
  display: block;
  position: relative;
  flex: 1;
  border-top: solid 1px rgba(8,132,135, .4);
  margin-top: 17px;

  // &:before {
  //   content: '';
  //   position: absolute;
  //   width: 10px;
  //   height: 12px;
  //   right: 0;
  //   top: -6px;
  //   background: url('data:image/svg+xml;utf8,<svg width="10" height="12" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg"><path fill="%23088487" d="M9.062 5.643L14 8l-4.938 2.358L7 16l-2.063-5.642L0 8l4.937-2.357L7 0z" fill-rule="evenodd"/></svg>');
  // }
`

const PresentationUl = styled(Ul)`
padding-top: 2px;
padding-bottom: 26px;
position: relative;

// &:after {
//   content: '';
//   // border-bottom: solid 1px ${CORAL_SEMI_LIGHT};
//   border-bottom: solid 1px ${TEAL_SEMI_LIGHT};
//   display: block;
//   position: absolute;
//   bottom: 0;
//   width: 100%;
//   left: 0;
//   opacity: .3;
// }
`

const PresentationLi = styled(Li)`
display: flex;
justify-content: space-between;
margin: 13px 0;

${PresentationUl} > & {
  &:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 12px;
    left: 24px;
    top: 12px;
    background: url('data:image/svg+xml;utf8,<svg width="10" height="12" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg"><path fill="%23088487" d="M9.062 5.643L14 8l-4.938 2.358L7 16l-2.063-5.642L0 8l4.937-2.357L7 0z" fill-rule="evenodd"/></svg>')
  }
}
`

const Presenter = styled.span`
color: grey;
`

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
        .groupBy('category.name')
        .toPairs()
        .value()
    })
  }

  render() {
    const { t } = this.props
    const title = t('program:talks.title')

    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle')} intlKey='' />}
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
                <PresentationUl>
                  {
                    group[1]!.map((presentation: PresentationProposal) => {
                      return (
                        <PresentationLi key={presentation.id}>
                          <div>
                            <Link href={`${paths.program.talkDetail}?id=${presentation.id}`}>
                              <a>{presentation.name}</a>
                            </Link>
                            <Presenter style={{ marginLeft: '10px' }}>{presentation.owner.profile.name}</Presenter>
                          </div>
                          <div>
                            <Presenter>{presentation.difficulty.name}</Presenter>
                          </div>
                        </PresentationLi>
                      )
                    })
                  }
                </PresentationUl>
              </Section>
            )
          })
        }
      </PageTemplate >
    )
  }
}

export default withNamespaces(['program'])(TalkList)
