import * as React from 'react'
import styled from '@emotion/styled'
import * as ReactMarkdown from 'react-markdown'
import 'github-markdown-css'

type PropsType = {
  bio: string;
}

const ProfileBioWrapper = styled.div`
  &.closed {
    max-height: 15em;
    overflow-y: hidden;
  }

  .markdown-body ul {
    list-style-type: disc;
  }

  .markdown-body ol {
    list-style-type: decimal;
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
          <ReactMarkdown 
            source={bio} 
            className="markdown-body" 
            escapeHtml={false}></ReactMarkdown>
        </ProfileBioWrapper>
        <ReadMoreButton onClick={ this.toogleOpened.bind(this) }>
          {this.state.opened? 'close' : 'more'}
        </ReadMoreButton>
      </div>
    )
  }
}

export default ProfileBio