import { ContentTableWrapper, H1, H2, Ul, Li, Paragraph, Section, Table, TBody, Td, Tr } from 'components/atoms/ContentWrappers'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { paths } from 'routes/paths'
import { StoresType } from '../_app'
import i18next from 'i18next'
import { withNamespaces } from '../../i18n'
import {withRouter} from 'next/router'
import { Loading } from 'components/atoms/Loading'
import styled from '@emotion/styled'
import { TEAL_SEMI_DARK, TEAL_LIGHT } from 'styles/colors'
import MarkdownWrapper from 'components/atoms/MarkdownWrapper'
import {formatDateInWordsWithWeekdayAndTime} from 'utils/formatDate'

const HeaderTd = styled(Td)`
  font-weight: bold;
  color: ${TEAL_SEMI_DARK};
  background-color: ${TEAL_LIGHT};
  text-align: right;
`

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

const TalkTableRow = (props) => <>
  <Tr>
    <HeaderTd>
      { props.header }
    </HeaderTd>
    <Td>
      { props.content }
    </Td>
  </Tr>
</>

@(withRouter as any)
@inject('stores')
@observer
export class TalkDetail extends React.Component<PropsType> {
  state = {
    presentation: null
  }

  async componentDidMount() {
    const { retrievePresentation } = this.props.stores.cfpStore
    this.setState({
      presentation: await retrievePresentation(this.props.router.query.id)
    })
  }

  render() {
    const { t } = this.props
    const presentation = this.state.presentation
    if(presentation == null){
      return <Loading width={50} height={50}/>
    }
    const pageTitle = t('program:talkDetail.pageTitle', { talkName: this.state.presentation.name })
    const recordable = presentation.recordable ? '이 발표 장면은 녹화되어 컨퍼런스 이후 공개됩니다.' : '이 발표 장면은 녹화되어 컨퍼런스 이후 공개되지 않습니다.'
    return (
      <PageTemplate
        header={<Header title={ pageTitle } intlKey='' />}
        footer={<Footer />}
      >
        <H1>
          { presentation.name }
        </H1>
        <ContentTableWrapper>
          <Table>
            <colgroup>
              <col width='15%'/>
              <col width='85%'/>
            </colgroup>
            <TBody>
              <TalkTableRow header='분류' content={ presentation.category.name }/>
              <TalkTableRow header='난이도' content={ presentation.difficulty.name }/>
              <TalkTableRow header='언어' content={ presentation.language }/>
              <TalkTableRow header='발표자' content={ presentation.owner.profile.name }/>
              <TalkTableRow header='선수 지식' content={ presentation.backgroundDesc }/>
              {
                presentation.startedAt &&
                <TalkTableRow 
                  header='슬라이드 주소' 
                  content={ `${formatDateInWordsWithWeekdayAndTime(presentation.startedAt)}~${formatDateInWordsWithWeekdayAndTime(presentation.finishedAt)}` }/>
              }
              <TalkTableRow header='슬라이드 주소' content={ presentation.slideUrl }/>
              <TalkTableRow header='영상 공개 여부' content={ recordable }/>
              {
                presentation.slideUrl &&
                  <TalkTableRow header='발표 영상 주소' content={ presentation.slideUrl }/>
              }
              
            </TBody>
          </Table>
        </ContentTableWrapper>
        <Section>
          <MarkdownWrapper contents={presentation.desc}/>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['program'])(TalkDetail)
