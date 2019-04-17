import { Button } from 'components/atoms/Button'
import { FormWrapper, SelectWrapper } from 'components/atoms/ContentWrappers'
import { FlexSpaceBetweenWrapper } from 'components/atoms/FlexWrapper'
import { IntlText } from 'components/atoms/IntlText'
import { DurationNode, LanguageNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import { CFPStore } from 'lib/stores/CFP/CFPStore'
import { observer } from 'mobx-react'
import React from 'react'
import intl from 'react-intl-universal'
import { DEFAULT_TEXT_BLACK } from 'styles/colors'

type PropsType = {
  cfpStore: CFPStore;
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
    const { cfpStore } = this.props
    const { proposal } = cfpStore
    if (!proposal) return null

    return (
      <FormWrapper>
        <form onSubmit={this.onSubmitCFPEdit}>
          <label className='required'>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
              주제
            </IntlText>
          </label>
          <input
            type='text'
            value={proposal.name}
            onChange={e => proposal.setName(e.target.value)}
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
          <fieldset>
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
          <div role='group'>
            <fieldset>
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
            <fieldset>
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
            aria-required={true}
            style={{ height: 400, marginBottom: 5 }}
            required
          />
          <span style={{
            display: 'block',
            marginBottom: 40,
            textAlign: 'right',
            fontSize: 14,
            color: proposal.detailDesc.length >= 5000 ? 'red' : DEFAULT_TEXT_BLACK
          }}>{proposal.detailDesc.length} / 5000(최대)</span>
          <fieldset>
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
          {/*tslint:disable-next-line: react-a11y-required*/}
          <input
            type='text'
            value={proposal.placePresentedBefore}
            onChange={e => proposal.setPlacePresentedBefore(e.target.value)}
            disabled={!proposal.isPresentedBefore}
            required={proposal.isPresentedBefore}
            aria-required={proposal.isPresentedBefore}
          />
          <label className={proposal.isPresentedBefore ? 'required' : undefined}>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages3.item4'>
              발표 자료 링크
            </IntlText>
          </label>
           {/*tslint:disable-next-line: react-a11y-required*/}
          <input
            type='url'
            value={proposal.presentedSlideUrlBefore}
            onChange={e => proposal.setPresentedSlideUrlBefore(e.target.value)}
            disabled={!proposal.isPresentedBefore}
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
          />
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
