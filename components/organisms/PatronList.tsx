import { FlexColumnWrapper } from 'components/atoms/FlexWrapper'
import { Loading } from 'components/atoms/Loading'
import ProfileCard from 'components/molecules/ProfileCard'
import i18next from 'i18next'
import _ from 'lodash'
import { observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'

type PropsType = {
    stores: StoresType;
}

@observer
class PatronList extends React.Component<PropsType> {

  renderPatronList = () => {
    const { stores } = this.props
    const { patrons } = stores.sponsorStore
    const isPatronExist = !!!_.isNil(patrons)

    if (!isPatronExist) return null

    return patrons.map(patron => {
      const {image, name, bio, organization } = patron

      return (
        <ProfileCard
          key={`patron_${patron.id}`}
          profileImg={image}
          name={name || 'Patron'}
          organization={organization || 'Patron Contributor'}
          bio={bio || 'Thank you for your contribution.'}
        />
      )
    })
  }

  render() {
    const { stores } = this.props
    if (!stores.sponsorStore.patrons || _.isEmpty(stores.sponsorStore.patrons)) {
      return <Loading width={50} height={50}/>
    }

    return (
      <FlexColumnWrapper>
        {this.renderPatronList()}
      </FlexColumnWrapper>
    )
  }
}

export default PatronList
