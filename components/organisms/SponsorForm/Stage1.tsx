import { Button } from 'components/atoms/Button'
import { AgreementFieldset, FormWrapper } from 'components/atoms/ContentWrappers'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import { IntlText } from 'components/atoms/IntlText'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import { paths } from 'routes/paths'
import { TEAL } from 'styles/colors'

interface State {
  isCocAgreed: boolean,
  isPrivacyAgreed: boolean,
  isLogoAgreed: boolean,
  isRefundAgreed: boolean
}

@inject('stores')
@observer
export default class SponsorFormStage1 extends React.Component<{
  stores: StoresType;
  scrollRef: HTMLDivElement;
  toNextStage: Function;
}, State> {
  state = {
    isCocAgreed: false,
    isPrivacyAgreed: false,
    isLogoAgreed: false,
    isRefundAgreed: false,
  }

  async componentDidMount() {
    this.props.scrollRef && window.scrollTo(0, this.props.scrollRef.offsetTop)
  }

  render () {
    const { stores } = this.props

    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault()
          // stores.cfpStore.createOrUpdatePresentation({
          //   submitted: true
          // }).then(() => {
          //   stores.cfpStore.setCurrentStage(CFPFormStage.completed)
          // })
        }}>
          <AgreementFieldset>
            <legend><IntlText intlKey='asdfasdf'>
              파이콘 2019 후원 약관
            </IntlText></legend>
            <p><IntlText intlKey='asdfasdf'>
              파이콘 한국 2019에 후원을 통해 파이썬 커뮤니티의 일원으로 함께하고자 하는 의사를 밝혀주셔서 정말 감사합니다. 후원 진행 시 숙지하셔야 할 사항들을 안내드립니다.
            </IntlText></p>
            <p style={{ position: 'relative'}}>
              <input
                type='checkbox'
                id='terms-consent'
                onChange={(event) =>
                  this.setState({
                    isCocAgreed: event.target.checked,
                    isPrivacyAgreed: event.target.checked,
                    isLogoAgreed: event.target.checked,
                    isRefundAgreed: event.target.checked
                  })
                }
              />
              <label htmlFor='terms-consent'>
                <IntlText intlKey='agreement.agreeTermsOfService'>아래 내용을 포함한 후원사 약관에 모두 동의합니다.</IntlText>
              </label>
            </p>
          </AgreementFieldset>
          <hr />
          <AgreementFieldset>
            <legend><IntlText intlKey='asdfasdf'>
            파이콘 한국 행동강령
            </IntlText></legend>
            <p><IntlText intlKey='asdfasdf'>
              파이콘 한국은 다양한 사람들이 만나서 교류하는 곳입니다. 커뮤니티의 모든 참여자들이 신체적, 정신적 위협을 느끼지 않고 서로 존중받고 환영받는 경험을 하기 바랍니다. 이를 위해 후원사를 포함한 모든 참가자들은 파이콘 한국 행동 강령(CoC)을 준수해야 합니다. 
            </IntlText></p>
            <ul>
              <li><IntlText intlKey='asdfasdf'>
              해당 기업이 참여자들의 신체적, 정신적 안정을 크게 위협한다고 판단되는 경우 해당 단체의 스폰싱을 거절 및 중단할 수 있습니다.
              </IntlText></li>
              <li><IntlText intlKey='asdfasdf'>
              후원사는 일반 참여자보다 더 많은 기간을 커뮤니티와 함께 하게 됩니다. 아래의 모든 과정에서 파이콘 행동 강령을 준수해주세요.
              </IntlText>
                <ul>
                  <li><IntlText intlKey='asdfasdf'>
                  행사 준비 과정 (위원회와의 커뮤니케이션)
                  </IntlText>
                    <ul>
                      <li><IntlText intlKey='asdfasdf'>
                      파이콘 한국 준비위원회는 자원봉사자로 이루어진 조직입니다.
                      </IntlText>
                      </li>
                      <li><IntlText intlKey='asdfasdf'>
                      메일 답변 등의 커뮤니케이션 과정에서 시간이 지체될 수 있음을 양해해주세요. 
                      </IntlText>
                      </li>
                    
                    </ul>
                  </li>
                  <li><IntlText intlKey='asdfasdf'>
                  홍보 (보도자료, SNS 마케팅 등)
                  </IntlText></li>
                  <li><IntlText intlKey='asdfasdf'>
                  부스 운영
                  </IntlText></li>
                  <li><IntlText intlKey='asdfasdf'>
                  참여자와의 점심 식사
                  </IntlText></li>
                  <li><IntlText intlKey='asdfasdf'>
                  발표
                  </IntlText></li>
                </ul>
              </li>
              <li><IntlText intlKey='asdfasdf'>
              컨퍼런스 진행 중에 후원사의 일원이 행동 강령을 지키지 않은 경우에는 일반 참여자와 같은 과정으로 위반 사례를 접수, 대응합니다.
              </IntlText></li>
              <li><IntlText intlKey='asdfasdf'>
              컨퍼런스 중 후원사 프로그램 또는 부스에서 행동 강령 위반 사례가 발생한 경우 시정 조치, 퇴장, 부스 철수 등 파이콘 한국 준비위원회가 적절하다고 판단하는 조치를 취할 수 있습니다.
              </IntlText>
                <ul>
                  <li><IntlText intlKey='asdfasdf'>
                  부스 운영 인력이 잘못한 경우(회사의 일원으로 프로그램의 진행에 참여하고 있다고 인지가 되는 경우)
                  </IntlText></li>
                  <li><IntlText intlKey='asdfasdf'>
                  부스 프로그램에 문제가 있다고 판단한 경우
                  </IntlText></li>
                </ul>
              </li>
              <li><IntlText intlKey='asdfasdf'>
              준비위원회 또한 위의 모든 과정에서 행동규범에 따라 후원사와 커뮤니케이션할 것입니다. 혹시 준비위원회 또는 다른 일반 참여자가 후원사에 대하여 행동 강령을 위반할 경우가 생긴다면 행동 강령 위반 사례 접수 절차에 따라 문의해주세요.
              </IntlText></li>
            </ul>
            <input
              type='checkbox'
              id='coc-agreed'
              aria-checked={this.state.isCocAgreed}
              checked={this.state.isCocAgreed}
              onChange={() => this.setState({ isCocAgreed: !this.state.isCocAgreed })}
            />
            <label htmlFor='coc-agreed'><IntlText intlKey='asdfasdf'>
            위 내용을 확인 하였으며 파이콘 한국 행동 강령을 준수할 것을 약속합니다.
            </IntlText></label>
          </AgreementFieldset>
          <hr />
          <AgreementFieldset>
            <legend><IntlText intlKey='asdfasdf'>
            개인 정보
            </IntlText></legend>
            <p><IntlText intlKey='asdfasdf'>
            파이콘에서는 참가자의 개인 정보를 제공하지 않습니다. 다만 부스, 점심 등에서 구인 활동을 하면서 참여자의 동의 하에 자체적으로 수집하는 건 가능합니다.
            </IntlText></p>
            <input
              type='checkbox'
              id='privacy-agreed'
              aria-checked={this.state.isPrivacyAgreed}
              checked={this.state.isPrivacyAgreed}
              onChange={(e) => this.setState({ isPrivacyAgreed: e.target.checked })}
            />
            <label htmlFor='privacy-agreed'><IntlText intlKey='asdfasdf'>
            위 내용을 충분히 숙지하였습니다.
            </IntlText></label>
          </AgreementFieldset>
          <hr />
          <AgreementFieldset>
            <legend><IntlText intlKey='asdfasdf'>
              후원사 및 파이콘 한국 로고
            </IntlText></legend>
            <ul>
              <li><IntlText intlKey='asdfasdf'>
              선택하신 후원사 패키지에 명시된 곳에만 후원사의 로고가 노출됩니다.
              </IntlText></li>
              <li><IntlText intlKey='asdfasdf'>
              다만 혜택의 세부 내용(부스의 상세한 크기 등)은 현장 상황에 따라 일부 조정될 수 있습니다.
              </IntlText></li>
              <li><IntlText intlKey='asdfasdf'>
              제공되는 파이콘 로고와 에셋은 홍보에 사용이 가능하지만 파이콘 한국과 상의되지 않은 일체의 프로그램에는 사용할 수 없습니다.
              </IntlText></li>
            </ul>
            <input
              type='checkbox'
              id='logo-agreed'
              aria-checked={this.state.isLogoAgreed}
              checked={this.state.isLogoAgreed}
              onChange={(e) => this.setState({ isLogoAgreed: e.target.checked })}
            />
            <label htmlFor='sharing-agreed'><IntlText intlKey='asdfasdf'>
              위 내용을 충분히 숙지하였습니다.
            </IntlText></label>
          </AgreementFieldset>
          <hr />
          <AgreementFieldset>
            <legend><IntlText intlKey='asdfasdf'>
              입금 및 환불 규정
            </IntlText></legend>
            <ul>
              <li><IntlText intlKey='asdfasdf'>
              각 후원 패키지별로 한정된 수의 후원사를 모집하고 있으므로 후원 여부는 입금순으로 확정됩니다.
              </IntlText></li>
              <li><IntlText intlKey='asdfasdf'>
              모든 세무 절차는 사단법인 파이썬사용자모임에 의해 진행됩니다.
              </IntlText></li>
              <li><IntlText intlKey='asdfasdf'>
              입금 후 후원 확정까지의 절차는 아래와 같습니다.
              </IntlText>
                <ul>
                  <li><IntlText intlKey='asdfasdf'>
                  1. 현재 작성 중인 후원사 신청서를 제출합니다.
                  </IntlText></li>
                  <li><IntlText intlKey='asdfasdf'>
                  2. 제출 완료 화면에서 후원금 입금 계좌 및 금액을 확인하고, 입금합니다.
                  </IntlText></li>
                  <li><IntlText intlKey='asdfasdf'>
                  ※ 혹시 입금 전에 별도 양식의 계약서 작성이 필요하거나 후원 패키지 결정에 대해 고민이 있으신 경우는 후원사 신청 후 메일로 문의를 주시면 자리를 홀드해드립니다.
                  </IntlText></li>
                </ul>
              </li>
              <li><IntlText intlKey='asdfasdf'>
              파이콘 한국 후원 환불 규정은 다음과 같습니다.
              </IntlText>
                <ul>
                  <li><IntlText intlKey='asdfasdf'>
                  N일 전: N%
                  </IntlText></li>
                  <li><IntlText intlKey='asdfasdf'>
                  N주 전: N%
                  </IntlText></li>
                  <li><IntlText intlKey='asdfasdf'>
                  ※  파이콘 한국 준비위원회의 요청으로 후원이 취소될 경우: 시점에 관계 없이 100%
