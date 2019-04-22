import { FormWrapper } from 'components/atoms/ContentWrappers'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'

type State = {
  // todo : implement here
}

@inject('stores')
@observer
export default class Stage3 extends React.Component<{stores: StoresType; scrollRef: HTMLDivElement}, State> {
  state: State = {
    // todo : implement here
  }

  async componentDidMount() {
    // todo : implement here
  }

  render () {
    return (
      <FormWrapper>
        // todo : implement here
      </FormWrapper>
    )
  }
}
