import { Button } from 'components/atoms/Button'
import { ContentButtonWrapper, H1, H2, Li, Paragraph, Section, Ul } from 'components/atoms/ContentWrappers'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import _ from 'lodash'
import { AlertBar } from 'components/atoms/AlertBar'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
import { withNamespaces } from '../../i18n'
import { StoresType } from '../_app'

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

@inject('stores')
@observer
export class Volunteer extends React.Component<PropsType> {
  static async getInitialProps() {
    return {
      namespacesRequired: ['program'],
    }
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
          {/* <AlertBar text={t('contribute:volunteer.alertFinished')} /> */}
          <Paragraph>
            강시온, 강지우, 김동은, 김무훈, 김소연, 김예빈, 김윤재, 김하늬, 남궁하영, 박선영, 박선형, 박진형, 박한나, 손성민, 신은주, 신준형, 우수연, 이경은, 이동열, 이은진, 이창복, 임도균, 전병우, 정석준, 정지영, 차영호, 한진수, 황준오, Manoj Pandey
          </Paragraph>
          {/* <Paragraph>
            { t('contribute:volunteer.desc2-1') }
          </Paragraph> */}
        </Section>
        <Section>
          <H2>{ t('contribute:volunteer.header3') }</H2>
          <Ul>
            <Li>{ `${t('contribute:volunteer.desc3-1')}: ${formatDateInWordsWithWeekdayAndTime(volunteerRecruitingStartAt)}~${formatDateInWordsWithWeekdayAndTime(volunteerRecruitingFinishAt)}` }</Li>
            <Li>{ `${t('contribute:volunteer.desc3-2')}: ${formatDateInWordsWithWeekdayAndTime(volunteerAnnounceAt)}` }</Li>
            <Li>{ t('contribute:volunteer.desc3-3') }</Li>
          </Ul>
        </Section>
        {/* <ContentButtonWrapper>
          <Button
            title={t('contribute:volunteer.apply')}
            to='https://forms.gle/MHByFnAKVLcr2xzy7'
            outlink
          />
        </ContentButtonWrapper> */}
        <Section>
          <H2>{ t('common:contact') }</H2>
          <Paragraph><a href='mailto:pyconkr@pycon.kr'>pyconkr@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['contribute'])(Volunteer)
