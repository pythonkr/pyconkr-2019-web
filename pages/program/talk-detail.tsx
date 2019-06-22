import { ContentTableWrapper, H1, H2, Ul, Li, Paragraph, Section, Table, TBody, Td, Tr, isHeader } from 'components/atoms/ContentWrappers'
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



export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

const TalkTableRow = (props) => <>
  <Tr>
    <Td className={isHeader}>
      { props.header }
    </Td>
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
    const recordable = presentation.recordable ? t('program:talkDetail.recordable') : t('program:talkDetail.notRecordable')
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
              <TalkTableRow 
                header={t('program:talkDetail.category')} 
                content={ presentation.category.name }/>
              <TalkTableRow 
                header={t('program:talkDetail.difficulty')} 
                content={ presentation.difficulty.name }/>
              <TalkTableRow 
                header={t('program:talkDetail.language')} 
                content={ presentation.language }/>
              <TalkTableRow 
                header={t('program:talkDetail.speaker')} 
                content={ presentation.owner.profile.name }/>
              <TalkTableRow 
                header={t('program:talkDetail.background')} 
                content={ presentation.backgroundDesc }/>
              {
                presentation.startedAt &&
                <TalkTableRow 
                  header={t('program:talkDetail.datetime')}
                  content={ `${formatDateInWordsWithWeekdayAndTime(presentation.startedAt)}~${formatDateInWordsWithWeekdayAndTime(presentation.finishedAt)}` }/>
              }
              <TalkTableRow 
                header={t('program:talkDetail.slideUrl')}
                content={ presentation.slideUrl }/>
              <TalkTableRow 
                header={t('program:talkDetail.videoPublic')}
                content={ recordable }/>
              {
                presentation.slideUrl &&
                  <TalkTableRow 
                    header={t('program:talkDetail.slideUrl')}
                    content={ presentation.slideUrl }/>
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
