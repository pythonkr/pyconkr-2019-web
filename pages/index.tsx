import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import { NextContext } from 'next'
import React from 'react'
import HomePage, { HomePagePropsType } from '../components/pages/HomePage'
import { initRootStore } from '../stores/RootStore'
import { PagePropsType, PageStatesType } from './type'

class Index extends React.Component<PagePropsType, PageStatesType> {

    constructor(props: PagePropsType) {
      super(props)
      this.state = {
          stores: initRootStore(props.isServer, props.initialState),
      }
    }
    /*
      [getInitialProps]
      - 비동기 전역 메소드 (Asyncronous Static Method)
      - 비동기로 Fetch되며, Prop으로 전달 됨.
      - 서버 렌더링 시, 리턴되는 데이터 Serialized, JSON.stringify.
      - 리턴 타입은 Object
      - 페이지 초기 로드 시 서버사이드에서만 실행됨.
      - Link 혹은 Routing APIs 사용해서 이동할 때만 클라이언트에서 실행됨.
    */

    public static async getInitialProps(context: NextContext) {
      const { req } = context
      const isServer = !!req
      const stores = initRootStore(isServer)

      return { initialState: getSnapshot(stores), isServer }
    }

    render () {
      const { stores } = this.state

      return (
        <Provider stores={stores}>
          <HomePage {...{} as HomePagePropsType} />
        </Provider>
      )
    }
}

export default Index
