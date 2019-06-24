import styled from '@emotion/styled'
import {
  ContentTableWrapper,
  H1,
  H2,
  isBold,
  isHeader,
  Section,
  TableList,
  TableListRow,
  TableListRowContent,
} from 'components/atoms/ContentWrappers'
import { Loading } from 'components/atoms/Loading'
import MarkdownWrapper from 'components/atoms/MarkdownWrapper'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import { FORM_LABEL_GRAY } from 'styles/colors'
import { mobileWidth } from 'styles/layout'
import { withNamespaces } from '../../i18n'
import { StoresType } from '../_app'
import { Tag } from './talks'

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

const TalkTableRow = (props) => <>
  <TableListRow>
    <TableListRowContent className={isHeader}>
      { props.header }
    </TableListRowContent>
    <TableListRowContent
      className={props.bold ? isBold : ''}
      color={props.color}
    >
      { props.content }
    </TableListRowContent>
  </TableListRow>
</>

const SocialNetworkList = styled.ul`
display: flex;
margin-top: 20px;
`
const SocialNetworkListItem = styled.li`
a {
  display: inline-block;
  padding: 10px;
  cursor: pointer;
}
`

const Presenter = styled.span`
  font-size: 32px;
  color: ${FORM_LABEL_GRAY};

  @media (max-width: ${mobileWidth}) {
    font-size: 26px;
  }
`

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
    const recordable = presentation.recordable
      ? t('program:talkDetail.recordable')
      : t('program:talkDetail.notRecordable')

    return (
      <PageTemplate
        header={<Header title={ pageTitle } intlKey='' />}
        footer={<Footer />}
      >
        <H1 style={{ maxWidth: '600px' }}>
          { presentation.name }<br/>
          <Presenter>{presentation.owner.profile.name}</Presenter><br/>
        </H1>
        <ContentTableWrapper>
          <TableList>
            <TalkTableRow
              header={t('program:talkDetail.category')}
              content={ presentation.category.name }
              bold
            />
            <TalkTableRow
              header={t('program:talkDetail.difficulty')}
              content={ <Tag difficulty={presentation.difficulty.id}>{presentation.difficulty.name}</Tag> }/>
            <TalkTableRow
              header={t('program:talkDetail.language')}
              content={ presentation.language }/>
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
              header={t('program:talkDetail.videoPublic')}
              content={ recordable }
              color={presentation.recordable ? null : 'red'}
            />
            {
              presentation.slideUrl &&
                <TalkTableRow
                  header={t('program:talkDetail.slideUrl')}
                  content={ presentation.slideUrl }/>
            }
          </TableList>
        </ContentTableWrapper>
        <Section style={{ marginTop: '36px'}}>
          {/* <H2>발표 내용</H2> */}
          <MarkdownWrapper contents={presentation.desc || presentation.cfpReviewSet[0].presentation.detailDesc}/>
        </Section>
        <Section>
          <H2>{presentation.owner.profile.name} 님</H2>
          <img
            width='160px'
            height='160px'
            src={presentation.owner.profile.avatarUrl}
          />
          {(presentation.owner.profile.linkedInUrl ||
          presentation.owner.profile.twitterUrl ||
          presentation.owner.profile.linkedInUrl) &&
          <SocialNetworkList>
            {presentation.owner.profile.githubUrl && <SocialNetworkListItem>
              <a href={presentation.owner.profile.githubUrl}>Github</a>
            </SocialNetworkListItem>}
            {presentation.owner.profile.twitterUrl && <SocialNetworkListItem>
              <a href={presentation.owner.profile.twitterUrl}>Twitter</a>
            </SocialNetworkListItem>}
            {presentation.owner.profile.linkedInUrl && <SocialNetworkListItem>
              <a href={presentation.owner.profile.linkedInUrl}>LinkedIn</a>
            </SocialNetworkListItem>}
          </SocialNetworkList>}
          <MarkdownWrapper contents={presentation.owner.profile.desc}/>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['program'])(TalkDetail)
