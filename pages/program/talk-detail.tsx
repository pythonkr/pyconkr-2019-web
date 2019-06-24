import { ContentTableWrapper, H1, isHeader, Section, Table, TBody, Td, Tr } from 'components/atoms/ContentWrappers'
import { Loading } from 'components/atoms/Loading'
import MarkdownWrapper from 'components/atoms/MarkdownWrapper'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
import { withNamespaces } from '../../i18n'
import { StoresType } from '../_app'

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
    const presentation = this.state.presentation
    if (presentation == null) {
      return <Loading width={50} height={50}/>
    }
    const pageTitle = t('common:pageTitle', { title: this.state.presentation.name })
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
                content={ this.getSpeakerName(presentation) }/>
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
