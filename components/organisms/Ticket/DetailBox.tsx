import {FormNeedsLogin} from 'components/atoms/FormNeedsLogin'
import {Loading} from 'components/atoms/Loading'
import i18next from 'i18next'
import {observer} from 'mobx-react'
import {RouterProps} from 'next/router'
import {StoresType} from 'pages/_app'
import * as React from 'react'
import {
  ContentTableWrapper,
  Table, Td,
  Th,
  Tr
} from '../../atoms/ContentWrappers'

type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
  router: RouterProps;
}

@observer
class DetailBox extends React.Component<PropsType> {
  componentDidMount() {
    const {stores} = this.props
  }

  renderDetailBox = () => {
    return (
      <ContentTableWrapper>
        <Table>
          <Tr>
            <Th>티켓 상태</Th>
            <Td>취소</Td>
          </Tr>
          <Tr>
            <Th>티켓 종류</Th>
            <Td>티켓 종류</Td>
          </Tr>
          <Tr>
            <Th>가격</Th>
            <Td>20,000</Td>
          </Tr>
          <Tr>
            <Th>구매일</Th>
            <Td>구매일</Td>
          </Tr>
          <Tr>
            <Th>취소기한</Th> {/* cancelat 이 있으면 취소일*/}
            <Td>취소기한</Td>
          </Tr>
          <Tr>
            <Th>상의사이즈</Th>
            <Td>S</Td>
          </Tr>
          <Tr>
            <Th>등록영수증</Th>
            <Td>link</Td>
          </Tr>
          {/* TODO : 영코더 등의 티켓의 경우 참석자명 등의 별도 프로퍼티 출력이 필요할 듯 */}
        </Table>
      </ContentTableWrapper>
    )
  }

  render() {
    const {stores} = this.props
    const {authStore} = stores
    const isAuthStoreInitialized = authStore.isInitialized
    const isLoggedIn = authStore.loggedIn

    if (!isAuthStoreInitialized) {
      return <Loading width={50} height={50}/>
    }

    return (
      !isLoggedIn
        ? <FormNeedsLogin/>
        : this.renderDetailBox()
    )
  }
}

export default DetailBox
