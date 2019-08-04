import {H1, H2, H3, Paragraph, Section} from 'components/atoms/ContentWrappers'
import styled from '@emotion/styled'
import {Loading} from 'components/atoms/Loading'
import { AlertBar } from 'components/atoms/AlertBar'
import {LocalNavigation} from 'components/molecules/LocalNavigation'
import {inject, observer} from 'mobx-react'
import {withRouter} from 'next/router'
import React from 'react'
import {PageDefaultPropsType} from 'types/PageDefaultPropsType'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const TICKET = gql`
query Ticket($globalId: ID, $id: Int) {
  ticket(globalId: $globalId, id: $id) {
    id
    ticketId
    owner {
      profile {
        name
        nameKo
        nameEn
        organization
        isPatron
        isOpenReviewer
        isSpeaker
        isSprintOwner
        isTutorialOwner
        hasYoungcoder
        hasBabycare
      }
    }
    status
    product {
      id
      type
      name
    }
    options
  }
}
`

const NameText = styled.div`
font-size: 40px;
font-weight: bold;
// margin: 34px 0 5px;
color: black;
`

const OrgText = styled.div`
font-size: 20px;

line-height: 1.4;
// margin: 34px 0 5px;
color: black;
`

@(withRouter as any)
@inject('stores')
@observer
export default class MyTickets extends React.Component<PageDefaultPropsType> {


  renderTicketPage = (ticket) => {
    console.log(ticket)
    const {owner, product, options, status} = ticket
    const {name, nameKo, nameEn, organization, isPatron, 
      isOpenReviewer, isSpeaker, isSprintOwner, 
      isTutorialOwner, hasYoungcoder, hasBabycare} = owner.profile
    return (
      <div>
        <div>
          <H3>컨퍼런스 굿즈 교환권</H3>
          <Paragraph>굿즈는 17일(토) 키노트 이후 2층에서 배부됩니다.</Paragraph>
        </div>
        <div>
          <NameText>{ name }</NameText>
          {
            <OrgText>{ organization || '파이콘 한국 2018 참가자' }</OrgText>
          }
        </div>
        <div> { isPatron && <H3>개인 후원자 굿즈 교환권</H3> } </div>
        <div> { isOpenReviewer && <H3>오픈리뷰어 굿즈 교환권</H3> } </div>
        <div> { isSpeaker && <H3>발표자 굿즈 교환권</H3> } </div>
        <div> { isSprintOwner && <H3>스프린트 진행자 굿즈 교환권</H3> } </div>
        <div> { isTutorialOwner && <H3>튜토리얼 진행자 굿즈 교환권</H3> } </div>
        <div> { hasYoungcoder && <H3>영코더 굿즈 교환권</H3> } </div>
        <div> { hasBabycare && <H3>아이돌봄 굿즈 교환권</H3> } </div>
      </div>
    )
  }

  render() {
    const { router } = this.props
    var { id, globalId } = router.query
    if(isNaN(Number(id))) {
      globalId = id
      id = null
    }
    return (
      <Query query={TICKET} variables={{id, globalId}}>
        {
          ({ loading, error, data }) => {
            if (loading) return (<Loading width={50} height={50}/>);
            if (error) return (<AlertBar text={error.message} />)
            const ticket = data.ticket
            if (!ticket) {
              return (<AlertBar text={`해당 ID의 티켓이 존재하지 않습니다. (id: ${id}, globalId: ${globalId})`} />)
            }
            return (
              this.renderTicketPage(ticket)
            )
          }
        }
      </Query>
    )
  }
}
