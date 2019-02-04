
import { injectGlobal } from 'emotion'
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import { NextContext } from 'next';
import React from 'react'
import App, { AppPropsType } from '../components/App'
import { initRootStore, IRootStore } from '../stores/RootStore'

injectGlobal`
  html, body {
    padding: 3rem 1rem;
    margin: 0;
    background: papayawhip;
    min-height: 100%;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 24px;
  }
`
export type IndexPagePropsType = {
  isServer: boolean;
  initialState: IRootStore;
}

export type IndexPageStatesType = {
  rootStore: IRootStore;
}

class Index extends React.Component<IndexPagePropsType, IndexPageStatesType> {

    constructor(props: IndexPagePropsType) {
      super(props)
      this.state = {
          rootStore: initRootStore(props.isServer, props.initialState),
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
      const rootStore = initRootStore(isServer)

      return { initialState: getSnapshot(rootStore), isServer }
    }

    render () {
      const { rootStore } = this.state

      return (
        <Provider rootStore={rootStore}>
          <App {...{} as AppPropsType} />
        </Provider>
      )
    }
}

export default Index
