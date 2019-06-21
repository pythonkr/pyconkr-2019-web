import * as React from 'react'
import styled from '@emotion/styled'
import * as ReactMarkdown from 'react-markdown'
import 'github-markdown-css'

type PropsType = {
  contents: string;
}

const Wrapper = styled.div`
  .markdown-body ul {
    list-style-type: disc;
  }

  .markdown-body ol {
    list-style-type: decimal;
  }
`


class MarkdownWrapper extends React.Component<PropsType> {
  render() {
    const { contents } = this.props
    return (
      <Wrapper>
        <ReactMarkdown 
          source={contents} 
          className="markdown-body" 
          escapeHtml={false}></ReactMarkdown>
      </Wrapper>
    )
  }
}

export default MarkdownWrapper