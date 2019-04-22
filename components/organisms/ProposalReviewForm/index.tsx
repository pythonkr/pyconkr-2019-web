import { PaddingWrapper } from 'components/atoms/FormNeedsLogin'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'

@inject('stores')
@observer
export default class ProposalReviewForm extends React.Component<{ stores: StoresType }> {
  formWrapperRef: HTMLDivElement | null = null

  async componentDidMount() {
    // todo : implement here
  }

  render() {
   return (
      <PaddingWrapper ref={ref => this.formWrapperRef = ref}>
         {/*todo : implement here*/}
      </PaddingWrapper>
    )
  }
}
