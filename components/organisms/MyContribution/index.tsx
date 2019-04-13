import { Button } from 'components/atoms/Button'
import { Li, Ol, Ul } from 'components/atoms/ContentWrappers'
import { Empty } from 'components/atoms/Empty'
import { Loading } from 'components/atoms/Loading'
import CFPEdit from 'components/organisms/CFPForm/CFPEdit'
import CFSEdit from 'components/organisms/SponsorForm/CFSEdit'
import { isFuture } from 'date-fns'
import { callForSponsors, talkProposal } from 'dates'
import { DurationNode, LanguageNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import _ from 'lodash'
import marksy from 'marksy'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { RouterProps, withRouter } from 'next/router'
import { StoresType } from 'pages/_app'
import React from 'react'
import { paths } from 'routes/paths'
import { TEAL } from 'styles/colors'

type PropsType = {
  stores: StoresType;
  router: RouterProps;
}

enum storeTypesEnum {
  CFP = 'cfpStore',
  CFS = 'sponsorStore'

}

@inject('stores')
@withRouter
@observer
class MyContribution extends React.Component<PropsType> {
  state = {
    cfpEdit: false,
    cfsEdit: false
  }

  onCFSEdit = () => this.setState({ cfsEdit: true })
  onCFPEdit = () => this.setState({ cfpEdit: true })
  onCancelCFPEdit = () => this.setState({ cfpEdit: false })
  onCancelCFSEdit = () => this.setState({ cfsEdit: false })

  renderEditButton(storeType: storeTypesEnum) {
    const { stores } = this.props
    const proposal = stores && stores[storeType] && stores[storeType].proposal
    const isSumitted = proposal && proposal.submitted
    const onEdit = storeType === storeTypesEnum.CFP
        ? this.onCFPEdit
        : this.onCFSEdit
    const linkPath = storeType === storeTypesEnum.CFP
        ? paths.contribute.proposingATalk
        : paths.sponsor.applicationForm

    return (
        isSumitted
            ? <Button
                intlKey='asdfsd'
                tag='button'
                color={TEAL}
                primary={false}
                size='small'
                style={{ marginBottom: 10, marginTop: 10, width: '100%', height: 30 }}
                onClick={onEdit}
            >수정 제출하기</Button>
            : <Button
                intlKey='asdfsd'
                to={linkPath}
                color={TEAL}
                primary={false}
                size='small'
                style={{ marginBottom: 10, marginTop: 10, width: '100%', height: 30 }}
            >이어서 작성하러 가기</Button>
    )
  }

  render() {
    const { stores } = this.props
    const { sponsorStore, cfpStore } = stores
    const { cfsEdit, cfpEdit } = this.state
    const { proposal: cfpProposal } = toJS(cfpStore)
    const { proposal: sponsorProposal } = toJS(sponsorStore)

    if (!stores.cfpStore.isInitialized || !stores.sponsorStore.isInitialized) {
      return <Loading width={50} height={50}/>
    }

    if (_.isNil(cfpProposal) && _.isNil(sponsorProposal)) {
      return <Empty />
    }

    const isCFPClosed = isFuture(talkProposal.close)
    const isCFSClosed = isFuture(callForSponsors.close)

    console.log(sponsorProposal.paidAt)
    // sponsorProposal.paidAt = '2019-04-13 20:47:42';
    console.log(sponsorProposal.accepted);
    console.log(sponsorProposal.submitted);

    return (
        <Ol>
          {cfpProposal &&
          <Li>
            발표안 제안: <span style={{ fontWeight: 700 }}>{cfpProposal.submitted ? '제출 완료' : '임시 저장'}</span><br />
            {isCFPClosed
                ? this.renderEditButton(storeTypesEnum.CFP)
                : '제출 기한이 마감되었습니다.'
            }
            {cfpEdit
                ? <CFPEdit
                    stores={stores}
                    onCancel={this.onCancelCFPEdit}
                />
                : <Ul>
                  <Li>주제: {cfpProposal.name}</Li>
                  <Li>카테고리: {cfpProposal.category ? cfpProposal.category!.name : ''}</Li>
                  <Li>세션 길이: {cfpProposal.duration === DurationNode.LONG ? '45분' : '25분'}</Li>
                  <Li>언어: {cfpProposal.language === LanguageNode.ENGLISH ? 'English' : '한국어'}</Li>
                  <Li>난이도: {cfpProposal.difficulty ? cfpProposal.difficulty!.name : ''}</Li>
                  <Li>제안의 상세한 내용: {
                    marksy({ createElement: React.createElement })(
                        cfpProposal.detailDesc
                    ).tree
                  }</Li>
                  <Li>이미 다른 곳에 발표한 내용인가요?: {cfpProposal.isPresentedBefore ? '예' : '아니오'}</Li>
                  <Li>발표한 행사: {cfpProposal.placePresentedBefore || '-'}</Li>
                  <Li>발표 자료 링크: {cfpProposal.presentedSlideUrlBefore
                      ? <a href={cfpProposal.presentedSlideUrlBefore}>{cfpProposal.presentedSlideUrlBefore}</a>
                      : '-'
                  }</Li>
                  <Li>참고 및 질문 사항: {cfpProposal.comment  || '-'}</Li>
                </Ul>
            }
          </Li>
          }
          {sponsorProposal &&
          <Li>
            스폰서 제안: <span style={{ fontWeight: 700 }}>{sponsorProposal.submitted ? (sponsorProposal.paidAt ? '제출 완료 (스폰싱 확정)' : '제출 완료 (스폰싱 미확정)') : '임시 저장'}</span><br />
            {isCFSClosed
                ? this.renderEditButton(storeTypesEnum.CFS)
                : '제출 기한이 마감되었습니다.'
            }
            {cfsEdit
                ? <CFSEdit
                    sponsorStore={sponsorStore}
                    onCancel={this.onCancelCFSEdit}
                />
                : <Ul>
                  <Li>후원사 이름: {sponsorProposal.nameKo}</Li>
                  <Li>담당자 이름: {sponsorProposal.managerName}</Li>
                </Ul>
            }
          </Li>
          }
        </Ol>
    )
  }
}

export default MyContribution
