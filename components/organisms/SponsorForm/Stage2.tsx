import { FormWrapper, SelectWrapper } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { StageButtonGroup } from 'components/organisms/CFPForm/StageButtonGroup'
import { SponsorFormStage } from 'lib/stores/SponsorStore'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import intl from 'react-intl-universal'
import styled from "@emotion/styled";
import { FORM_LABEL_GRAY } from "../../../styles/colors";
import { mobileWidth } from "../../../styles/layout";
import { toJS } from "mobx";
import { SponsorNode } from 'lib/apollo_graphql/mutations/createOrUpdateSponsor';

interface State {
  proposal: SponsorNode|null
}

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

const InputDesc = styled.div`
color: ${FORM_LABEL_GRAY};
font-size: 12px;
line-height: 1.8;
margin-bottom: 5px;
}`

@inject('stores')
@observer
export default class CFPFormStage2 extends React.Component<{ stores: StoresType; scrollRef: HTMLDivElement }, State> {
  state = {
    proposal: {},
    levelId: '1',
    businessRegistrationFile: '',
    logoImage: '',
    logoVector: '',
    submitted: false,
  }

  async componentDidMount() {
    await this.props.stores.sponsorStore.initialize()
    const { proposal } = this.props.stores.sponsorStore
    if (!proposal) {
      return
    }
    
    this.setState({
      proposal: {
        nameKo: proposal['nameKo'],
        nameEn: proposal['nameEn'],
        descKo: proposal['descKo'],
        descEn: proposal['descEn'],
        managerName: proposal['managerName'],
        managerPhone: proposal['managerPhone'],
        managerSecondaryPhone: proposal['managerSecondaryPhone'],
        managerEmail: proposal['managerEmail'],
        businessRegistrationNumber: proposal['businessRegistrationNumber'],
        contractProcessRequired: proposal['contractProcessRequired'],
        url: proposal['url'],
      },
      levelId: proposal['levelId'],
      businessRegistrationFile: proposal['businessRegistrationFile'],
      logoImage: proposal['logoImage'],
      logoVector: proposal['logoVector'],
      submitted: proposal['submitted']
    })
    // this.props.scrollRef && window.scrollTo(0, this.props.scrollRef.offsetTop)
  }

