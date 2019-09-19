import {
  ContentTableWrapper,
  H1,
  Section,
  TableList,
} from 'components/atoms/ContentWrappers'
import {formatDateInWordsWithWeekdayAndTime} from 'utils/formatDate'
import { Loading } from 'components/atoms/Loading'
import MarkdownWrapper from 'components/atoms/MarkdownWrapper'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import { withNamespaces } from '../../i18n'
import { StoresType } from '../_app'
import { Tag } from 'components/molecules/Program/List'
import { ProgramTableRow, SpeakerSpan } from 'components/molecules/Program/Detail'
import ProfileCard from 'components/molecules/ProfileCard'

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

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
          <SpeakerSpan>{this.getSpeakerName(presentation)}</SpeakerSpan><br/>
        </H1>
        <ContentTableWrapper>
          <TableList>
            {
              presentation.category &&
              <ProgramTableRow
                header={t('program:talkDetail.category')}
                bold>
              { presentation.category.name }
              </ProgramTableRow>
            }
            {
              presentation.difficulty &&
              <ProgramTableRow
                header={t('program:common.difficulty')} >
                <Tag className={presentation.difficulty.nameEn.toLowerCase()}>
                  {presentation.difficulty.name}
                </Tag>
              </ProgramTableRow>
            }
            <ProgramTableRow
              header={t('program:common.language')}>
              { presentation.language }
            </ProgramTableRow>
            <ProgramTableRow
              header={t('program:talkDetail.background')}>
              {presentation.backgroundDesc }
            </ProgramTableRow>
            {
              presentation.startedAt &&
              <ProgramTableRow
                header={t('program:common.datetime')} >
                {`${formatDateInWordsWithWeekdayAndTime(presentation.startedAt)}~${formatDateInWordsWithWeekdayAndTime(presentation.finishedAt)}` }
              </ProgramTableRow>
            }
            {
              presentation.place &&
              <ProgramTableRow
                header={t('program:common.place')} >
                { presentation.place.name }
              </ProgramTableRow>
            }
            <ProgramTableRow
              header={t('program:talkDetail.videoPublic')}
              color={presentation.recordable ? null : 'red'} >
              { recordable }
            </ProgramTableRow>
            {
              presentation.slideUrl &&
                <ProgramTableRow
                  header={t('program:talkDetail.slideUrl')} >
                  <a href={ presentation.slideUrl } target="_blank">
                    { presentation.slideUrl }
                  </a>
                </ProgramTableRow>
            }
          </TableList>
        </ContentTableWrapper>
        <Section>
          {
            presentation.owner &&
            <ProfileCard
              profileImg={presentation.owner.profile.image}
              name={presentation.owner.profile.name}
              organization={presentation.owner.profile.organization}
              bio={presentation.owner.profile.bio || 'Thank you for your contribution.'}
            />
        }
          {
            presentation.secondaryOwner &&
              <ProfileCard
                profileImg={presentation.secondaryOwner.profile.image}
                name={presentation.secondaryOwner.profile.name}
                organization={presentation.secondaryOwner.profile.organization}
                bio={presentation.secondaryOwner.profile.bio || 'Thank you for your contribution.'}
              />
          }
        </Section>
        <Section style={{ marginTop: '36px'}}>
          <MarkdownWrapper contents={presentation.desc}/>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['program'])(TalkDetail)
