import styled from '@emotion/styled'
import { CORAL } from 'styles/colors'
import { mobileWidth } from 'styles/layout'

export const DateNavWrapper = styled.div`
  display: flex;
  justify-content: center;
  color: #088487;
  margin-bottom: 40px;
  font-size: 30px;
  font-weight: 600;

  @media (max-width: ${mobileWidth}) {
    font-size: 18px;
  }
`

export const DateNav = styled.div<{ isActive?: boolean }>`
  margin: 0 10px;
  padding-bottom: 10px;
  cursor: pointer;
  border-bottom: ${props => props.isActive ? `2px solid ${CORAL}` : ''}
`

export const TimetableContents = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: #4a4a4a;
  font-size: 14px;
`
