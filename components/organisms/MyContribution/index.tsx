import { Li, Ol, Ul } from 'components/atoms/ContentWrappers'
import { Empty } from 'components/atoms/Empty'
import { Loading } from 'components/atoms/Loading'
import { DurationNode, LanguageNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import marksy from 'marksy'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { RouterProps, withRouter } from 'next/router'
import { StoresType } from 'pages/_app'
import React from 'react'

@inject('stores')
@withRouter
@observer
class MyContribution extends React.Component<{
  stores: StoresType;
  router: RouterProps;
}> {
  render() {
    const { stores } = this.props
    const { proposal } = toJS(stores.cfpStore)

    if (!stores.cfpStore.isInitialized) {
      return <Loading width={50} height={50}/>
    }

    if (proposal === null) {
      return <Empty />
    }

    return <Ol>
      <Li>발표안 제안
        <Ul>
          <Li>주제: {proposal.name}</Li>
          <Li>카테고리: {proposal.category!.nameKo}</Li>
          <Li>세션 길이: {proposal.duration === DurationNode.LONG ? '45분' : '25분'}</Li>
          <Li>언어: {proposal.language === LanguageNode.ENGLISH ? 'English' : '한국어'}</Li>
          <Li>난이도: {proposal.difficulty!.nameKo}</Li>
          <Li>제안의 상세한 내용: {
            marksy({ createElement: React.createElement })(
              proposal.detailDesc
            ).tree
          }</Li>
          <Li>이미 다른 곳에 발표한 내용인가요?: {proposal.isPresentedBefore ? '예' : '아니오'}</Li>
          <Li>발표한 행사: {proposal.placePresentedBefore || '-'}</Li>
          <Li>발표 자료 링크: {proposal.presentedSlideUrlBefore  || '-'}</Li>
          <Li>참고 및 질문 사항: {proposal.comment  || '-'}</Li>
        </Ul>
      </Li>
    </Ol>
  }
}

export default MyContribution
