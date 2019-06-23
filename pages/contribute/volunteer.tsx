import { H1, H2, Ul, Li, Paragraph, Section } from 'components/atoms/ContentWrappers'
import styled from '@emotion/styled'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { StoresType } from '../_app'
import i18next from 'i18next'
import { withNamespaces } from '../../i18n'
import Link from 'next/link'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

@inject('stores')
@observer
export class Volunteer extends React.Component<PropsType> {
  async componentDidMount() {
  }
  render() {
    const { stores, t } = this.props
    const { volunteerRecruitingStartAt, volunteerRecruitingFinishAt, volunteerAnnounceAt } = stores.scheduleStore.schedule
    const title = t('contribute:volunteer.title')
    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', {title})} intlKey='' />}
        footer={<Footer />}
      >
        <H1>
          { title }
        </H1>
        <Section>
          <Paragraph>
            { t('contribute:volunteer.desc1-1') }
          </Paragraph>
          <Paragraph>
            { t('contribute:volunteer.desc1-2') }
          </Paragraph>
          <Paragraph>
            { t('contribute:volunteer.desc1-3') }
          </Paragraph>
        </Section>
        <Section>
          <H2>{ t('contribute:volunteer.header2') }</H2>
          <Paragraph>
            { t('contribute:volunteer.desc2-1') }
          </Paragraph>
        </Section>
        <Section>
          <H2>{ t('contribute:volunteer.header3') }</H2>
          <Ul>
            <Li>{ `${t('contribute:volunteer.desc3-1')}: ${formatDateInWordsWithWeekdayAndTime(volunteerRecruitingStartAt)}~${formatDateInWordsWithWeekdayAndTime(volunteerRecruitingFinishAt)}` }</Li>
            <Li>{ `${t('contribute:volunteer.desc3-2')}: ${formatDateInWordsWithWeekdayAndTime(volunteerAnnounceAt)}` }</Li>
            <Li>{ t('contribute:volunteer.desc3-3') }</Li>
          </Ul>
        </Section>
        <Section>
          <H2>{ t('common:contact') }</H2>
          <Paragraph><a href='mailto:support@pycon.kr'>support@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['sponsor'])(Volunteer)
