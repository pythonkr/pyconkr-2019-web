import { H1, H2, Li, Paragraph, Section, Ul } from 'components/atoms/ContentWrappers'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import _ from 'lodash'
import React from 'react'
import { programMenu } from 'routes/paths'
import { withNamespaces } from '../../i18n'

export type PropsType = {
  t: i18next.TFunction;
}

export class LightningTalk extends React.Component<PropsType> {
  render() {
    const { t } = this.props
    const title = t('program:lightningTalk.title')

    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', {title})} intlKey='' />}
        footer={<Footer />}
      >
        <LocalNavigation list={programMenu.submenu} />
        <H1>{ title }</H1>
        <Section>
          <Paragraph>
            { t('program:lightningTalk.desc1') }
          </Paragraph>
          <Ul>
            <Li>{ t('program:lightningTalk.desc1-1') }</Li>
            <Li>{ t('program:lightningTalk.desc1-2') }</Li>
            <Li>{ t('program:lightningTalk.desc1-3') }</Li>
            <Li>{ t('program:lightningTalk.desc1-4') }</Li>
          </Ul>
          <Paragraph>
          { t('program:lightningTalk.desc2') }
          </Paragraph>
          <Paragraph>
            { t('program:lightningTalk.desc3') }
          </Paragraph>
        </Section>
        <Section>
          <H2>{ t('program:lightningTalk.header4') }</H2>
          <Paragraph>
            { t('program:lightningTalk.desc4') }
          </Paragraph>
          <Ul>
            <Li><a href='https://www.pycon.kr/2014/program/22' target='_blank' rel='noreferrer'>
              { t('program:lightningTalk.desc4-2014') }</a></Li>
            <Li><a href='https://www.pycon.kr/2015/program/77' target='_blank' rel='noreferrer'>
              { t('program:lightningTalk.desc4-2015-1') }</a></Li>
            <Li><a href='https://www.pycon.kr/2015/program/78' target='_blank' rel='noreferrer'>
              { t('program:lightningTalk.desc4-2015-2') }</a></Li>
            <Li><a href='https://www.pycon.kr/2016apac/program/lightning_talk/' target='_blank' rel='noreferrer'>
              { t('program:lightningTalk.desc4-2016') }</a></Li>
            <Li><a href='https://www.pycon.kr/2017/program/lightning_talk' target='_blank' rel='noreferrer'>
              { t('program:lightningTalk.desc4-2017') }</a></Li>
            <Li><a href='https://archive.pycon.kr/2018/program/lightning_talk/' target='_blank' rel='noreferrer'>
              { t('program:lightningTalk.desc4-2018') }</a></Li>
          </Ul>

        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['program'])(LightningTalk)
