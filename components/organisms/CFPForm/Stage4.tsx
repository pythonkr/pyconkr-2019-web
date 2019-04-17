import { Button } from 'components/atoms/Button'
import { AgreementFieldset, FormWrapper } from 'components/atoms/ContentWrappers'
import { FlexSpaceBetweenWrapper } from 'components/atoms/FlexWrapper'
import { IntlText } from 'components/atoms/IntlText'
import { CFPFormStage } from 'lib/stores/CFP/CFPStore'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import { TEAL } from 'styles/colors'

interface State {
  isCocAgreed: boolean,
  isContentsAgreed: boolean,
  isEtcAgreed: boolean,
}

@inject('stores')
@observer
export default class CFPFormStage4 extends React.Component<{stores: StoresType; scrollRef: HTMLDivElement}, State> {
  state = {
    isCocAgreed: false,
    isContentsAgreed: false,
    isEtcAgreed: false,
  }

  async componentDidMount() {
    const { proposal } = this.props.stores.cfpStore
    if (!proposal) {
     return
    }
    if (proposal.isAgreed) {
      this.setState({
        isCocAgreed : true,
        isContentsAgreed : true,
        isEtcAgreed : true,
      })
    }
    this.props.scrollRef && window.scrollTo(0, this.props.scrollRef.offsetTop)
  }

  render () {
    const { stores } = this.props

    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault()
          stores.cfpStore.createOrUpdatePresentation({
            submitted: true
          }).then(() => {
            stores.cfpStore.setCurrentStage(CFPFormStage.completed)
          })
        }}>
          <AgreementFieldset>
            <legend><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item1.header'>
              파이콘 한국 행동 강령
            </IntlText></legend>
            <p><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item1.desc1'>
              파이콘 한국은 다양한 사람들이 만나서 교류하는 곳입니다.
              커뮤니티의 모든 참여자들이 신체적, 정신적 위협을 느끼지 않고 서로 존중받고 환영받는 경험을 하기 바랍니다.
              이를 위해 발표자를 포함한 모든 참가자들은 파이콘 한국 행동규범(CoC)을 준수해야 합니다.
            </IntlText></p>
            <ul>
              <li><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item1.desc1-1'>
                파이콘 한국 참여자는 성별, 성적 지향, 장애, 외모, 신체사이즈, 인종, 종교 등
                다양한 개인의 환경에 의해 차별받지 않아야 합니다.
              </IntlText></li>
              <li><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item1.desc1-2'>
                발표자료가 CoC를 심각하게 위반했다고 판단되는 경우 수정을 요청할 수 있으며
                이에 응하지 않을 경우 발표가 취소될 수 있습니다.
              </IntlText></li>
              <li><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item1.desc1-3'>
                CoC의 내용은 수시로 업데이트 될 수 있으며 내용이 업데이트되는 경우
                준비위원회에서 재동의를 요구할 수 있습니다.
              </IntlText></li>
            </ul>
            <input
              type='checkbox'
              id='coc-agreed'
              aria-checked={this.state.isCocAgreed}
              checked={this.state.isCocAgreed}
              onChange={() => this.setState({ isCocAgreed: !this.state.isCocAgreed })}
            />
            <label htmlFor='coc-agreed'><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item1.agree'>
              위 내용을 확인 하였으며 파이콘 한국 CoC를 준수할 것을 약속합니다.
            </IntlText></label>
          </AgreementFieldset>
          <hr />
          <AgreementFieldset>
            <legend><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item2.header'>
              발표 윤리
            </IntlText></legend>
            <p><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item2.desc1'>
              파이콘 한국의 모든 발표는 상호 신뢰와 존중을 바탕으로 이루어집니다.
              이에 모든 발표는 다음과 같은 발표 윤리를 따라야 합니다.
            </IntlText></p>
            <ul>
              <li><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item2.desc1-1'>
                다른 사람의 창작물을 사용할 경우 원 저작권자의 권리를 지켜야 합니다.
              </IntlText></li>
              <li><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item2.desc1-2'>
                발표 자료에 회사 업무와 관련된 내용과 같은 민감 내용이 포함될 경우 소속 단체의 동의를 받아야 합니다.
              </IntlText></li>
              <li><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item2.desc1-3'>
                지원시 제안한 내용과 동일한 내용의 발표를 해야 합니다.
              </IntlText></li>
              <li><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item2.desc1-4'>
                의도적으로 조작되거나 사실과 다른 데이터를 사용하지 않아야 합니다.
              </IntlText></li>
            </ul>
            <input
              type='checkbox'
              id='ethics-agreed'
              aria-checked={this.state.isContentsAgreed}
              checked={this.state.isContentsAgreed}
              onChange={() => this.setState({ isContentsAgreed: !this.state.isContentsAgreed })}
            />
            <label htmlFor='ethics-agreed'><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item2.agree'>
              위 내용을 확인하였으며 이를 준수하지 않았을 경우 본인에게 책임이 있으며
              위반된 사항이 발견될 경우 발표자 선정이 취소될 수 있음에 동의합니다.
            </IntlText></label>
          </AgreementFieldset>
          <hr />
          <AgreementFieldset>
            <legend><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item3.header'>
              발표 공유
            </IntlText></legend>
            <p><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item3.desc1'>
              파이콘 한국은 기술 경험을 공유하며 함께 성장하는 커뮤니티를 지향합니다.
              따라서 모든 발표의 슬라이드 및 발표 영상은 지식 공유를 위해 공개됩니다.
            </IntlText></p>
            <ul>
              <li><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item3.desc1-1'>
                회사 기밀, 저작권 등 민감한 부분이 포함된 경우 공개용 버전의 슬라이드를 준비해주시기 바랍니다.
              </IntlText></li>
              <li><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item3.desc1-2'>
                만약 발표 영상을 공개하지 않아야 한다면 파이콘 한국 준비위원회에 별도로 연락을 해주시기 바랍니다.
                (program@pycon.kr)
              </IntlText></li>
            </ul>
            <input
              type='checkbox'
              id='sharing-agreed'
              aria-checked={this.state.isEtcAgreed}
              checked={this.state.isEtcAgreed}
              onChange={() => this.setState({ isEtcAgreed: !this.state.isEtcAgreed })}
            />
            <label htmlFor='sharing-agreed'><IntlText intlKey='contribute.talkProposal.application.stages.stages4.item3.agree'>
              위 내용을 충분히 숙지하였습니다.
            </IntlText></label>
          </AgreementFieldset>
          <FlexSpaceBetweenWrapper style={{ marginTop: 80 }}>
            <Button
              tag='button'
              type='button'
              intlKey='contribute.talkProposal.application.stages.common.button.previous'
              color={TEAL}
              width={120}
              primary={false}
              onClick={() => {
                stores.cfpStore.setCurrentStage(CFPFormStage.stage3)
              }}
            >이전</Button>
            <Button
              tag='button'
              intlKey='contribute.talkProposal.application.stages.stages4.proposeButton'
              type='submit'
              width={300}
              disabled={
                !this.state.isCocAgreed ||
                !this.state.isContentsAgreed ||
                !this.state.isEtcAgreed
              }
            >발표안 제출하기</Button>
          </FlexSpaceBetweenWrapper>
        </form>
      </FormWrapper>
    )
  }
}
