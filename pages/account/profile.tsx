import styled from '@emotion/styled'
import { H1 } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { CORAL } from 'styles/colors'
import { StoresType } from '../_app'

// TODO:: disabled 속성 분리 + 파일 업로드 CSS 관리
const Wrapper = styled.div`
background: #f6faff;
padding: 35px 41px 57px 51px;

label {
    display: block;
    height: 29px;
    font-size: 14px;
    line-height: 29px;
    color: #878d91;
}

input[type=file] {
    margin-bottom: 39px;
    padding: 17px 31px;
    outline: none;
}

input[type=text], input[type=tel] {
    width: 608px;
    height: 54px;
    margin-bottom: 34px;
    padding: 17px 31px;
    border-radius: 4px;
    border: solid 1px #ced3d6;
    background-color: #FFFFFF;
    font-size: 14px;
    outline: none;
}

input[type=text].disabled, input[type=tel].disabled {
    border: solid 1px #eaeeef;
    background-color: #f7f7f7;
}

textarea {
    width: 608px;
    height: 141px;
    margin-bottom: 34px;
    border-radius: 4px;
    border: solid 1px #ced3d6;
    background-color: #ffffff;
    font-size: 14px;
    outline: none;
}

button {
    display: block;
    width: 371px;
    height: 54px;
    margin: 19px auto 0px;
    border-radius: 4px;
    border: solid 1px #c9d9fb;
    background-color: #c9d9fb;
    font-size: 14px;
    text-align: center;
    color: #ffffff;
}

button.disabled {
    border: solid 1px #c9d9fb;
    background-color: #c9d9fb;
}

.file-upload__label {
    display: block;
    width: 160px;
    margin: 5px 0 34px 0;
    background: ${CORAL};
    border-radius: .4em;
    text-align:center;
    color: #FFF;

    &:hover {
        cursor: pointer;
    }
}

.file-upload__input {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    font-size: 1;
    width: 0;
    height: 100%;
    opacity: 0;
}
`

@inject('stores')
@observer
class Profile extends React.Component<{ stores: StoresType }> {
  state = {
    profile: {
      email: '',
      oauthType: '',
      nameKo: '',
      nameEn: '',
      phone: '',
      organization: '',
      nationality: '',
      bioKo: '',
      bioEn: '',
      image: '',
      avatarUrl: '',
    },
    profileFile: null
  }

  async componentDidMount() {
    // const {stores} = this.props
    // if (!stores.authStore.logined){
    //   Router.replace(paths.account.login)
    //   return
    // }
    // await stores.profileStore.retrieveProfile()
    // this.setState({
    //   profile: {
    //     ...toJS(stores.profileStore).profile
    //   }
    // })
  }

  render() {
    const { stores } = this.props

    return (
      <PageTemplate
        header={<Header title='프로필' />}
        footer={<Footer />}
      >
        <H1><IntlText intlKey='homeTitle'>프로필</IntlText></H1>
        <Wrapper>
            <label>프로필 사진</label>
            <img
              width='160px'
              height='160px'
              src={this.state.profile.image ? this.state.profile.image : this.state.profile.avatarUrl}
            />
            <label
              htmlFor='upload'
              className='file-upload__label'
            >업로드</label>
          <input
            id='upload'
            className='file-upload__input'
            name='file-upload'
            type='file'
            multiple
            onChange={({ target: { validity, files } }) => {
              if (!validity.valid || !files) {
                return
              }
              stores.profileStore.uploadProfileImage(files[0]).then((image) => {
                this.setState({
                  profile: {
                    ...this.state.profile,
                    image
                  }
                })
              })
            }}
          />
          <form onSubmit={(e) => {
            e.preventDefault()
            stores.profileStore.updateProfile({
              nameKo: this.state.profile.nameKo,
              nameEn: this.state.profile.nameEn,
              bioKo: this.state.profile.bioKo,
              bioEn: this.state.profile.bioEn,
              phone: this.state.profile.phone,
              email: this.state.profile.email,
              organization: this.state.profile.organization,
              nationality: this.state.profile.nationality,
            }).then(
                (profile: any) => {
                  alert('프로필이 수정되었습니다.')
                  this.setState({
                    profile: {
                      ...profile
                    }
                  })
                })
          }}>
            <label>이메일</label>
            <input
                className='disabled'
                type='text'
                value={this.state.profile.email}
                onChange={e => this.setState({
                  profile: {
                    ...this.state.profile,
                    email: e.target.value
                  }
                })}
                aria-required={true}
                required
            />
            <label>이름</label>
            <input
                type='text'
                value={this.state.profile.nameKo}
                onChange={e => this.setState({
                  profile: {
                    ...this.state.profile,
                    nameKo: e.target.value,
                  }
                })}
                aria-required={true}
                required
            />
            <label>영문 이름</label>
            <input
                type='text'
                value={this.state.profile.nameEn}
                onChange={e => this.setState({
                  profile: {
                    ...this.state.profile,
                    nameEn: e.target.value
                  }
                })}
                aria-required={true}
                required
            />
            <label>전화번호</label>
            <input
                type='tel'
                value={this.state.profile.phone}
                onChange={e => this.setState({
                  profile: {
                    ...this.state.profile,
                    phone: e.target.value
                  }
                })}
            />
            <label>소속</label>
            <input
                type='text'
                value={this.state.profile.organization}
                onChange={e => this.setState({
                  profile: {
                    ...this.state.profile,
                    organization: e.target.value
                  }
                })}
            />
            <label>국적</label>
            <input
                type='text'
                value={this.state.profile.nationality}
                onChange={e => this.setState({
                  profile: {
                    ...this.state.profile,
                    nationality: e.target.value
                  }
                })}
            />
            <label>소개</label>
            <textarea
                value={this.state.profile.bioKo}
                onChange={e => this.setState({
                  profile: {
                    ...this.state.profile,
                    bioKo: e.target.value
                  }
                })}
            />
            <label>영문소개</label>
            <textarea
                value={this.state.profile.bioEn}
                onChange={e => this.setState({
                  profile: {
                    ...this.state.profile,
                    bioEn: e.target.value
                  }
                })}
            />

            <button type='submit'>프로필 업데이트</button>
          </form>
        </Wrapper>
      </PageTemplate>
    )

  }
}

export default Profile
