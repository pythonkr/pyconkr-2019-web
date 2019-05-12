import { FormWrapper } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { StageButtonGroup } from 'components/organisms/CFPForm/StageButtonGroup'
import { CFPFormStage } from 'lib/stores/CFP/CFPStore'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import { DEFAULT_TEXT_BLACK } from 'styles/colors'

/* tslint:disable:react-a11y-required  */

interface State {
  detailDesc: string,
  isPresentedBefore: boolean | null,
  placePresentedBefore: string,
  presentedSlideUrlBefore: string,
  comment: string
}

@inject('stores')
@observer
export default class CFPFormStage3 extends React.Component<{stores: StoresType; scrollRef: HTMLDivElement}, State> {
  state = {
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
      detailDesc: proposal.detailDesc,
      isPresentedBefore: proposal.isPresentedBefore,
      placePresentedBefore: proposal.placePresentedBefore,
      presentedSlideUrlBefore: proposal.presentedSlideUrlBefore,
      comment: proposal.comment
    })

    this.props.scrollRef && window.scrollTo(0, this.props.scrollRef.offsetTop)
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
          stores.cfpStore.createOrUpdatePresentation(this.state).then(() => {
            stores.cfpStore.setCurrentStage(CFPFormStage.stage4)
          })
        }}>
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
          <StageButtonGroup
            onPrev={() => {
              stores.cfpStore.setCurrentStage(CFPFormStage.stage2)
            }}
            onSave={() => {
              stores.cfpStore.createOrUpdatePresentation(this.state).then(() => {
                alert('저장이 완료되었습니다')
              })
            }}
            isSubmit={true}
          />
        </form>
      </FormWrapper>
    )
  }
}
