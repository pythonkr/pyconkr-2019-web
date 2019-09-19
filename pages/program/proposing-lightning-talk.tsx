import { H1, H2, H3, Li, FormWrapper, Paragraph, Section, Ul, ContentButtonWrapper } from 'components/atoms/ContentWrappers'
import { FormNeedsLogin } from 'components/atoms/FormNeedsLogin'
import styled from '@emotion/styled'
import { Button } from 'components/atoms/Button'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { withRouter } from 'next/router'
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
import { paths } from 'routes/paths'

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
    slideUrl
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
      slideUrl
    }
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
    slideUrl: ''
  }
  constructor(props) {
    super(props)
    if(props.lightningTalk){
      const {name, slideUrl, comment} = props.lightningTalk
      this.state.name = name
      this.state.slideUrl = slideUrl
      this.state.comment = comment
    }
  }
  render () {
    const {t, router} = this.props
    return (
      <Mutation
        mutation={UPDATE_LIGHTNING_TALK}
        onCompleted={ data => {
          alert(t('program:proposingLightningTalk.submitAlert'))
          router.push(paths.program.lightningTalk)
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
                    slideUrl: this.state.slideUrl
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
              <label>{t('program:proposingLightningTalk.slideUrl')}</label>
              <InputDesc>{t('program:proposingLightningTalk.slideUrlDesc')}</InputDesc>
              <input
                type='text'
                value={this.state.slideUrl}
                onChange={e => this.setState({ slideUrl: e.target.value })}
                aria-required={true}
                required
                />
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
    const { t, router } = this.props
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
          return (<LightningTalkEdit t={t} router={router} lightningTalk={data.myLightningTalk}/>)
        }
      }
    </Query>)
  }
}

export default withNamespaces(['program', 'account'])(withRouter(ProposingLightningTalk))
