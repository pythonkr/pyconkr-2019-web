import { AlertBar } from 'components/atoms/AlertBar'
import { H1, H2, Li, Paragraph, Paragraph2, Section, Ul } from 'components/atoms/ContentWrappers'
import { StatusBar } from 'components/atoms/StatusBar'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import { SponsorPackageTables } from 'components/organisms/SponsorPackageTables'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import { inject, observer } from 'mobx-react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { paths } from 'routes/paths'
import { withNamespaces } from '../../i18n'
import { StoresType } from '../_app'

type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

@inject('stores')
@observer
export class Prospectus extends React.Component<PropsType> {

  static async getInitialProps() {
    return {
      namespacesRequired: ['home', 'sponsor'],
    }
  }

  render() {
    const { stores, t } = this.props
    const { sponsorProposalStartAt,  sponsorProposalFinishAt} = stores.scheduleStore.schedule

    return (
        <PageTemplate
            header={<Header title='후원사 안내 :: 파이콘 한국 2019' intlKey='sponsor.prospectus.pageTitle'/>}
            footer={<Footer />}
        >
          <H1>{t('sponsor:prospectus.title')}</H1>
          <StatusBar
              titleIntlKey='sponsor.event.invitation'
              actionIntlKey='common.apply'
              link={paths.sponsor.applicationForm}
              openDate={sponsorProposalStartAt}
              closeDate={sponsorProposalFinishAt}
          />
          <Paragraph>{t('home:differenceWithOthers.description')}</Paragraph>
          <Paragraph>{t('sponsor:prospectus.description1')}</Paragraph>
          <Section>
            <H2>{t('sponsor:prospectus.faqTitle')}</H2>
            <Paragraph>
              <strong style={{ fontWeight: 'bold', display: 'block' }}>{t('sponsor:prospectus.faq.question1')}</strong>
              <ReactMarkdown source={t('sponsor:prospectus.faq.answer1')} />
            </Paragraph>
            <Paragraph>
              <strong style={{ fontWeight: 'bold', display: 'block' }}>{t('sponsor:prospectus.faq.question2')}</strong>
              <ReactMarkdown source={t('sponsor:prospectus.faq.answer2')} />
            </Paragraph>
            <Paragraph>
              <strong style={{ fontWeight: 'bold', display: 'block' }}>{t('sponsor:prospectus.faq.question3')}</strong>
              <ReactMarkdown source={t('sponsor:prospectus.faq.answer3')} />
            </Paragraph>
            <Paragraph>
              <strong style={{ fontWeight: 'bold', display: 'block' }}>{t('sponsor:prospectus.faq.question4')}</strong>
              <ReactMarkdown source={t('sponsor:prospectus.faq.answer4')} />
            </Paragraph>
          </Section>
          <Section>
            <H2>{t('sponsor:prospectus.guideTitle')}</H2>
            {t('sponsor:prospectus.guideNotice')
              .split('\n')
              .map((line, index) => {
                if (index === 0) {
                  return (
                    <Paragraph key={`guideNotice_${index}`}>
                      <a target='_blank' rel='noreferrer' href='https://pythonkr.github.io/sponsor-guide/'>
                        {t('constant:pyconKorea.name')} {t('sponsor:prospectus.guideTitle')}
                      </a>
                      {line}
                    </Paragraph>
                  )
                }

                return <Paragraph key={`guideNotice_${index}`}>{line}</Paragraph>
              })
            }
          </Section>
          <Section>
            <H2>{t('sponsor:prospectus.packageTitle')}</H2>
            {t('sponsor:prospectus.packageDesc')
              .split('/n')
              .map((line, index) => <Paragraph key={`packageDesc_${index}`}>{line}</Paragraph>)
            }
            <AlertBar text={t('sponsor:prospectus.boothDesc')}/>
            <SponsorPackageTables />
            <Ul>
              <Li>{t('sponsor:prospectus.packages.desc1')}</Li>
              <Li>{t('sponsor:prospectus.packages.desc2')}</Li>
              <Li>{t('sponsor:prospectus.packages.desc3')}</Li>
              <Li>{t('sponsor:prospectus.packages.desc4')}</Li>
              <Li>{t('sponsor:prospectus.packages.desc5')}</Li>
              <Li>{t('sponsor:prospectus.packages.desc6')}</Li>
              <Li>{t('sponsor:prospectus.packages.desc7')}</Li>
            </Ul>
          </Section>
          <Section>
            <H2>{t('common:contact')}</H2>
            <Paragraph>
              <a href='mailto: sponsor@pycon.kr'>sponsor@pycon.kr</a>
            </Paragraph>
          </Section>
        </PageTemplate>
    )
  }
}

export default withNamespaces(['home', 'sponsor'])(Prospectus)
