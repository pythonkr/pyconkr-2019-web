import { H1, H2, H3, Li, FormWrapper, Paragraph, Section, Ul, ContentButtonWrapper } from 'components/atoms/ContentWrappers'
import { FormNeedsLogin } from 'components/atoms/FormNeedsLogin'
import styled from '@emotion/styled'
import { Button } from 'components/atoms/Button'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import { inject, observer } from 'mobx-react'
import _ from 'lodash'
import { StoresType } from 'pages/_app'
import React from 'react'
import { ALERT_BLUE_DARK, FORM_LABEL_GRAY } from '../../styles/colors'
import { AlertBar } from 'components/atoms/AlertBar'
import { Loading } from 'components/atoms/Loading'
import { withNamespaces } from '../../i18n'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'

export type PropsType = {
  t: i18next.TFunction;
  stores: StoresType;
}

const MY_LIGHTNING_TALK = gql`
query MyLightningTalk {
  myLightningTalk {
    id
    name
    comment
    material
    materialLink
  }
}
`

const UPDATE_LIGHTNING_TALK = gql`
mutation UpdateLightningTalk($data: LightningTalkInput!){
  updateLightningTalk(data: $data) {
    lightningTalk {
      id
      name
      comment
      material
      materialLink
    }
  }
}
`

const UPLOAD_MATERIAL = gql`
mutation UploadLightningTalkMaterial($file: Upload!) {
  uploadLightningTalkMaterial(file: $file) {
      file
  }
}
`

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

class LightningTalkEdit extends React.Component {
  state = {
    name: '',
    material: '',
    comment: '',
    materialLink: ''
  }
  constructor(props) {
    super(props)
    if(props.lightningTalk){
      const {name, material, materialLink, comment} = props.lightningTalk
      this.state.name = name
      this.state.material = material
      this.state.comment = comment
      this.state.materialLink = materialLink
    }
  }
  getFilename(url: string) {
    if (!url) {
      return ''
    }
    return url.substring(url.lastIndexOf('/') + 1).split('?')[0]
    
  }
  render () {
    const {t} = this.props
    return (
      <Mutation
        mutation={UPDATE_LIGHTNING_TALK}
        onCompleted={ data => {
          alert(t('program:proposingLightningTalk.submitAlert'))
        }}
        onError={ error => {
          alert(error)
        }} 
        update={(cache, { data: { updateLightningTalk } }) => {
          const { myLightningTalk } = cache.readQuery({ query: MY_LIGHTNING_TALK });
          cache.writeQuery({
            query: MY_LIGHTNING_TALK,
            data: { 
              myLightningTalk: {...myLightningTalk, ...updateLightningTalk.lightningTalk} 
            }
          });
        }}>
          {(updateLightningTalk) => (
            <FormWrapper>
              <form onSubmit={e => {
                e.preventDefault()
                updateLightningTalk({variables: {
                  data: {
                    name: this.state.name,
                    comment: this.state.comment,
                    materialLink: this.state.materialLink
                  }
                }})
              }}>
              <label className='required'>{t('program:proposingLightningTalk.topic')}</label>
              <input
                type='text'
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                aria-required={true}
                required
              />
              <label>{t('program:proposingLightningTalk.materialLink')}</label>
              <InputDesc>{t('program:proposingLightningTalk.materialDesc')}</InputDesc>
              <input
                type='text'
                value={this.state.materialLink}
                onChange={e => this.setState({ materialLink: e.target.value })}
                aria-required={true}
                required={!this.state.material}
require              />
              <label className='required'>{t('program:proposingLightningTalk.material')}</label>
              <InputDesc>{t('program:proposingLightningTalk.materialLinkDesc')}</InputDesc>
              <FileName><a href={this.state.material}>{this.getFilename(this.state.material)}</a></FileName>
              <Mutation
                mutation={UPLOAD_MATERIAL}
                onCompleted={ data => {
                  alert(t('program:proposingLightningTalk.materialAlert'))
                  this.setState({
                    material: data.uploadLightningTalkMaterial.file
                  })
                }}
                onError={ error => {
                  alert(error)
                }} >
                {(uploadLightningTalkMaterial, {data}) => (
                  <label
                    htmlFor='material_upload'
                    className='file-upload__label'
                  >
                    {t('program:proposingLightningTalk.upload')}
                    <input
                        id='material_upload'
                        className='file-upload__input'
                        name='material-upload'
                        type='file'
                        onChange={({ target: { validity, files } }) => {
                          if (!validity.valid || !files) {
                            return
                          }
                          uploadLightningTalkMaterial({variables: {
                            file: files[0]
                          }})
                        }}
                        required={!this.state.materialLink}
                        aria-required='true'
                      />
                  </label>
                )}
            </Mutation>
            <label>{t('program:proposingLightningTalk.comment')}</label>
              <InputDesc>{t('program:proposingLightningTalk.commentDesc')}</InputDesc>
              <input
                type='text'
                value={this.state.comment}
                onChange={e => this.setState({ comment: e.target.value })}
                aria-required={true}
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
            </form>
          </FormWrapper>
          )}
        </Mutation>
    )
  }
}

@inject('stores')
@observer
class ProposingLightningTalk extends React.Component<PropsType> {
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
          {
            this.renderLightningTalkEdit()
          }
          
        </Section>
      </PageTemplate>
    )
  }
  renderLightningTalkEdit(){
    const { t } = this.props
    const { authStore } = this.props.stores
    const isAuthStoreInitialized = authStore.isInitialized
    const isLoggedIn = authStore.loggedIn
    if (!isAuthStoreInitialized) {
      return (<Loading width={50} height={50}/>)
    }
    if(!isLoggedIn){
      return (<FormNeedsLogin />)
    }
    return (
    <Query query={MY_LIGHTNING_TALK}>
      {
        ({ loading, error, data }) => {
          if (loading) return (<Loading width={50} height={50}/>);
          if (error) return (<AlertBar text={error.message} />)
          return (<LightningTalkEdit t={t} lightningTalk={data.myLightningTalk}/>)
        }
      }
    </Query>)
  }
}

export default withNamespaces(['program', 'account'])(ProposingLightningTalk)