(단, 후원금액 이외에 후원을 위해 별도로 사용하신 금액에 대해서는 배상하지 않습니다.)
                  </IntlText></li>
                </ul>
              </li>
            </ul>
            <input
              type='checkbox'
              id='logo-agreed'
              aria-checked={this.state.isRefundAgreed}
              checked={this.state.isRefundAgreed}
              onChange={(e) => this.setState({ isRefundAgreed: e.target.checked })}
            />
            <label htmlFor='sharing-agreed'><IntlText intlKey='asdfasdf'>
              위 내용을 충분히 숙지하였습니다.
            </IntlText></label>
          </AgreementFieldset>
          <FlexCenterWrapper style={{ marginTop: 80 }}>
            <Button
              tag='button'
              intlKey='asdlfkaslkfdj'
              type='submit'
              color={TEAL}
              size='big'
              disabled={
                !this.state.isCocAgreed ||
                !this.state.isPrivacyAgreed ||
                !this.state.isLogoAgreed ||
                !this.state.isRefundAgreed
              }
              onClick={e => {
                e.preventDefault()
                this.props.toNextStage()
              }}
            >정말로 다 읽었습니다 🙆‍♀️</Button>
          </FlexCenterWrapper>
        </form>
      </FormWrapper>
    )
  }
}
