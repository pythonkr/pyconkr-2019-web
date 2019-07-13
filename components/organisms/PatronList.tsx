import { FlexColumnWrapper } from 'components/atoms/FlexWrapper'
import { Loading } from 'components/atoms/Loading'
import ProfileCard from 'components/molecules/ProfileCard'
import { isEmpty } from 'lodash'
import React from 'react'
import { PatronNode } from '../../lib/apollo_graphql/queries/getPatrons';

type PropsType = {
    patrons: PatronNode[];
}

class PatronList extends React.Component<PropsType> {

  renderPatronList = () => {
    const { patrons } = this.props

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
    const { patrons } = this.props
    if (!patrons || isEmpty(patrons)) {
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
