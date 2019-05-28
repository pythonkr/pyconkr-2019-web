import { FlexColumnWrapper } from 'components/atoms/FlexWrapper'
import ProfileCard from 'components/molecules/ProfileCard'
import _ from 'lodash'
import { StoresType } from 'pages/_app'
import React from 'react'

type PropsType = {
    stores: StoresType;
}

export class PatronList extends React.Component<PropsType> {

  renderPatronList = () => {
    const { stores } = this.props
    const { patrons } = stores.sponsorStore
    const isPatronExist = !!!_.isNil(patrons)

    if (!isPatronExist) return null

    return patrons.map(patron => {
      return (
        <ProfileCard
          profileImg={patron.avatarUrl}
          name={patron.nameKo || ''}
          organization={patron.organization}
          bio={patron.bioKo || ''}
        />
      )
    })
  }

  render() {

      return (
        <FlexColumnWrapper>
          {this.renderPatronList()}
        </FlexColumnWrapper>
      )
  }
}

export default PatronList
