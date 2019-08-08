import { H1, H2, H3, Li, FormWrapper, Paragraph, Section, Ul, ContentButtonWrapper } from 'components/atoms/ContentWrappers'
import styled from '@emotion/styled'
import { Button } from 'components/atoms/Button'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import _ from 'lodash'
import React from 'react'
import { ALERT_BLUE_DARK, FORM_LABEL_GRAY } from '../../styles/colors'
import { AlertBar } from 'components/atoms/AlertBar'
import { withNamespaces } from '../../i18n'

export type PropsType = {
  t: i18next.TFunction;
}

const InputDesc = styled.div`
color: ${FORM_LABEL_GRAY};
font-size: 12px;
line-height: 1.8;
margin-bottom: 5px;
}`

const FileName = styled.div`
color: ${ALERT_BLUE_DARK};
font-size: 12px;
line-height: 1.8;
margin-bottom: 5px;
`

export class ProposingLightningTalk extends React.Component<PropsType> {
  render() {
    const { t } = this.props
    const title = t('program:proposingLightningTalk.title')

    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', {title})} intlKey='' />}
        footer={<Footer />}
      >
        <H1>{ title }</H1>
        <Section>
          <Paragraph>
            { t('program:proposingLightningTalk.desc') }
          </Paragraph>
          <Ul>
            <Li>{t('program:proposingLightningTalk.desc-1')}</Li>
            <Li>{t('program:proposingLightningTalk.desc-2')}</Li>
            <Li>{t('program:proposingLightningTalk.desc-3')}</Li>
            <Li>{t('program:proposingLightningTalk.desc-4')}</Li>
            <Li>{t('program:proposingLightningTalk.desc-5')}</Li>
            <Li>{t('program:proposingLightningTalk.desc-6')}</Li>
            
          </Ul>
          <FormWrapper>
            <label className='required'>{t('program:proposingLightningTalk.topic')}</label>
            <input
              type='text'
              // value={this.state.name}
              // onChange={e => this.setState({ name: e.target.value })}
              aria-required={true}
              required
            />
            <label className='required'>{t('program:proposingLightningTalk.materialLink')}</label>
            <InputDesc>{t('program:proposingLightningTalk.materialLinkDesc')}</InputDesc>
            <input
              type='text'
              // value={this.state.name}
              // onChange={e => this.setState({ name: e.target.value })}
              aria-required={true}
              required
            />
            <label className='required'>{t('program:proposingLightningTalk.material')}</label>
            <InputDesc>{t('program:proposingLightningTalk.materialLinkDesc')}</InputDesc>
            {/* <FileName><a href={proposal.logoImage}>{this.getFilename(proposal.logoImage)}</a></FileName> */}
            <label
              htmlFor='logo_image_upload'
              className='file-upload__label'
            >
              {t('program:proposingLightningTalk.upload')}
            <input
                id='logo_image_upload'
                className='file-upload__input'
                name='logo-image-upload'
                type='file'
                // onChange={({ target: { validity, files } }) => {
                //   if (!validity.valid || !files) {
                //     return
                //   }
                //   sponsorStore.uploadLogoImage(files[0]).then((imageUrl) => {
                //     proposal.setLogoImage(imageUrl)
                //   })
                // }}
                // required={!proposal.logoImage}
                aria-required='true'
              />
          </label>
          <label className='required'>{t('program:proposingLightningTalk.comment')}</label>
            <InputDesc>{t('program:proposingLightningTalk.commentDesc')}</InputDesc>
            <input
              type='text'
              // value={this.state.name}
              // onChange={e => this.setState({ name: e.target.value })}
              aria-required={true}
              required
            />
          <FlexCenterWrapper>
              <Button
                type='submit'
                tag='button'
                intlKey='xxx'
                style={{ marginTop: '20px' }}
                // disabled={!this.hasSthToSubmit()}
              >
                {t('program:proposingLightningTalk.submit')}
              </Button>
            </FlexCenterWrapper>
          </FormWrapper>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['program'])(ProposingLightningTalk)
