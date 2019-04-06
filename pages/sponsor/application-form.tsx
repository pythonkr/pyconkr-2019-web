import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import {H1, H2, Paragraph, Section} from '../../components/atoms/ContentWrappers';
import {IntlText} from '../../components/atoms/IntlText';
import {Button} from '../../components/atoms/Button'
import {TEAL} from '../../styles/colors'
import {FlexCenterWrapper} from '../../components/atoms/FlexWrapper'
import {paths} from '../../routes/paths'

export type IndexPagePropsType = {
  stores: StoresType;
}

@inject('stores')
@observer
export default class ApplicationForm extends React.Component<{ stores: StoresType }> {
  render() {
    const { stores } = this.props
    const { sponsors } = toJS(stores.sponsorStore)

    return (
      <PageTemplate
        header={<Header title='후원사 신청하기 :: 파이콘 한국 2019' />}
        footer={<Footer />}
      >
      <H1><IntlText intlKey='common.'>후원사 신청하기</IntlText></H1>
        <Section>
          <p style={{ position: 'relative'}}>
              <input type='checkbox' />
              <label htmlFor='privacy-consent'>
                  <IntlText intlKey='agreement.agreePrivacyProtectionPolicy'>개인정보 처리 방침에 동의합니다.</IntlText>
                  <a
                      style={{ position: 'absolute', right: 0 }}
                      href={paths.account.privacyPolicy}
                      target='_blank'
                      rel='noreferrer'
                  ><IntlText intlKey='agreement.viewPrivacyProtectionPolicy'>개인정보 처리 방침 보기</IntlText></a>
              </label>
          </p>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.'>CoC</IntlText></H2>
          <Paragraph><IntlText intlKey='common.'>
              파이콘 한국은 다양한 사람들이 만나서 교류하는 곳입니다. 커뮤니티의 모든 참여자들이 신체적, 정신적 위협을 느끼지 않고 서로 존중받고 환영받는 경험을 하기 바랍니다. 이를 위해 후원사를 포함한 모든 참가자들은 파이콘 한국 행동 강령(CoC)을 준수해야 합니다. <a>행동 강령 전문 보기</a>
          </IntlText></Paragraph>
          <Paragraph>
            <input type='checkbox' />
            <label>위 내용을 확인 하였으며 파이콘 한국 행동 강령을 준수할 것을 약속합니다.</label>
          </Paragraph>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.'>개인 정보</IntlText></H2>
          <Paragraph><IntlText intlKey='common.'></IntlText></Paragraph>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.'>후원 혜택</IntlText></H2>
          <Paragraph><IntlText intlKey='common.'></IntlText></Paragraph>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.'>후원 진행 절차</IntlText></H2>
          <Paragraph><IntlText intlKey='common.'></IntlText></Paragraph>
        </Section>
        <FlexCenterWrapper style={{ marginTop: 80 }}>
            <Button
                type='submit'
                tag='button'
                intlKey='common.'
                color={TEAL}
                width={300}
            >
                난 정말로 다 읽었습니다 🙆‍♀️
            </Button>
        </FlexCenterWrapper>
        <Section>
          <H2><IntlText intlKey='common.'>CoC</IntlText></H2>
          <Paragraph><IntlText intlKey='common.'></IntlText></Paragraph>
        </Section>
          <FlexCenterWrapper style={{ marginTop: 80 }}>
            <Button
                type='submit'
                tag='button'
                intlKey='common.'
                color={TEAL}
                width={300}
            >
              위 정보로 후원사를 신청합니다
            </Button>
          </FlexCenterWrapper>
      </PageTemplate>
    )
  }
}
