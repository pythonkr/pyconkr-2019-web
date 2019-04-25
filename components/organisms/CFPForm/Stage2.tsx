import { FormWrapper, SelectWrapper } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { StageButtonGroup } from 'components/organisms/CFPForm/StageButtonGroup'
import { DurationNode, LanguageNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import { CFPFormStage } from 'lib/stores/CFP/CFPStore'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import intl from 'react-intl-universal'

interface State {
  name: string | null,
  categoryId: string,
  difficultyId: string,
  backgroundDesc: string | null,
  duration: DurationNode | null,
  language: LanguageNode | null,
}

@inject('stores')
@observer
export default class CFPFormStage2 extends React.Component<{stores: StoresType; scrollRef: HTMLDivElement}, State> {
  state = {
    name: '',
    categoryId: '1',
    difficultyId: '1',
    backgroundDesc: '',
    duration: DurationNode.SHORT,
    language: LanguageNode.KOREAN,
  }

  async componentDidMount() {
    const { proposal } = this.props.stores.cfpStore

    if (!proposal) {
     return
    }

    this.setState({
      name: proposal.name,
      categoryId: proposal.category ? proposal.category.id : '1',
      difficultyId: proposal.difficulty ? proposal.difficulty.id : '1',
      backgroundDesc: proposal.backgroundDesc,
      duration: proposal.duration,
      language: proposal.language
    })

    this.props.scrollRef && window.scrollTo(0, this.props.scrollRef.offsetTop)
  }

  render () {
    const { stores } = this.props

    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault()
          stores.cfpStore.createOrUpdatePresentation(this.state).then(() => {
            stores.cfpStore.setCurrentStage(CFPFormStage.stage3)
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
          <StageButtonGroup
            onPrev={() => {
              stores.cfpStore.setCurrentStage(CFPFormStage.stage1)
            }}
            onSave={() => {
              stores.cfpStore.createOrUpdatePresentation(this.state).then(() => {
                alert(intl.get('contribute.talkProposal.application.stages.stages2.alert').d('저장이 완료되었습니다'))
              })
            }}
            isSubmit={false}
          />
        </form>
      </FormWrapper>
    )
  }
}
