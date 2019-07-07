import styled from '@emotion/styled'
import { Button } from 'components/atoms/Button'
import { ContentTableWrapper, FormWrapper, SelectWrapper, Table, TBody, Td, Tr, InputDesc } from 'components/atoms/ContentWrappers'
import { FlexSpaceBetweenWrapper } from 'components/atoms/FlexWrapper'
import { IntlText } from 'components/atoms/IntlText'
import { SponsorStore } from 'lib/stores/Sponsor/SponsorStore'
import { observer } from 'mobx-react'
import React from 'react'
import intl from 'react-intl-universal'
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
 

type PropsType = {
  sponsorStore: SponsorStore;
}

@observer
export default class CFPEdit extends React.Component<PropsType> {
  async componentDidMount() {
    const { sponsorStore } = this.props
    await sponsorStore.retrieveMySponsorProposal()
  }

  getFilename(url: string) {
    if (url) {
      return url.substring(url.lastIndexOf('/') + 1)
    }

    return ''
  }

  render () {
    const { sponsorStore } = this.props
    const { sponsorLevels, proposal, proposalLevel } = sponsorStore

    return (
      <FormWrapper>
        <form onSubmit={async (e) => {
          e.preventDefault()
          await sponsorStore.createOrUpdateSponsor(true)
          alert(intl.get('contribute.talkProposal.application.stages.stages2.alert').d('저장이 완료되었습니다'))
        }}>
          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.nameKorean'>
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
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.nameEnglish'>
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

          <SectionTitle>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.primaryContactInformation'>연락 정보</IntlText>
          </SectionTitle>
          <hr className='margin-20' />
          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.primaryContactPersonName'>
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

          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.businessEmail'>
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

          <SectionTitle>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.sponsorshipIntroduction'>
              후원 정보
            </IntlText>
          </SectionTitle>
          <hr className='margin-20' />

          <label className='required'>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.sponsorshipLevel'>
              후원 등급
            </IntlText>
          </label>
          <SelectWrapper>
            {/* tslint:disable-next-line:react-a11y-no-onchange */}
            <select
              value={proposalLevel.id}
              onBlur={e => sponsorStore.setProposalLevelById(e.target.value)}
              onChange={e => sponsorStore.setProposalLevelById(e.target.value)}
              aria-required={true}
              disabled
              required
            >
              {
                sponsorLevels.map(level =>
                  <option
                    key={level.id}
                    aria-selected={proposalLevel.id === level.id}
                    value={level.id}
                    disabled={level.currentRemainingNumber === 0}
                    >{ level.limit < 100 ? `${level.name} (잔여: ${level.currentRemainingNumber}/${level.limit})` : level.name}</option>
                )
              }
            </select>
          </SelectWrapper>
          <ContentTableWrapper>
            <Table>
              <colgroup>
                <col width='15%'/>
                <col width='35%'/>
                <col width='15%'/>
                <col width='35%'/>
              </colgroup>
              <TBody>
                <Tr>
                  <Td>후원금</Td>
                  <Td>{proposalLevel.price.toLocaleString()} 원</Td>
                  <Td>발표세션</Td>
                  <Td>{proposalLevel.presentationCount ? proposalLevel.presentationCount + '세션' : '❌'}</Td>
                </Tr>
                <Tr>
                  <Td>티켓 지원</Td>
                  <Td>{proposalLevel.ticketCount} 매</Td>
                  <Td>부스</Td>
                  <Td>{proposalLevel.boothInfo ? proposalLevel.boothInfo : '❌'}</Td>
                </Tr>
                <Tr>
                  <Td>채용 공고</Td>
                  <Td>{proposalLevel.canRecruit ?  '✅' : '❌'}</Td>
                  <Td>증정품 지급</Td>
                  <Td>{proposalLevel.canProvideGoods ?  '✅' : '❌'}</Td>
                </Tr>
                <Tr>
                  <Td>열린점심</Td>
                  <Td>{proposalLevel.openLunch ? proposalLevel.openLunch : '❌'}</Td>
                  <Td>로고 노출 위치</Td>
                  <Td>{proposalLevel.logoLocations}</Td>
                </Tr>
              </TBody>
            </Table>
          </ContentTableWrapper>
          <FormHalfBox>
            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.registrationNumber'>
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
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.registrationCertificateFile'>
                사업자 등록증
              </IntlText>
            </label>
            <InputDesc><a href={proposal.businessRegistrationFile}>{this.getFilename(proposal.businessRegistrationFile)}</a></InputDesc>
            <label
              htmlFor='business_upload'
              className='file-upload__label'
            >
              <IntlText intlKey='common.uploadTitle'>
              업로드
              </IntlText>
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
            </label>
          </FormHalfBox>

          <SectionTitle>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.businessIntroduction'>
              후원사 소개 정보
            </IntlText>
          </SectionTitle>
          <hr className='margin-20' />

          <label className='required'>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.website'>
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
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.imageLogoFile'>
              후원사 로고(Image)
            </IntlText>
          </label>
          <InputDesc>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.imageLogoFileGuide'>
              .JPG, .PNG 등 이미지 파일
            </IntlText>
          </InputDesc>
          <InputDesc><a href={proposal.logoImage}>{this.getFilename(proposal.logoImage)}</a></InputDesc>

          <label
              htmlFor='logo_image_upload'
              className='file-upload__label'
            >
            <IntlText intlKey='common.uploadTitle'>
            업로드
            </IntlText>
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
          </label>
           <label className='required'>
             <IntlText intlKey='contribute.talkProposal.application.stages.stages2.vectorLogoFile'>
              후원사 로고(Vector)
            </IntlText>
          </label>
          <InputDesc>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.vectorLogoFileGuide'>
              .SVG, .AI 등 벡터 파일
            </IntlText>
          </InputDesc>
          <InputDesc><a href={proposal.logoVector}>{this.getFilename(proposal.logoVector)}</a></InputDesc>

          <label
              htmlFor='logo_vector_upload'
              className='file-upload__label'
            >
            <IntlText intlKey='common.uploadTitle'>
            업로드
            </IntlText>
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
          </label>
          <label>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.introductionKorean'>
              후원사 소개(국문)
            </IntlText>
          </label>
          <InputDesc>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.introductionGuide'>
              파이콘 홈페이지 후원사 상세페이지에 기재될 내용입니다.<br/>
              추후 추가 또는 수정 가능합니다.
            </IntlText>
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
          }}>{(proposal.descKo && proposal.descKo.length) || '0'} / 5000(<IntlText intlKey='common.maximum'>최대</IntlText>)</span>

          <label>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.introductionEnglish'>
              후원사 소개(영문)
            </IntlText>
          </label>
          <InputDesc>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.introductionGuide'>
              파이콘 홈페이지 후원사 상세페이지에 기재될 내용입니다.<br/>
              추후 추가 또는 수정 가능합니다.
            </IntlText>
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
          }}>{(proposal.descEn && proposal.descEn.length) || '0'} / 5000(<IntlText intlKey='common.maximum'>최대</IntlText>)</span>

          <FlexSpaceBetweenWrapper style={{ justifyContent: 'center', marginTop: 80 }}>
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
