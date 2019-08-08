import styled from '@emotion/styled'
import 'github-markdown-css'
import * as React from 'react'
import * as ReactMarkdown from 'react-markdown'
import { mobileWidth } from 'styles/layout'

type PropsType = {
  contents: string;
}

export const StyledMarkdownWrapper = styled.div`
  .markdown-body ul {
    list-style-type: disc;
  }

  .markdown-body ol {
    list-style-type: decimal;
  }
  strong {
    font-weight: bold;
  }
  p {
    font-size: 17px;
    line-height: 33px;
    margin: 20px 0;
    white-space: pre-wrap;

    @media (max-width: ${mobileWidth}) {
      font-size: 16px;
      line-height: 1.9em;
    }
  }
`

class MarkdownWrapper extends React.Component<PropsType> {
  render() {
    const { contents } = this.props

    return (
      <StyledMarkdownWrapper>
        <ReactMarkdown
          source={contents}
          className='markdown-body'
          escapeHtml={false}
        />
      </StyledMarkdownWrapper>
    )
  }
}

export default MarkdownWrapper
