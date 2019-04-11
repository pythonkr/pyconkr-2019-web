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
  isRefundAgreed: boolean,
  isCocAgreed: boolean,
  isPrivacyAgreed: boolean,
  isLogoAgreed: boolean,
  isTermsAgreed: boolean,
}

@inject('stores')
@observer
export default class SponsorFormStage1 extends React.Component<{
  stores: StoresType;
  scrollRef: HTMLDivElement;
  toNextStage: Function;
}, State> {
  state = {
    isRefundAgreed: false,
    isCocAgreed: false,
    isPrivacyAgreed: false,
    isLogoAgreed: false,
    isTermsAgreed: false,
  }

  async componentDidMount() {
    this.props.scrollRef && window.scrollTo(0, this.props.scrollRef.offsetTop)
  }

  render () {
    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault()
        }}>
          <AgreementFieldset>
            <legend><IntlText intlKey='asdfasdf'>
            파이콘 2019 후원
            </IntlText></legend>
            <p><IntlText intlKey='asdfasdf'>
            파이콘 한국 2019에 후원을 통해 파이썬 커뮤니티의 일원으로 함께하고자 하는 의사를 밝혀주셔서 정말 감사합니다. 후원 진행 시 숙지하셔야 할 사항들을 안내드립니다.
            </IntlText></p>
          </AgreementFieldset>
          <hr />
          <AgreementFieldset>
            <legend><IntlText intlKey='asdfasdf'>
            후원 진행 절차
            </IntlText></legend>
            <ol>
              <li>약관에 동의하고 신청서를 작성합니다.</li>
              <li>위원회에서 신청서를 확인하여 입금할 수 있는 계좌를 알려드립니다.</li>
              <li>입금이 확인되면 파이콘 한국 2019의 스폰서로 확정이 됩니다.</li>
            </ol>
          </AgreementFieldset>
          <AgreementFieldset>
            <legend><IntlText intlKey='asdfasdf'>
            환불 규정
            </IntlText></legend>
            <ul>
              <li>행동 강령 위반 등 후원사의 귀책사유로 계약이 해지 되는 경우 위원회는 위약금을 청구할 수 있습니다. 위약금은 남아있는 행사 기간에 따라 달라지며 금액은 <a
                  href={paths.sponsor.termsOfService}
                  target='_blank'
                  rel='noreferrer'
                >약관</a>의 내용을 따릅니다.
              </li>
            </ul>
            <input
                type='checkbox'
                id='refund-agreed'
                aria-checked={this.state.isRefundAgreed}
                checked={this.state.isRefundAgreed}
                onChange={() => this.setState({ isRefundAgreed: !this.state.isRefundAgreed })}
            />
            <label htmlFor='refund-agreed'><IntlText intlKey='asdfasdf'>
            위 내용에 동의합니다.
            </IntlText></label>
          </AgreementFieldset>
          <AgreementFieldset>
            <legend><IntlText intlKey='asdfasdf'>
            파이콘 한국 행동 강령
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
                  행사 준비 과정 (준비위원회와의 커뮤니케이션)
                  </IntlText>
                    <ul>
                      <li><IntlText intlKey='asdfasdf'>
                      파이콘 한국 준비위원회는 자원봉사자로 이루어진 조직입니다. 커뮤니케이션 과정에서 시간이 지체될 수 있음을 양해해주세요.
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
                  후원사 발표 세션
                  </IntlText></li>
                </ul>
              </li>
              <li><IntlText intlKey='asdfasdf'>
              컨퍼런스 진행 중에 후원사의 일원이 행동 강령을 지키지 않은 경우에는 일반 참여자와 같은 과정으로 위반 사례를 접수, 대응합니다.
              </IntlText></li>
              <li><IntlText intlKey='asdfasdf'>
              컨퍼런스 중 후원사 프로그램 또는 부스에서 행동 강령을 지키지 않는 경우에는 시정 요청을 할 수 있으며 시정되지 않는 경우 강제 퇴장, 부스 철수 등의 조치를 취할 수 있습니다.
              </IntlText></li>
              <li><IntlText intlKey='asdfasdf'>
              준비위원회 또한 커뮤니케이션을 포함한 모든 과정에서 행동 강령을 준수할 것입니다.
              </IntlText></li>
              <li><IntlText intlKey='asdfasdf'>
              행동 강령의 내용은 수시로 업데이트 될 수 있으며 내용이 업데이트되는 경우 준비위원회에서 재동의를 요구할 수 있습니다.
              </IntlText></li>
            </ul>
            <input
              type='checkbox'
              id='coc-agreed'
              aria-checked={this.state.isCocAgreed}
              checked={this.state.isCocAgreed}
              onChange={e => this.setState({ isCocAgreed: e.target.checked })}
            />
            <label htmlFor='coc-agreed'><IntlText intlKey='asdfasdf'>
            후원 참가로 인해 참가자가 신체적, 정신적 위협을 느낄 정도로 행동 강령을 위반한 사실이 없으며 행동 강령을 준수할 것을 약속합니다.
            </IntlText></label>
          </AgreementFieldset>
          <hr />
          <AgreementFieldset>
            <legend><IntlText intlKey='asdfasdf'>
            개인 정보
            </IntlText></legend>
            <p><IntlText intlKey='asdfasdf'>
            파이콘 준비위원회는 참가자의 개인 정보를 후원사에게 제공하지 않습니다. 다만 부스나 공식 프로그램 등에서 참여자의 동의 하에 자체적으로 수집하는 건 가능합니다.
            </IntlText></p>
            <input
                type='checkbox'
                id='privacy-agreed'
                aria-checked={this.state.isPrivacyAgreed}
                checked={this.state.isPrivacyAgreed}
                onChange={e => this.setState({ isPrivacyAgreed: e.target.checked })}
            />
            <label htmlFor='privacy-agreed'><IntlText intlKey='asdfasdf'>
            위 내용을 숙지하였으며 동의합니다.
            </IntlText></label>
          </AgreementFieldset>
          <AgreementFieldset>
            <legend><IntlText intlKey='asdfasdf'>
            후원사 및 파이콘 한국 로고
            </IntlText></legend>
            <ul>
              <li><IntlText intlKey='asdfasdf'>
              후원사의 로고는 선택하신 후원사 패키지에 명시된 곳에만 노출됩니다.
              </IntlText></li>
              <li><IntlText intlKey='asdfasdf'>
              제공되는 파이콘 로고와 디자인 에셋은 행사 참여 홍보에 사용이 가능하지만 파이콘 한국과 상의되지 않은 일체의 프로그램에는 사용할 수 없습니다.
              </IntlText></li>
            </ul>
            <input
                type='checkbox'
                id='logo-agreed'
                aria-checked={this.state.isLogoAgreed}
                checked={this.state.isLogoAgreed}
                onChange={e => this.setState({ isLogoAgreed: e.target.checked })}
            />
            <label htmlFor='sharing-agreed'><IntlText intlKey='asdfasdf'>
            위 내용을 숙지하였으며 동의합니다.
            </IntlText></label>
          </AgreementFieldset>
          <hr />
          <AgreementFieldset>
              <p style={{ position: 'relative'}}>
                  <input
                      type='checkbox'
                      id='terms-consent'
                      aria-checked={this.state.isTermsAgreed}
                      checked={this.state.isTermsAgreed}
                      onChange={(event) =>
                          this.setState({
                              isRefundAgreed: event.target.checked,
                              isCocAgreed: event.target.checked,
                              isPrivacyAgreed: event.target.checked,
                              isLogoAgreed: event.target.checked,
                              isTermsAgreed: event.target.checked,
                          })
                      }
                  />
                  <label htmlFor='terms-consent'>
                      <IntlText intlKey='agreement.agreeTermsOfService'>위 내용을 포함한 후원사 약관에 모두 동의합니다.</IntlText>
                      <a
                          style={{ position: 'absolute', right: 0 }}
                          href={paths.sponsor.termsOfService}
                          target='_blank'
                          rel='noreferrer'
                      ><IntlText intlKey='agreement.viewTermsOfService'>후원 약관 전문 보기</IntlText></a>
                  </label>
              </p>
          </AgreementFieldset>
          <FlexCenterWrapper style={{ marginTop: 80 }}>
            <Button
              tag='button'
              intlKey='asdlfkaslkfdj'
              type='submit'
              color={TEAL}
              size='big'
              disabled={
                !this.state.isRefundAgreed ||
                !this.state.isCocAgreed ||
                !this.state.isPrivacyAgreed ||
                !this.state.isLogoAgreed ||
                !this.state.isTermsAgreed
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
