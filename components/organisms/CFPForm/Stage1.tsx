import { Button } from 'components/atoms/Button'
import { FormWrapper } from 'components/atoms/ContentWrappers'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import { IntlText } from 'components/atoms/IntlText'
import { ProfileNode } from 'lib/apollo_graphql/mutations/updateProfile'
import { CFPFormStage } from 'lib/stores/CFP/CFPStore'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import intl from 'react-intl-universal'
import { TEAL } from 'styles/colors'

/* tslint:disable:react-a11y-required  */

type Input = {
  title: string;
  isRequired: boolean;
  value: string | null;
}

type Profile = {
  [index: string]: Input;
}

type State = {
  profile: Profile;
}

@inject('stores')
@observer
export default class ProfileForm extends React.Component<{stores: StoresType; scrollRef: HTMLDivElement}, State> {
  state: State = {
    profile: {
      email:  {
        title: intl.get('contribute.talkProposal.application.stages.stages1.item1').d('이메일'),
        isRequired: true,
        value: ''
      },
      nameKo: {
        title: intl.get('contribute.talkProposal.application.stages.stages1.item2').d('한글 이름'),
        isRequired: true,
        value: ''
      },
      nameEn:  {
        title: intl.get('contribute.talkProposal.application.stages.stages1.item3').d('영문 이름'),
        isRequired: true,
        value: ''
      },
      phone:  {
        title: intl.get('contribute.talkProposal.application.stages.stages1.item4').d('소속'),
        isRequired: false,
        value: ''
      },
      organization:  {
        title: intl.get('contribute.talkProposal.application.stages.stages1.item5').d('연락 가능한 전화번호'),
        isRequired: false,
        value: ''
      },
    }
  }

  async componentDidMount() {
    const { profile } = toJS(this.props.stores.profileStore)
    const {
      email,
      nameKo,
      nameEn,
      phone,
      organization
    } = profile as ProfileNode

    this.setState({
      profile: {
        email: {
          ...this.state.profile.email,
          value: email || '',
        },
        nameKo: {
          ...this.state.profile.nameKo,
          value: nameKo || '',
        },
        nameEn: {
          ...this.state.profile.nameEn,
          value: nameEn || '',
        },
        phone: {
          ...this.state.profile.phone,
          value: phone || '',
        },
        organization: {
          ...this.state.profile.organization,
          value: organization || '',
        },
      }
    })

    this.props.scrollRef && window.scrollTo(0, this.props.scrollRef.offsetTop)
  }

  isFormValid () {
    return this.state.profile.nameEn.value!.length > 1 &&
      this.state.profile.nameKo.value!.length > 0 &&
      this.state.profile.email.value!.length > 5
  }

  getProfileValues = () => {
    return {
      email: this.state.profile.email.value,
      nameKo: this.state.profile.nameKo.value,
      nameEn: this.state.profile.nameEn.value,
      phone: this.state.profile.phone.value,
      organization: this.state.profile.organization.value,
    }
  }

  render () {
    const { stores } = this.props

    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault()
          stores.profileStore.updateProfile(this.getProfileValues() as ProfileNode)
          stores.cfpStore.setCurrentStage(CFPFormStage.stage2)
        }}>
          {Object.keys(this.state.profile).map(inputKey => {
            const profileInput = this.state.profile[inputKey]

            return <React.Fragment key={inputKey}>
              <label
                htmlFor={profileInput.title}
                className={profileInput.isRequired ? 'required' : undefined}
              >
                {profileInput.title}
              </label>
              <input
                type='text'
                id={profileInput.title}
                value={profileInput.value || ''}
                onChange={e => this.setState({
                  profile: {
                    ...this.state.profile,
                    [inputKey]: {
                      ...profileInput,
                      value: e.target.value
                    }
                  }
                })}
                required={!!profileInput.isRequired}
                aria-required={!!profileInput.isRequired}
              />
            </React.Fragment>
          })}
          <p><IntlText intlKey='contribute.talkProposal.application.stages.stages1.desc1'>
            발표자 정보로 등록한 내용들은 프로필로 저장되며, 내 프로필 페이지에서 수정할 수 있습니다.<br />
            프로필은 추후 프로그램 페이지에서 사용됩니다.
          </IntlText></p>
          <FlexCenterWrapper style={{ marginTop: 80 }}>
            <Button
              type='submit'
              tag='button'
              intlKey='contribute.talkProposal.application.stages.stages1.button'
              color={TEAL}
              width={300}
              disabled={!this.isFormValid()}
            >
              프로필 저장하고 계속하기
            </Button>
          </FlexCenterWrapper>
        </form>
      </FormWrapper>
    )
  }
}
