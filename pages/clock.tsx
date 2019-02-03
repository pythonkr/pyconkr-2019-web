import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import { NextContext } from 'next'
import React from 'react'
import ClockContainer, { ClockContainerProps } from '../containers/Clock'
import { IClockStore, initClockStore } from '../stores/ClockStore'

export type PropsType = {
  isServer: boolean;
  initialState: IClockStore;
}

interface ClockPageProps {
    isServer: boolean
    initialState: IClockStore
}

interface ClockPageState {
    clockStore: IClockStore
}

class ClockPage extends React.Component<ClockPageProps, ClockPageState> {

    constructor(props: PropsType) {
        super(props)
        this.state = {
            clockStore: initClockStore(props.isServer, props.initialState),
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
        const clockStore = initClockStore(isServer)

        return { initialState: getSnapshot(clockStore), isServer }
    }

    render () {
        return (
            <Provider clock={this.state.clockStore}>
                <div>
                    <h1>Clock</h1>
                    <ClockContainer {...{} as ClockContainerProps} />
                </div>
            </Provider>
        )
    }
}

export default ClockPage
