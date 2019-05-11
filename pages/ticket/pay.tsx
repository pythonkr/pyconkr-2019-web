import styled from '@emotion/styled'
import { Button } from 'components/atoms/Button'
import { FormWrapper, H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { TEAL } from 'styles/colors'
import { withNamespaces } from '../../i18n'
import { mobileWidth } from '../../styles/layout'
import { StoresType } from '../_app'

const FormHalfBox = styled.div`
display: inline-block;
margin-right: 5%;
width: 45%;
@media (max-width: ${mobileWidth}) {
  display: block;
  width: 100%;
  margin: 0;
}
}`

const SectionTitle = styled.div`
margin-top: 20px;
}`

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

@inject('stores')
@observer
export class Ticket extends React.Component<PropsType> {
  static async getInitialProps() {
      return {
          namespacesRequired: ['ticket'],
      }
  }

  render() {
    const { t } = this.props

    return (
      <PageTemplate
        header={<Header title='파이콘 한국 티켓 종류 :: 파이콘 한국 2019' intlKey='ticket.overview.pageTitle' />}
        footer={<Footer />}
      >
        <H1>
          {t('ticket:pay.title')}
        </H1>
        <Paragraph>
          {t('ticket:pay.description')}
        </Paragraph>
        <Section>
            <FormWrapper>
                <form>
                  <SectionTitle>
                    {'카드정보'}
                  </SectionTitle>
                  <hr className='margin-20' />
                  <label className='required'>
                      {'카드번호'}
                  </label>
                  <input
                    type='text'
                    value={''}
                    aria-required={true}
                    required
                    placeholder={'- 없이 입력'}
                  />
                  <FormHalfBox>
                    <label className='required'>
                      {'유효기간'}
                    </label>
                    <input
                      type='text'
                      value={''}
                      aria-required={true}
                      required
                      placeholder={'MM / YY'}
                    />
                  </FormHalfBox>
                  <FormHalfBox>
                    <label className='required'>
                      {'비밀번호'}
                    </label>
                    <input
                      type='text'
                      value={''}
                      aria-required={true}
                      required
                      placeholder={'앞 2자리'}
                    />
                  </FormHalfBox>
                  <SectionTitle>
                    {'결제자 정보'}
                  </SectionTitle>
                  <hr className='margin-20' />
                  <FormHalfBox>
                    <label className='required'>
                      {'이름'}
                    </label>
                    <input
                      type='text'
                      value={'861227'}
                      aria-required={true}
                      required
                    />
                  </FormHalfBox>
                  <FormHalfBox></FormHalfBox>
                  <FormHalfBox>
                    <label className='required'>
                      {'연락처'}
                    </label>
                    <input
                      type='text'
                      value={'861227'}
                      aria-required={true}
                      required
                    />
                  </FormHalfBox>
                  <FormHalfBox>
                    <label className='required'>
                      {'이메일'}
                    </label>
                    <input
                      type='text'
                      value={'861227'}
                      aria-required={true}
                      required
                    />
                  </FormHalfBox>
                  <Button
                    tag='button'
                    type='button'
                    intlKey='contribute.talkProposal.application.stages.stages2.button1'
                    color={TEAL}
                    width={80}
                    primary={false}
                  >
                  {'취소'}
                  </Button>
                  <Button
                    tag='button'
                    type='button'
                    intlKey='contribute.talkProposal.application.stages.stages2.button1'
                    color={TEAL}
                    width={80}
                    primary={false}
                  >
                  {'결제'}
                  </Button>
                </form>
            </FormWrapper>
        </Section>
        <Section>
          <H2>{t('common:contact')}</H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['ticket'])(Ticket)
