import { Button } from 'components/atoms/Button'
import { FormWrapper, SelectWrapper } from 'components/atoms/ContentWrappers'
import { FlexSpaceBetweenWrapper } from 'components/atoms/FlexWrapper'
import { IntlText } from 'components/atoms/IntlText'
import { isPast } from 'date-fns'
import { DurationNode, LanguageNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import { CFPStore } from 'lib/stores/CFP/CFPStore'
import { ScheduleStore } from 'lib/stores/Schedule/ScheduleStore'
import { observer } from 'mobx-react'
import React from 'react'
import intl from 'react-intl-universal'
import { DEFAULT_TEXT_BLACK } from 'styles/colors'
import i18next from 'i18next'

type PropsType = {
  cfpStore: CFPStore;
  scheduleStore: ScheduleStore;
  t: i18next.TFunction;
}

@observer
export default class CFPEdit extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props)
    this.onSubmitCFPEdit = this.onSubmitCFPEdit.bind(this)
  }

  validateSubmit() {
    const { cfpStore } = this.props
    const { proposal } = cfpStore
    if (proposal.detailDesc.length > 5000) {
      window.alert(`제안 내용이 5000자를 넘습니다.\n전체 내용은 별도 문서 링크로 남겨주시고 개요를 적어주세요.`)

      return
    }
  }

  async onSubmitCFPEdit (e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    const { cfpStore } = this.props
    this.validateSubmit()
    await cfpStore.createOrUpdatePresentationEdit()
    alert(intl.get('contribute.talkProposal.application.stages.stages2.alert').d('저장이 완료되었습니다'))
  }

  render () {
    const { cfpStore, scheduleStore } = this.props
    const { proposal } = cfpStore
    if (!proposal) return null

    const { presentationProposalFinishAt } = scheduleStore.schedule
    const isAcceptedProposal = isPast(presentationProposalFinishAt) && proposal.accepted
    return (
      <FormWrapper>
        <form onSubmit={this.onSubmitCFPEdit}>
          <label className='required'>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1-1'>
              발표 제목(한글)
            </IntlText>
          </label>
          <input
            type='text'
            value={proposal.nameKo}
            onChange={e => proposal.setNameKo(e.target.value)}
            disabled={isAcceptedProposal}
            aria-required={true}
            required
          />
          <label className='required'>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1-2'>
            발표 제목(영어)
            </IntlText>
          </label>
          <input
            type='text'
            value={proposal.nameEn}
            onChange={e => proposal.setNameEn(e.target.value)}
            disabled={isAcceptedProposal}
            aria-required={true}
            required
          />
          <label className='required'>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item2'>
              세션 카테고리
            </IntlText>
          </label>
          <SelectWrapper>
            {/* tslint:disable-next-line:react-a11y-no-onchange */}
            <select
              value={proposal.categoryId}
              onBlur={e => proposal.setCategoryId(e.target.value)}
              onChange={e => proposal.setCategoryId(e.target.value)}
              disabled={isAcceptedProposal}
              aria-required={true}
              required
            >
              {cfpStore.categories.map(category =>
                  <option
                    key={category.id}
                    aria-selected={proposal.categoryId === 'category.id' }
                    value={category.id}
                  >{category.name}</option>
              )}
            </select>
          </SelectWrapper>
          <fieldset disabled={isAcceptedProposal}>
            <legend className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item3'>
                세션 난이도
              </IntlText>
            </legend>
            {cfpStore.difficulties.map(difficulty =>
                <p key={difficulty.id}>
                  <input
                    type='radio'
                    id={difficulty.name}
                    value={difficulty.id}
                    aria-checked={proposal.difficultyId === difficulty.id}
                    checked={proposal.difficultyId === difficulty.id}
                    onChange={() => proposal.setDifficultyId(difficulty.id)}>
                  </input>
                  <label htmlFor={difficulty.name}>{difficulty.name}</label>
                </p>
            )}
          </fieldset>
          <label className='required'>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item4'>
              세션을 이해하는 데에 필요한 선수 지식
            </IntlText>
          </label>
          <input
            type='text'
            value={proposal.backgroundDesc}
            onChange={e => proposal.setBackgroundDesc(e.target.value)}
            aria-required={true}
            required
          />
          {isAcceptedProposal && <>
            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages3.item1.sub1-1'>
                발표 소개(한글)
              </IntlText>
            </label>
            <p><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item1.desc1'>
              국문 350자 내외, 영문 700자 내외
            </IntlText></p>
            <textarea
              value={proposal.descKo}
              onChange={e => proposal.setDescKo(e.target.value)}
              style={{ height: 400, marginBottom: 5 }}
              aria-required={true}
              required
            />
            <div style={{textAlign: 'right'}}>
              <span style={{
                color: proposal.descKo.length < 20 ? 'red ' : 'black'
              }}>
                {proposal.descKo.length}
              </span>/700
            </div>

            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages3.item1.sub1-2'>
                발표 소개(영문)
              </IntlText>
            </label>
            <p><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item1.desc1'>
              국문 350자 내외, 영문 700자 내외
            </IntlText></p>
            <textarea
              value={proposal.descEn}
              onChange={e => proposal.setDescEn(e.target.value)}
              style={{ height: 400, marginBottom: 5 }}
              aria-required={true}
              required
            />
            <div style={{textAlign: 'right'}}>
              <span style={{
                color: proposal.descEn.length < 20 ? 'red ' : 'black'
              }}>
                {proposal.descEn.length}
              </span>/700
            </div>
          </>}
          <div role='group'>
            <fieldset disabled={isAcceptedProposal} style={{ width: '50%' }}>
              <legend className='required'>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item5.header'>
                  세션 길이
                </IntlText>
              </legend>
              <p>
                <input
                  type='radio'
                  id={DurationNode.SHORT}
                  value={DurationNode.SHORT}
                  aria-checked={proposal.duration === DurationNode.SHORT}
                  checked={proposal.duration === DurationNode.SHORT}
                  onChange={() => proposal.setDuration(DurationNode.SHORT)}
                />
                <label htmlFor={DurationNode.SHORT}>
                  <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item5.sub1'>
                    25분
                  </IntlText>
                </label>
              </p>
              <p>
                <input
                  type='radio'
                  id={DurationNode.LONG}
                  value={DurationNode.LONG}
                  aria-checked={proposal.duration === DurationNode.LONG}
                  checked={proposal.duration === DurationNode.LONG}
                  onChange={() => proposal.setDuration(DurationNode.LONG)}
                />
                <label htmlFor={DurationNode.LONG}>
                  <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item5.sub2'>
                    45분
                  </IntlText>
                </label>
              </p>
            </fieldset>
            <fieldset disabled={isAcceptedProposal} style={{ width: '50%' }}>
              <legend className='required'>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item6.header'>
                  언어
                </IntlText>
              </legend>
              <p>
                <input
                  type='radio'
                  id={LanguageNode.KOREAN}
                  value={LanguageNode.KOREAN}
                  aria-checked={proposal.language === LanguageNode.KOREAN}
                  checked={proposal.language === LanguageNode.KOREAN}
                  onChange={() => proposal.setLanguage(LanguageNode.KOREAN)}
                />
                <label htmlFor={LanguageNode.KOREAN}>
                  <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item6.sub1'>
                    한국어
                  </IntlText>
                </label>
              </p>
              <p>
                <input
                  type='radio'
                  id={LanguageNode.ENGLISH}
                  value={LanguageNode.ENGLISH}
                  aria-checked={proposal.language === LanguageNode.ENGLISH}
                  checked={proposal.language === LanguageNode.ENGLISH}
                  onChange={() => proposal.setLanguage(LanguageNode.ENGLISH)}
                />
                <label htmlFor={LanguageNode.ENGLISH}>
                  <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item6.sub2'>
                    영어
                  </IntlText>
                </label>
              </p>
            </fieldset>
          </div>
          <label className='required'>
            <IntlText intlKey='contribute.talkProposal.application.slideUrl'>
              슬라이드 주소
            </IntlText>
          </label>
          <p><IntlText intlKey='contribute.talkProposal.application.slideUrlDesc'>
            Google Slide나 Slideshare 등에 업로드한 이후 해당 링크를 입력해주세요.
            </IntlText></p>
          <input
            type='text'
            value={proposal.slideUrl}
            onChange={e => proposal.setSlideUrl(e.target.value)}
            disabled={!isAcceptedProposal}
            aria-required={true}
            required
          />
          {
            // TODO: 불필요한 내용 제거 내년에 살려주세요 :)
            /* <label className='required'>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages3.item1.sub1'>
              제안의 상세한 내용
            </IntlText>
          </label>
          <p><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item1.desc1'>
            내용이 많을 경우, 개요와 함께 외부 문서 링크를 적어주시기 바랍니다.
          </IntlText></p>
          <textarea
            value={proposal.detailDesc}
            onChange={e => proposal.setDetailDesc(e.target.value)}
            style={{ height: 400, marginBottom: 5 }}
            disabled={isAcceptedProposal}
            aria-required={true}
            required
          />
          <span style={{
            display: 'block',
            marginBottom: 40,
            textAlign: 'right',
            fontSize: 14,
            color: proposal.detailDesc.length >= 5000 ? 'red' : DEFAULT_TEXT_BLACK
          }}>{proposal.detailDesc.length} / 5000(최대)</span>
          <fieldset disabled={isAcceptedProposal}>
            <legend className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages3.item2.header'>
                이미 다른 곳에서 발표한 내용인가요?
              </IntlText>
            </legend>
            <p>
              <input
                type='radio'
                value={'true'}
                id='isPresentedBefore-true'
                aria-checked={proposal.isPresentedBefore === true}
                checked={proposal.isPresentedBefore === true}
                onChange={() => proposal.setIsPresentationBefore(true)}
              />
              <label htmlFor='isPresentedBefore-true'><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item2.button1'>
                예
              </IntlText></label>
            </p>
            <p>
              <input
                type='radio'
                value={'false'}
                id='isPresentedBefore-false'
                aria-checked={proposal.isPresentedBefore === false}
                checked={proposal.isPresentedBefore === false}
                onChange={() => proposal.setIsPresentationBefore(false)}
              />
              <label htmlFor='isPresentedBefore-false'><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item2.button2'>
                아니오
              </IntlText></label>
            </p>
          </fieldset>
          <label className={proposal.isPresentedBefore ? 'required' : undefined}>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages3.item3'>
              발표한 행사
            </IntlText>
          </label>
          <input
            type='text'
            value={proposal.placePresentedBefore}
            onChange={e => proposal.setPlacePresentedBefore(e.target.value)}
            disabled={!proposal.isPresentedBefore || isAcceptedProposal}
            aria-required={proposal.isPresentedBefore}
            required={proposal.isPresentedBefore}
          />
          <label className={proposal.isPresentedBefore ? 'required' : undefined}>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages3.item4'>
              발표 자료 링크
            </IntlText>
          </label>
          <input
            type='url'
            value={proposal.presentedSlideUrlBefore}
            onChange={e => proposal.setPresentedSlideUrlBefore(e.target.value)}
            disabled={!proposal.isPresentedBefore || isAcceptedProposal}
            required={proposal.isPresentedBefore}
            aria-required={proposal.isPresentedBefore}
          />
          <label><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item5.header'>
            참고 및 질문 사항
          </IntlText></label>
          <p><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item5.desc1'>
            검토자에게 알리고 싶은 내용을 자유롭게 적어주세요.
          </IntlText></p>
          <input
            type='text'
            value={proposal.comment}
            onChange={e => proposal.setComment(e.target.value)}
            disabled={isAcceptedProposal}
          /> */}
          <FlexSpaceBetweenWrapper style={{ justifyContent: 'center', marginTop: 80 }}>
            <Button
              tag='button'
              intlKey='asdlfkaslkfdj'
              type='submit'
              width={300}
            >발표안 수정 제출하기</Button>
          </FlexSpaceBetweenWrapper>
        </form>
      </FormWrapper>
    )
  }
}
