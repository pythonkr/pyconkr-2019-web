import styled from '@emotion/styled'
import MarkdownWrapper from 'components/atoms/MarkdownWrapper'
import 'github-markdown-css'
import * as React from 'react'
import * as ReactMarkdown from 'react-markdown'

type PropsType = {
  bio: string;
}

const ProfileBioWrapper = styled.div`
  &.closed {
    max-height: 15em;
    overflow-y: hidden;
  }
`

const ReadMoreButton = styled.div`
  text-align: right;
  color: #077477;
  cursor: pointer;
`

class ProfileBio extends React.Component<PropsType> {
  state = {
    opened: false
  }

  toogleOpened() {
    this.setState({
      opened: !this.state.opened
    })
  }

  render() {
    const { bio } = this.props

    return (
      <div>
        <ProfileBioWrapper className={this.state.opened ? '' : 'closed'}>
          <MarkdownWrapper contents={bio}/>
        </ProfileBioWrapper>
        <ReadMoreButton onClick={ this.toogleOpened.bind(this) }>
          {this.state.opened ? 'close' : 'more'}
        </ReadMoreButton>
      </div>
    )
  }
}

export default ProfileBio
