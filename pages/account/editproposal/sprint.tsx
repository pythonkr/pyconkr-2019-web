
import { Button } from 'components/atoms/Button'
import {PageDefaultPropsType} from 'types/PageDefaultPropsType'
import { H1, Paragraph, FormWrapper, InputDesc } from 'components/atoms/ContentWrappers'
import { FlexSpaceBetweenWrapper } from 'components/atoms/FlexWrapper'
import { Loading } from 'components/atoms/Loading'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import Router, { RouterProps, withRouter } from 'next/router'
import React from 'react'
import _ from 'lodash'
import { paths } from 'routes/paths'
import { withNamespaces } from '../../../i18n'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'

const MY_SPRINTS = gql`
query MySprints {
  mySprints {
    id
    nameKo
    nameEn
    descKo
    descEn
  }
}
`

const UPDATE_SPRINT = gql`
mutation UpdateSprint($id: Int, $data: SprintInput!){
  updateSprint(id: $id, data: $data){
    sprint {
      id
    }
  }
}
`
class SprintEdit extends React.Component {
  state = {
    descEn: '',
    descKo: ''
  }
  constructor(props) {
    super(props)
    const {descEn, descKo} = this.props.sprint
    this.state.descEn = descEn? descEn: ''
    this.state.descKo = descKo? descKo: ''
  }
  render () {
    const {t} = this.props
    const {id, nameEn, nameKo} = this.props.sprint
    return (
      <Mutation 
        mutation={UPDATE_SPRINT}
        onCompleted={ data => {
          alert(t('account:editCommon.editCompleteAlert'))
        }}
        onError={ error => {
          alert(error)
        }} >
        {(updateSprint, { data }) => (
          <FormWrapper>
            <form onSubmit={e => {
              e.preventDefault();
              updateSprint({ variables: {  id: id, data: this.state } });
            }}>
              <label className='required'> {t('account:editCommon.nameKo')} </label>
              <input
                type='text'
                value={nameKo}
                onChange={e => this.setState({nameKo: e.target.value})}
                disabled={true}
                aria-required={true}
                // required
              />
              <label className='required'> {t('account:editCommon.nameEn')} </label>
              <input
                type='text'
                value={nameEn}
                onChange={e => this.setState({nameEn: e.target.value})}
                disabled={true}
                aria-required={true}
                // required
              />
              <label className='required'> {t('account:editCommon.descKo')} </label>
              <InputDesc> {t('account:editCommon.descLabel')} </InputDesc>
              <textarea
                value={this.state.descKo}
                onChange={e => this.setState({descKo: e.target.value})}
                aria-required={true}
                style={{ height: 400, marginBottom: 5 }}
                required
              />
              <label className='required'> {t('account:editCommon.descEn')} </label>
              <InputDesc> {t('account:editCommon.descLabel')} </InputDesc>
              <textarea
                value={this.state.descEn}
                onChange={e => this.setState({descEn: e.target.value})}
                aria-required={true}
                style={{ height: 400, marginBottom: 5 }}
                required
              />
              <FlexSpaceBetweenWrapper style={{ justifyContent: 'center', marginTop: 80 }}>
                <Button
                  tag='button'
                  intlKey='asdlfkaslkfdj'
                  type='submit'
                  width={300}
                >{t('account:editCommon.updateButton')}</Button>
              </FlexSpaceBetweenWrapper>
            </form>
          </FormWrapper>
        )}
      </Mutation>
    )
  }
}

@inject('stores')
@(withRouter as any)
@observer
class Sprint extends React.Component<PageDefaultPropsType> {
  async componentDidMount() {
    const { stores, router } = this.props
    const { authStore } = stores
    const isLoggedIn = authStore.loggedIn
    if (!isLoggedIn) {
      router.replace(`${paths.account.login}?redirect_url=${Router.route}`)
      return
    }
  }

  render() {
    const { stores, router, t } = this.props
    const title = t('account:editSprint.title')
    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title })} intlKey='' />}
        footer={<Footer />}
      >
        <H1>
          { title }
        </H1>
        <Paragraph>
          {t('account:editSprint.desc')}
        </Paragraph>
        <Query query={MY_SPRINTS}>
          {({ loading, error, data }) => {
            if (loading || error) return (<Loading width={50} height={50}/>);
            if (_.isEmpty(data.mySprints)){
              alert(t('account:editSprint.sprintNotExistAlert'))
              router.replace(`${paths.home}`)
            }
            return (
              <SprintEdit t={t} sprint={data.mySprints[0]}/>
            )
          }}
        </Query>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['account'])(Sprint)
