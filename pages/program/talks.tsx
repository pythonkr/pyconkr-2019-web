import styled from '@emotion/styled'
import { H1, H2, Li, Paragraph, Section, Ul } from 'components/atoms/ContentWrappers'
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
import { CORAL, FORM_LABEL_GRAY, FORM_LABEL_GRAY_LIGHT, GREEN, TEAL, YELLOW } from 'styles/colors'
import { withNamespaces } from '../../i18n'
import { StoresType } from '../_app'

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

const TagWrapper = styled.div`
text-align: right;
padding-left: 10px;
min-width: 80px;
`

const Presenter = styled.span`
color: ${FORM_LABEL_GRAY};
font-weight: 700;
`
const Tag = styled.span`
color: white;
font-size: 12px;
border-radius: 3px;
background: ${props => props.difficulty === '1'
    ? GREEN
    : props.difficulty === '2'
      ? YELLOW
      : CORAL
  };
padding: 2px 4px;
opacity: .9;
`

const CategoryTitleWrapper = styled(H2)`
  display: flex;
  padding-top: 26px;
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
`

const PresentationUl = styled(Ul)`
padding-top: 2px;
position: relative;
`

const PresentationLi = styled(Li)`
display: flex;
justify-content: space-between;
margin: 28px 0;
font-size: 17px;

${PresentationUl} > & {
  &:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 12px;
    left: 24px;
    top: 12px;
    background: url('data:image/svg+xml;utf8,<svg width="10" height="12" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg"><path fill="%23088487" d="M9.062 5.643L14 8l-4.938 2.358L7 16l-2.063-5.642L0 8l4.937-2.357L7 0z" fillRule="evenodd"/></svg>')
  }
}

&:hover {
  a, ${Presenter} {
    color: ${TEAL};
  }
  ${Tag} {
    opacity: 1;
  }
}

& a {
  text-decoration-color: ${FORM_LABEL_GRAY_LIGHT};
  font-weight: 700;
  margin-right: 14px;
}

& ${Paragraph} {
  margin: 5px 0;
}
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
        .mapValues(presentations => _.sortBy(presentations, ['difficulty.id']))
        .toPairs()
        .value()
    })
    console.log(presentations)
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
                            <Presenter>{presentation.owner.profile.name}</Presenter>
                          </div>
                          <TagWrapper>
                            <Tag difficulty={presentation.difficulty.id}>{presentation.difficulty.name}</Tag>
                            {/* <Presenter>{presentation.owner.profile.name}</Presenter> */}
                          </TagWrapper>
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
