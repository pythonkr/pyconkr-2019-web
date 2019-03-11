import styled from '@emotion/styled'
import { contentWidth, contentWidthPadding } from 'styles/layout'

export const ContentWidthWrapper = styled.div`
  width: 100%;
  max-width: ${contentWidth};
  padding: 0 ${contentWidthPadding};
  margin: 0 auto;
`
