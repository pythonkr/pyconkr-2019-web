import { FormWrapper, SelectWrapper } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { StageButtonGroup } from 'components/organisms/CFPForm/StageButtonGroup'
import { DurationNode, LanguageNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import { CFPFormStage } from 'lib/stores/CFPStore'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import intl from 'react-intl-universal'
import styled from "@emotion/styled";
import { FORM_LABEL_GRAY } from "../../../styles/colors";
import { mobileWidth } from "../../../styles/layout";
import { toJS } from "mobx";

interface State {
  NameEn: string | null,
  NameKo: string | null,
  managerName: string | null,
  managerContact: string | null,
  subContact: string | null,
  email: string | null,
  gradeId: string,
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
    nameEn: '',
    nameKo: '',
    managerName: '',
    managerContact: '',
    levelId: '1',
    subContact: '',
    email: '',
    gradeId: '',
  }

  async componentDidMount() {
    const { sponsor } = this.props.stores.sponsorStore

    if (!sponsor) {
      return
    }

    this.setState({
      nameEn: '',
      nameKo: '',
      managerName: '',
      managerContact: '',
      subContact: '',
      gradeId: '',
      email: ''
    })

    this.props.scrollRef && window.scrollTo(0, this.props.scrollRef.offsetTop)
  }

  render() {
    const { stores } = this.props
    const { profile } = toJS(stores.profileStore)

    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault()
          stores.cfpStore.createOrUpdatePresentation(this.state).then(() => {
            stores.cfpStore.setCurrentStage(CFPFormStage.stage3)
          })
        }}>
          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                후원사 이름(영문)
              </IntlText>
            </label>
            <input
              type='text'
              value={this.state.nameEn}
              onChange={e => this.setState({ name: e.target.value })}
              aria-required={true}
              required
            />
          </FormHalfBox>

          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                후원사 이름(국문)
              </IntlText>
            </label>
            <input
              type='text'
              value={this.state.nameKo}
              onChange={e => this.setState({ name: e.target.value })}
              aria-required={true}
              required
            />
          </FormHalfBox>

          <SectionTitle>연락 정보</SectionTitle>
          <hr className='margin-20' />

          <label className='required'>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
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
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                담당자 이름
              </IntlText>
            </label>
            <input
              type='text'
              value={this.state.managerName}
              onChange={e => this.setState({ name: e.target.value })}
              aria-required={true}
              required
            />
          </FormHalfBox>

          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                담당자 연락처
              </IntlText>
            </label>
            <input
              type='text'
              value={this.state.managerContact}
              onChange={e => this.setState({ name: e.target.value })}
              aria-required={true}
              required
            />
          </FormHalfBox>

          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                업무용 공식 이메일
              </IntlText>
            </label>
            <input
              type='text'
              value={this.state.email}
              onChange={e => this.setState({ name: e.target.value })}
              aria-required={true}
              required
            />
          </FormHalfBox>

          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                보조 연락처
              </IntlText>
            </label>
            <input
              type='text'
              value={this.state.subContact}
              onChange={e => this.setState({ name: e.target.value })}
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
              value={this.state.subContact}
              onChange={e => this.setState({ name: e.target.value })}
              aria-required={true}
              required
            />
          </FormHalfBox>

          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                사업자 등록증
              </IntlText>
            </label>
            <input
              type='file'
              value={this.state.subContact}
              onChange={e => this.setState({ name: e.target.value })}
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
                  id={DurationNode.SHORT}
                  value={DurationNode.SHORT}
                  aria-checked={this.state.duration === DurationNode.SHORT}
                  checked={this.state.duration === DurationNode.SHORT}
                  onChange={() => this.setState({ duration: DurationNode.SHORT })}
                />
                <label htmlFor={DurationNode.SHORT}>
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
                  id={DurationNode.LONG}
                  value={DurationNode.LONG}
                  aria-checked={this.state.duration === DurationNode.LONG}
                  checked={this.state.duration === DurationNode.LONG}
                  onChange={() => this.setState({ duration: DurationNode.LONG })}
                />
                <label htmlFor={DurationNode.LONG}>
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
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
              후원사 또는 서비스 웹사이트
            </IntlText>
          </label>
          <input
            type='text'
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            aria-required={true}
            required
          />

          <label className='required'>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
              후원사 로고
            </IntlText>
          </label>
          <input
            type='file'
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            aria-required={true}
            required
          />

           <label className='required'>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
              후원사 로고
            </IntlText>
          </label>
          <input
            type='file'
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            aria-required={true}
            required
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
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
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
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />

          <StageButtonGroup
            onPrev={() => {
              stores.cfpStore.setCurrentStage(CFPFormStage.stage1)
            }}
            onSave={() => {
              stores.cfpStore.createOrUpdatePresentation(this.state).then(() => {
                alert(intl.get('contribute.talkProposal.application.stages.stages2.alert').d('저장이 완료되었습니다'))
              })
            }}
          />
        </form>
      </FormWrapper>
    )
  }
}