  render() {
    const { stores } = this.props
    const { profile } = toJS(stores.profileStore)

    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault()
          stores.sponsorStore.createOrUpdateSponsor(this.state.proposal).then(() => {
            stores.sponsorStore.setCurrentStage(SponsorFormStage.stage3)
          })
        }}>
          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='xxx'>
                후원사 이름(영문)
              </IntlText>
            </label>
            <input
              type='text'
              value={this.state.proposal.nameEn}
              onChange={e => {
                this.setState({ 
                proposal: {
                  ...this.state.proposal,
                  nameEn: e.target.value 
                }
              })
            }}
              aria-required={true}
              required
            />
          </FormHalfBox>

          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='xxx'>
                후원사 이름(국문)
              </IntlText>
            </label>
            <input
              type='text'
              value={this.state.proposal.nameKo}
              onChange={e => this.setState({ 
                proposal: {
                  ...this.state.proposal,
                  nameKo: e.target.value 
                }
              })}
              aria-required={true}
              required
            />
          </FormHalfBox>

          <SectionTitle>연락 정보</SectionTitle>
          <hr className='margin-20' />

          <label className='required'>
            <IntlText intlKey='xxx'>
              담당자 파이콘 계정 이메일
            </IntlText>
          </label>
          <input
            type='text'
            value={profile.email}
            disabled
          />

          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='xxx'>
                담당자 이름
              </IntlText>
            </label>
            <input
              type='text'
              value={this.state.proposal.managerName}
              onChange={e => this.setState({ 
                proposal: {
                  ...this.state.proposal,
                  managerName: e.target.value 
                }
              })}
              aria-required={true}
              required
            />
          </FormHalfBox>

          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='xxx'>
                담당자 연락처
              </IntlText>
            </label>
            <input
              type='text'
              value={this.state.proposal.managerPhone}
              onChange={e => this.setState({ 
                proposal: {
                  ...this.state.proposal,
                  managerPhone: e.target.value 
                }
              })}
              aria-required={true}
              required
            />
          </FormHalfBox>

          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='xxx'>
                업무용 공식 이메일
              </IntlText>
            </label>
            <input
              type='text'
              value={this.state.proposal.managerEmail}
              onChange={e => this.setState({ 
                proposal: {
                  ...this.state.proposal,
                  managerEmail: e.target.value 
                }
              })}
              aria-required={true}
              required
            />
          </FormHalfBox>

          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='xxx'>
                보조 연락처
              </IntlText>
            </label>
            <input
              type='text'
              value={this.state.proposal.managerSecondaryPhone}
              onChange={e => this.setState({ 
                proposal: {
                  ...this.state.proposal,
                  managerSecondaryPhone: e.target.value 
                }
              })}
              aria-required={true}
              required
            />
          </FormHalfBox>

          <SectionTitle>후원 정보</SectionTitle>
          <hr className='margin-20' />

          <label className='required'>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item2'>
              후원 등급
            </IntlText>
          </label>
          <SelectWrapper>
            {/* tslint:disable-next-line:react-a11y-no-onchange */}
            <select
              value={this.state.levelId}
              onBlur={e => this.setState({ levelId: e.target.value })}
              onChange={e => this.setState({ levelId: e.target.value })}
              aria-required={true}
              required
            >
              {
                stores.sponsorStore.sponsorLevels.map(level =>
                  <option
                    key={level.id}
                    aria-selected={this.state.levelId === 'level.id'}
                    value={level.id}
                  >{level.name}</option>
                )
              }
            </select>
          </SelectWrapper>

          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                사업자 등록번호
              </IntlText>
            </label>
            <input
              type='text'
              value={this.state.proposal.businessRegistrationNumber}
              onChange={e => this.setState({ 
                proposal: {
                  ...this.state.proposal,
                  businessRegistrationNumber: e.target.value 
                }
              })}
              aria-required={true}
              required
            />
          </FormHalfBox>

          <FormHalfBox>
            <label 
            htmlFor='business_upload'
              className='required'
              >
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                사업자 등록증
              </IntlText>
            </label>
            <input
              id='business_upload'
              name='business-registration-file-upload'
              type='file'
              onChange={({ target: { validity, files } }) => {
                if (!validity.valid || !files) {
                  return
                }
                stores.sponsorStore.uploadBusinessRegistrationFile(files[0]).then((fileUrl) => {
                  this.setState({
                    businessRegistrationFile: fileUrl
                  })
                })
              }}
              aria-required={true}
              required
            />
          </FormHalfBox>

          <div role='group'>
            <fieldset className='full'>
              <label className='required'>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item5.header'>
                  회사에서 준비한 별도의 계약 과정이 필요한가요?
                </IntlText>
              </label>
              <p>
                <input
                  type='radio'
                  id='contractProcessRequiredTrue'
                  value='true'
                  aria-checked={this.state.proposal.contractProcessRequired}
                  checked={this.state.proposal.contractProcessRequired}
                  onChange={() => this.setState(state => { 
                    state.proposal.contractProcessRequired = true 
                    return state
                  })}
                />
                <label htmlFor='contractProcessRequiredTrue'>
                  <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item5.sub1'>
                    예
                  </IntlText>
                </label>
                <InputDesc>
                  별도의 계약 과정이 필요한 경우, 담당자가 메일로 안내드립니다.<br />
                  계약 과정이 아닌 패키지 선택 등의 다른 사항은 후원사 신청 이전에 메일로 문의해주세요.<br />
                  sponsor@pycon.kr
                </InputDesc>
              </p>
              <p>
                <input
                  type='radio'
                  id='contractProcessRequiredFalse'
                  value='false'
                  aria-checked={!this.state.proposal.contractProcessRequired}
                  checked={!this.state.proposal.contractProcessRequired}
                  onChange={() => this.setState(state => { 
                    state.proposal.contractProcessRequired = false
                    return state
                  })}
                />
                <label htmlFor='contractProcessRequiredFalse'>
                  <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item5.sub2'>
                    아니오
                  </IntlText>
                </label>
              </p>
            </fieldset>
          </div>

          <SectionTitle>후원사 소개 정보</SectionTitle>
          <hr className='margin-20' />

          <label className='required'>
            <IntlText intlKey='xxx'>
              후원사 또는 서비스 웹사이트
            </IntlText>
          </label>
          <input
            type='text'
            value={this.state.proposal.url}
            onChange={e => this.setState({ 
              proposal: {
                ...this.state.proposal,
                url: e.target.value 
              }
            })}
            aria-required={true}
            required
          />

          <label className='required'>
            <IntlText intlKey='xxx'>
              후원사 로고
            </IntlText>
          </label>
          <input
            type='file'
            // value={this.state.proposal.logoImage}
            aria-required={true}
            onChange={({ target: { validity, files } }) => {
              if (!validity.valid || !files) {
                return
              }
              stores.sponsorStore.uploadLogoImage(files[0]).then((imageUrl) => {
                this.setState(state => { 
                  state.logoImage = imageUrl 
                  return state
                })
              })
            }}
          />

           <label className='required'>
            <IntlText intlKey='xxx'>
              후원사 로고(Vector)
            </IntlText>
          </label>
          <input
            type='file'
            // value={this.state.proposal.logoVector}
            aria-required={true}
            required
            onChange={({ target: { validity, files } }) => {
              if (!validity.valid || !files) {
                return
              }
              stores.sponsorStore.uploadLogoVector(files[0]).then((imageUrl) => {
                this.setState(state => { 
                  state.logoVector = imageUrl 
                  return state
                })
              })
            }}
          />

          <label>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
              후원사 소개(국문)
            </IntlText>
          </label>
          <InputDesc>
            파이콘 홈페이지 후원사 상세페이지에 기재될 내용입니다.<br/>
            추후 추가 또는 수정 가능합니다.
          </InputDesc>
          <input
            type='text'
            value={this.state.proposal.descKo}
            onChange={e => this.setState({ 
              proposal: {
                ...this.state.proposal,
                descKo: e.target.value 
              }
            })}
          />

          <label>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
              후원사 소개(영문)
            </IntlText>
          </label>
          <InputDesc>
            파이콘 홈페이지 후원사 상세페이지에 기재될 내용입니다.<br/>
            추후 추가 또는 수정 가능합니다.
          </InputDesc>
          <input
            type='text'
            value={this.state.proposal.descEn}
            onChange={e => this.setState({ 
              proposal: {
                ...this.state.proposal,
                descEn: e.target.value 
              }
            })}
          />

          <StageButtonGroup
            onPrev={() => {
              stores.sponsorStore.setCurrentStage(SponsorFormStage.stage1)
            }}
            onSave={() => {
              stores.sponsorStore.createOrUpdateSponsor(this.state.proposal).then(() => {
                alert(intl.get('contribute.talkProposal.application.stages.stages2.alert').d('저장이 완료되었습니다'))
              })
            }}
          />
        </form>
      </FormWrapper>
    )
  }
}
