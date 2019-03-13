import { Button } from 'components/atoms/Button'
import { FormWrapper } from 'components/atoms/ContentWrappers'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import { CFPFormStage } from 'lib/stores/CFPStore'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import { TEAL } from 'styles/colors'

type State = {
  [index: string]: {
    title: string;
    isRequired: boolean;
    value: string;
  };
}

@inject('stores')
@observer
export default class ProfileForm extends React.Component<{stores: StoresType}, State> {
  state = {
    email:  {
      title: '이메일',
      isRequired: true,
      value: ''
    },
    nameKo: {
      title: '한글 이름',
      isRequired: true,
      value: ''
    },
    nameEn:  {
      title: '영문 이름',
      isRequired: true,
      value: ''
    },
    phone:  {
      title: '소속',
      isRequired: false,
      value: ''
    },
    organization:  {
      title: '연락 가능한 전화번호',
      isRequired: false,
      value: ''
    },
  }

  async componentDidMount() {
    this.props.stores.profileStore.retrieveProfile()
    const { profile } = toJS(this.props.stores.profileStore)

    this.setState({
      email: profile.email,
      nameKo: profile.nameKo,
      nameEn: profile.nameEn,
      phone: profile.phone,
      organization: profile.organization,
    })
  }

  isFormValid () {
    return this.state.nameEn.value.length > 1 &&
      this.state.nameKo.value.length > 0 &&
      this.state.email.value.length > 5
  }

  render () {
    const { stores } = this.props

    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault()
          stores.profileStore.updateProfile(this.state)
          stores.cfpStore.setCurrentStage(CFPFormStage.stage2)
        }}>
          {Object.keys(this.state).map((inputKey) =>
          <React.Fragment key={inputKey}>
            <label>
              {this.state[inputKey].title}
              <input
                type='text'
                value={this.state[inputKey].value}
                onChange={e => this.setState({ [inputKey]: e.target.value })}
                required={this.state[inputKey].isRequired}
                aria-required={this.state[inputKey].isRequired}
              />
            </label>
            <br/>
          </React.Fragment>
          )}
          <p>
            발표자 정보로 등록한 내용들은 프로필로 저장되며, 내 프로필 페이지에서 수정할 수 있습니다.
            프로필은 추후 프로그램 페이지에서 사용됩니다.
          </p>
          <FlexCenterWrapper>
            <Button
              type='submit'
              tag='button'
              intlKey='asdas'
              color={TEAL}
              width={300}
              style={{ marginTop: 80 }}
              disabled={!this.isFormValid()}
            >
              프로필 저장하고 계속하기
            </Button>
          </FlexCenterWrapper>
        </form>
      </FormWrapper>
    )
  }

  submit = () => {}
}
