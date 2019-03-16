import { FormWrapper } from 'components/atoms/ContentWrappers'
import { CFPFormStage } from 'lib/stores/CFPStore'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import { IntlText } from 'components/atoms/IntlText';
import { Button } from 'components/atoms/Button';
import { FlexSpaceBetweenWrapper } from 'components/atoms/FlexWrapper';
import { TEAL } from 'styles/colors';

interface State {
  desc: string,
  isPresentedBefore: boolean | null,
  placePresentedBefore: string,
  presentedSlideUrlBefore: string,
  question: string
}

@inject('stores')
@observer
export default class CFPFormStage3 extends React.Component<{stores: StoresType}, State> {
  state = {
    desc: '',
    isPresentedBefore: false,
    placePresentedBefore: '',
    presentedSlideUrlBefore: '',
    question: ''
  }

  render () {
    const { stores } = this.props

    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault()
          stores.cfpStore.createOrUpdatePresentation(this.state).then(() => {
            stores.cfpStore.setCurrentStage(CFPFormStage.stage4)
          })
        }}>
          <label><IntlText intlKey='asdfasdf'>
            제안의 상세한 내용
          </IntlText></label>
          <p><IntlText intlKey='asdfasdf'>
            내용이 많을 경우, 외부 문서 링크를 적어주시기 바랍니다.
          </IntlText></p>
          <input
            type='text'
            value={this.state.desc}
            onChange={e => this.setState({ desc: e.target.value })}
            aria-required={true}
            required
          />
          <fieldset>
            <legend><IntlText intlKey='asdfasdf'>
              이미 다른 곳에서 발표한 내용인가요?
            </IntlText></legend>
            <label><IntlText intlKey='asdfasdf'>
              예
            </IntlText></label>
            <input
              type='radio'
              value={'true'}
              aria-checked={this.state.isPresentedBefore === true}
              checked={this.state.isPresentedBefore === true}
              onChange={() => this.setState({ isPresentedBefore: true })}
            />
            <label><IntlText intlKey='asdfasdf'>
              아니오
            </IntlText></label>
            <input
              type='radio'
              value={'false'}
              aria-checked={this.state.isPresentedBefore === false}
              checked={this.state.isPresentedBefore === false}
              onChange={() => this.setState({ isPresentedBefore: false })}
            />
          </fieldset>
          <label><IntlText intlKey='asdfasdf'>
            발표한 행사
          </IntlText></label>
          <input
            type='text'
            value={this.state.placePresentedBefore}
            onChange={e => this.setState({ placePresentedBefore: e.target.value })}
          />
          <label><IntlText intlKey='asdfasdf'>
            발표 자료 링크
          </IntlText></label>
          <input
            type='text'
            value={this.state.presentedSlideUrlBefore}
            onChange={e => this.setState({ presentedSlideUrlBefore: e.target.value })}
          />
          <label><IntlText intlKey='asdfasdf'>
            참고 및 질문 사항
          </IntlText></label>
          <p><IntlText intlKey='asdfasdf'>
            검토자에게 알리고 싶은 내용을 자유롭게 적어주세요.
          </IntlText></p>
          <input
            type='text'
            value={this.state.question}
            onChange={e => this.setState({ question: e.target.value })}
          />
          <FlexSpaceBetweenWrapper style={{ marginTop: 80 }}>
            <Button
              tag='button'
              type='button'
              intlKey='adsfasdfa'
              color={TEAL}
              width={120}
              primary={false}
              onClick={() => {
                stores.cfpStore.setCurrentStage(CFPFormStage.stage2)
              }}
            >이전</Button>
            <div>
              <Button
                tag='button'
                type='button'
                intlKey='adsfasdfa'
                color={TEAL}
                width={120}
                primary={false}
                onClick={() => {
                  stores.cfpStore.createOrUpdatePresentation(this.state).then(() => {
                    alert('저장이 완료되었습니다')
                  })
                }}
              >임시 저장</Button>
              <Button
                tag='button'
                type='submit'
                intlKey='adsfasdfa'
                color={TEAL}
                width={120}
                style={{ marginLeft: 10 }}
              >다음</Button>
            </div>
          </FlexSpaceBetweenWrapper>
        </form>
      </FormWrapper>
    )
  }
}
