import { Button } from 'components/atoms/Button'
import { FormWrapper, SelectWrapper } from 'components/atoms/ContentWrappers'
import { FlexSpaceBetweenWrapper } from 'components/atoms/FlexWrapper'
import { IntlText } from 'components/atoms/IntlText'
import { DurationNode, LanguageNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import { CFPFormStage } from 'lib/stores/CFPStore'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import { DEFAULT_TEXT_BLACK, TEAL } from 'styles/colors'
import intl from 'react-intl-universal'

/* tslint:disable:react-a11y-required  */

interface State {
  name: string | null,
  categoryId: string,
  difficultyId: string,
  backgroundDesc: string | null,
  duration: DurationNode | null,
  language: LanguageNode | null,
  detailDesc: string,
  isPresentedBefore: boolean | null,
  placePresentedBefore: string,
  presentedSlideUrlBefore: string,
  comment: string
}

@inject('stores')
@observer
export default class CFPEdit extends React.Component<{stores: StoresType; onCancel: VoidFunction}, State> {
  state = {
    name: '',
    categoryId: '1',
    difficultyId: '1',
    backgroundDesc: '',
    duration: DurationNode.SHORT,
    language: LanguageNode.KOREAN,
    detailDesc: '',
    isPresentedBefore: false,
    placePresentedBefore: '',
    presentedSlideUrlBefore: '',
    comment: ''
  }

  async componentDidMount() {
    const { proposal } = this.props.stores.cfpStore

    if (!proposal) {
      return
    }

    this.setState({
      name: proposal.name,
      categoryId: proposal.category!.id,
      difficultyId: proposal.difficulty!.id,
      backgroundDesc: proposal.backgroundDesc,
      duration: proposal.duration,
      language: proposal.language,
      detailDesc: proposal.detailDesc,
      isPresentedBefore: proposal.isPresentedBefore,
      placePresentedBefore: proposal.placePresentedBefore,
      presentedSlideUrlBefore: proposal.presentedSlideUrlBefore,
      comment: proposal.comment
    })
  }

  render () {
    const { stores } = this.props

    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault()
          if (this.state.detailDesc.length > 5000) {
            window.alert(`제안 내용이 5000자를 넘습니다.\n전체 내용은 별도 문서 링크로 남겨주시고 개요를 적어주세요.`)
            return
          }
          stores.cfpStore.createOrUpdatePresentation({
            ...this.state
          }).then(() => {
            alert(intl.get('contribute.talkProposal.application.stages.stages2.alert').d('저장이 완료되었습니다'))
          })
        }}>
          <label className='required'>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
              주제
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
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item2'>
              세션 카테고리
            </IntlText>
          </label>
          <SelectWrapper>
            {/* tslint:disable-next-line:react-a11y-no-onchange */}
            <select
              value={this.state.categoryId}
              onBlur={e => this.setState({ categoryId: e.target.value })}
              onChange={e => this.setState({ categoryId: e.target.value })}
              aria-required={true}
              required
            >
              {
                stores.cfpStore.categories.map(category =>
                  <option
                    key={category.id}
                    aria-selected={this.state.categoryId === 'category.id' }
                    value={category.id}
                  >{category.name}</option>
                )
              }
            </select>
          </SelectWrapper>
          <fieldset>
            <legend className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item3'>
                세션 난이도
              </IntlText>
            </legend>
            {
              stores.cfpStore.difficulties.map(difficulty =>
                <p key={difficulty.id}>
                  <input
                    type='radio'
                    id={difficulty.name}
                    value={difficulty.id}
                    aria-checked={this.state.difficultyId === difficulty.id}
                    checked={this.state.difficultyId === difficulty.id}
                    onChange={() => this.setState({ difficultyId: difficulty.id })}>
                  </input>
                  <label htmlFor={difficulty.name}>{difficulty.name}</label>
                </p>
              )
            }
          </fieldset>
          <label className='required'>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item4'>
              세션을 이해하는 데에 필요한 선수 지식
            </IntlText>
          </label>
          <input
            type='text'
            value={this.state.backgroundDesc}
            onChange={e => this.setState({ backgroundDesc: e.target.value })}
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
                  aria-checked={this.state.duration === DurationNode.SHORT}
                  checked={this.state.duration === DurationNode.SHORT}
                  onChange={() => this.setState({ duration: DurationNode.SHORT })}
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
                  aria-checked={this.state.duration === DurationNode.LONG}
                  checked={this.state.duration === DurationNode.LONG}
                  onChange={() => this.setState({ duration: DurationNode.LONG })}
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
                  aria-checked={this.state.language === LanguageNode.KOREAN}
                  checked={this.state.language === LanguageNode.KOREAN}
                  onChange={() => this.setState({ language: LanguageNode.KOREAN })}
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
                  aria-checked={this.state.language === LanguageNode.ENGLISH}
                  checked={this.state.language === LanguageNode.ENGLISH}
                  onChange={() => this.setState({ language: LanguageNode.ENGLISH })}
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
            value={this.state.detailDesc}
            onChange={e => this.setState({ detailDesc: e.target.value })}
            aria-required={true}
            style={{ height: 400, marginBottom: 5 }}
            required
          />
          <span style={{
            display: 'block',
            marginBottom: 40,
            textAlign: 'right',
            fontSize: 14,
            color: this.state.detailDesc.length >= 5000 ? 'red' : DEFAULT_TEXT_BLACK
          }}>{this.state.detailDesc.length} / 5000(최대)</span>
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
                aria-checked={this.state.isPresentedBefore === true}
                checked={this.state.isPresentedBefore === true}
                onChange={() => this.setState({ isPresentedBefore: true })}
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
                aria-checked={this.state.isPresentedBefore === false}
                checked={this.state.isPresentedBefore === false}
                onChange={() => this.setState({ isPresentedBefore: false })}
              />
              <label htmlFor='isPresentedBefore-false'><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item2.button2'>
                아니오
              </IntlText></label>
            </p>
          </fieldset>
          <label className={this.state.isPresentedBefore ? 'required' : undefined}>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages3.item3'>
              발표한 행사
            </IntlText>
          </label>
          <input
            type='text'
            value={this.state.placePresentedBefore}
            onChange={e => this.setState({ placePresentedBefore: e.target.value })}
            disabled={!this.state.isPresentedBefore}
            required={this.state.isPresentedBefore}
            aria-required={this.state.isPresentedBefore}
          />
          <label className={this.state.isPresentedBefore ? 'required' : undefined}>
            <IntlText intlKey='contribute.talkProposal.application.stages.stages3.item4'>
              발표 자료 링크
            </IntlText>
          </label>
          <input
            type='url'
            value={this.state.presentedSlideUrlBefore}
            onChange={e => this.setState({ presentedSlideUrlBefore: e.target.value })}
            disabled={!this.state.isPresentedBefore}
            required={this.state.isPresentedBefore}
            aria-required={this.state.isPresentedBefore}
          />
          <label><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item5.header'>
            참고 및 질문 사항
          </IntlText></label>
          <p><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item5.desc1'>
            검토자에게 알리고 싶은 내용을 자유롭게 적어주세요.
          </IntlText></p>
          <input
            type='text'
            value={this.state.comment}
            onChange={e => this.setState({ comment: e.target.value })}
          />
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
            >발표안 수정 제출하기</Button>
          </FlexSpaceBetweenWrapper>
        </form>
      </FormWrapper>
    )
  }
}
