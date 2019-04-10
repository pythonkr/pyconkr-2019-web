import styled from '@emotion/styled'
import { Button } from 'components/atoms/Button'
import { FormWrapper, SelectWrapper } from 'components/atoms/ContentWrappers'
import { FlexSpaceBetweenWrapper } from 'components/atoms/FlexWrapper'
import { IntlText } from 'components/atoms/IntlText'
import { SponsorStore } from 'lib/stores/Sponsor/SponsorStore'
import { observer } from 'mobx-react'
import React from 'react'
import { DEFAULT_TEXT_BLACK, TEAL } from 'styles/colors'
import { FORM_LABEL_GRAY } from '../../../styles/colors'
import { mobileWidth } from '../../../styles/layout'

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

type PropsType = {
  sponsorStore: SponsorStore;
  onCancel(): void;
}

@observer
export default class CFPEdit extends React.Component<PropsType> {

  state = {
    levelId: '1'
  }

  getFilename(url: string) {
    if (url) {
      return url.substring(url.lastIndexOf('/') + 1)
    }

    return ''
  }
  render () {
    const { sponsorStore } = this.props
    const { proposal } = sponsorStore

    return (
      <FormWrapper>
        <form onSubmit={async (e) => {
          e.preventDefault()
          await sponsorStore.createOrUpdateSponsor(true)
        }}>
          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                후원사 이름(영문)
              </IntlText>
            </label>
            <input
              type='text'
              value={proposal.nameEn || ''}
              onChange={e => proposal.setNameEng(e.target.value)}
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
              value={proposal.nameKo || ''}
              onChange={e => proposal.setNameKor(e.target.value)}
              aria-required={true}
              required
            />
          </FormHalfBox>

          <SectionTitle>연락 정보</SectionTitle>
          <hr className='margin-20' />
          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                담당자 이름
              </IntlText>
            </label>
            <input
              type='text'
              value={proposal.managerName}
              onChange={e => proposal.setManagerName(e.target.value)}
              aria-required={true}
              required
            />
          </FormHalfBox>

          {/*<FormHalfBox>*/}
          {/*  <label className='required'>*/}
          {/*    <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>*/}
          {/*      담당자 연락처*/}
          {/*    </IntlText>*/}
          {/*  </label>*/}
          {/*  <input*/}
          {/*    type='text'*/}
          {/*    value={proposal.managerPhone}*/}
          {/*    onChange={e => proposal.setManagerPhone(e.target.value)}*/}
          {/*    aria-required={true}*/}
          {/*    required*/}
          {/*  />*/}
          {/*</FormHalfBox>*/}

          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                업무용 공식 이메일
              </IntlText>
            </label>
            <input
              type='text'
              value={proposal.managerEmail}
              onChange={e => proposal.setManagerEmail(e.target.value)}
              aria-required={true}
              required
            />
          </FormHalfBox>

          {/*<FormHalfBox>*/}
          {/*  <label className='required'>*/}
          {/*    <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>*/}
          {/*      보조 연락처*/}
          {/*    </IntlText>*/}
          {/*  </label>*/}
          {/*  <input*/}
          {/*    type='text'*/}
          {/*    value={proposal.managerSecondaryPhone}*/}
          {/*    onChange={e => proposal.setManagerSecondaryPhone(e.target.value)}*/}
          {/*    aria-required={true}*/}
          {/*    required*/}
          {/*  />*/}
          {/*</FormHalfBox>*/}

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
                sponsorStore.sponsorLevels.map(level =>
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
              value={proposal.businessRegistrationNumber}
              onChange={e => proposal.setBusinessRegistrationNumber(e.target.value)}
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
            <InputDesc><a href={proposal.businessRegistrationFile}>{this.getFilename(proposal.businessRegistrationFile)}</a></InputDesc>
            <label
              htmlFor='business_upload'
              className='file-upload__label'
            ><IntlText intlKey='account.profile.button1'>
              업로드
              <input
                id='business_upload'
                className='file-upload__input'
                name='business-registration-file-upload'
                type='file'
                onChange={({ target: { validity, files } }) => {
                  if (!validity.valid || !files) {
                    return
                  }
                  sponsorStore.uploadBusinessRegistrationFile(files[0])
                }}
              />
            </IntlText></label>
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
                  aria-checked={proposal.contractProcessRequired}
                  checked={proposal.contractProcessRequired}
                  onChange={() => proposal.setContractProcessRequired(true)}
                />
                <label htmlFor='contractProcessRequiredTrue'>
                  <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item5.sub1'>
                    예
                  </IntlText>
                </label>
              </p>
              <p>
                <input
                  type='radio'
                  id='contractProcessRequiredFalse'
                  value='false'
                  aria-checked={!proposal.contractProcessRequired}
                  checked={!proposal.contractProcessRequired}
                  onChange={() => proposal.setContractProcessRequired(false)}
                />
                <label htmlFor='contractProcessRequiredFalse'>
                  <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item5.sub2'>
                    아니오
                  </IntlText>
                </label>
                <InputDesc>
                  별도의 계약 과정이 필요한 경우, 담당자가 메일로 안내드립니다.<br />
                  계약 과정이 아닌 패키지 선택 등의 다른 사항은 후원사 신청 이전에 메일로 문의해주세요.<br />
                  sponsor@pycon.kr
                </InputDesc>
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
            value={proposal.url || ''}
            onChange={e => proposal.setUrl(e.target.value)}
            aria-required={true}
            required
          />

          <label className='required'>
            <IntlText intlKey='xxx'>
              후원사 로고(Image)
            </IntlText>
          </label>
          <InputDesc><a href={proposal.logoImage}>{this.getFilename(proposal.logoImage)}</a></InputDesc>

          <label
              htmlFor='logo_image_upload'
              className='file-upload__label'
            ><IntlText intlKey='account.profile.button1'>
            업로드
            <input
              id='logo_image_upload'
              className='file-upload__input'
              name='logo-image-upload'
              type='file'
              onChange={({ target: { validity, files } }) => {
                if (!validity.valid || !files) {
                  return
                }
                sponsorStore.uploadLogoImage(files[0]).then((imageUrl: string) => {
                  proposal.setLogoImage(imageUrl)
                })
              }}
            />
          </IntlText></label>
          <InputDesc>
          .JPG, .PNG 등 이미지 파일
          </InputDesc>
           <label className='required'>
            <IntlText intlKey='xxx'>
              후원사 로고(Vector)
            </IntlText>
          </label>
          <InputDesc><a href={proposal.logoVector}>{this.getFilename(proposal.logoVector)}</a></InputDesc>
          <label
              htmlFor='logo_vector_upload'
              className='file-upload__label'
            ><IntlText intlKey='account.profile.button1'>
            업로드
            <input
              id='logo_vector_upload'
              className='file-upload__input'
              name='logo-vector-upload'
              type='file'
              onChange={({ target: { validity, files } }) => {
                if (!validity.valid || !files) {
                  return
                }
                sponsorStore.uploadLogoVector(files[0]).then((imageUrl: string) => {
                  proposal.setLogoVector(imageUrl)
                })
              }}
            />
          </IntlText></label>
          <InputDesc>
          .SVG, .AI 등 벡터 파일
          </InputDesc>
          <label>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
              후원사 소개(국문)
            </IntlText>
          </label>
          <InputDesc>
            파이콘 홈페이지 후원사 상세페이지에 기재될 내용입니다.<br/>
            추후 추가 또는 수정 가능합니다.
          </InputDesc>
          <textarea
            value={proposal.descKo}
            onChange={e => proposal.setDescKo(e.target.value)}
            aria-required={true}
            style={{ height: 400, marginBottom: 5 }}
            required
          />
          <span style={{
            display: 'block',
            marginBottom: 40,
            textAlign: 'right',
            fontSize: 14,
            color: (proposal.descKo && proposal.descKo.length >= 5000) ? 'red' : DEFAULT_TEXT_BLACK
          }}>{(proposal.descKo && proposal.descKo.length) || '0'} / 5000(최대)</span>

          <label>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
              후원사 소개(영문)
            </IntlText>
          </label>
          <InputDesc>
            파이콘 홈페이지 후원사 상세페이지에 기재될 내용입니다.<br/>
            추후 추가 또는 수정 가능합니다.
          </InputDesc>
          <textarea
            value={proposal.descEn}
            onChange={e => proposal.setDescEn(e.target.value)}
            aria-required={true}
            style={{ height: 400, marginBottom: 5 }}
            required
          />
          <span style={{
            display: 'block',
            marginBottom: 40,
            textAlign: 'right',
            fontSize: 14,
            color: (proposal.descEn && proposal.descEn.length >= 5000) ? 'red' : DEFAULT_TEXT_BLACK
          }}>{(proposal.descEn && proposal.descEn.length) || '0'} / 5000(최대)</span>

          <FlexSpaceBetweenWrapper style={{ marginTop: 80 }}>
            <Button
              tag='button'
              type='button'
              intlKey='adsfasdfa'
              color={TEAL}
              width={120}
              primary={false}
              onClick={this.props.onCancel}
            >취소</Button>
            <Button
              tag='button'
              intlKey='asdlfkaslkfdj'
              type='submit'
              width={300}
            >스폰서 제안 수정 제출하기</Button>
          </FlexSpaceBetweenWrapper>
        </form>
      </FormWrapper>
    )
  }
}
