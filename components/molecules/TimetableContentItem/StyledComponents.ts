import styled from '@emotion/styled'
import { BG_GRAY, CORAL, GREEN, YELLOW } from 'styles/colors'
import { mobileWidth } from 'styles/layout'

export const TimeTableContentItem = styled.div<{
  isBorderBottom?: boolean;
  isBorderTop?: boolean;
  isBreaktime?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top: ${props => props.isBorderTop ? 'solid 2px #088487;' : ''};
  border-bottom: ${props => props.isBorderBottom ? 'solid 1px #dfe3e6' : ''};
  .timeWrapper {
    flex: 1;
    text-align: center;

    .time {
      ${props => props.isBreaktime ? 'padding-left: 2.9em;' : ''}
    }
  }

  .content {
    flex: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: ${props => props.isBorderBottom ? '' : 'solid 1px #dfe3e6'};
    padding-top: 20px;
    padding-bottom: 20px;

    .room {
      flex: 1;
      text-align: center;
      color: #088487;
      padding: 0 10px;
    }

    .contentDetailWrapper {
      display: flex;
      flex: 5;
      justify-content: space-between;
      flex-direction: column;

      .subject {
        padding: 0 20px;
        word-break: break-all;

        .title {
          line-height: 1.2;
        }

        .speakerName {
          color: gray;
          padding-top: 5px;
        }
        ${props => !props.isBreaktime && 'cursor: pointer; &:hover { color: #088487; font-weight: 600; }'}
      }
    }
  }

  @media (max-width: ${mobileWidth}) {
    font-size: 12px;
    .timeWrapper {
      .time {
        padding-left: 0;
      }
    }

    .time,
    .content {
      height: 100%;

      .contentDetailWrapper {
        .room,
        .subject {
          padding: 0 10px;
        }
      }
    }
  }
`

export const TagWrapper = styled.div`
  color: #fff;
  padding-left: 20px;
  justify-content: flex-end;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  margin-top: 15px;
  height: auto;

  @media (max-width: ${mobileWidth}) {
   padding-left: 10px;
   justify-content: left;
  }
`

export const Tag = styled.span`
  font-size: 12px;
  border-radius: 3px;
  padding: 3px 4px;
  opacity: .9;
  margin-right: 5px;
  margin-bottom: 2px;
  height: 20px;

  &.beginner,
  &.over10years {
    background: ${GREEN};
  }

  &.intermediate,
  &.over13years {
    background: ${YELLOW};
  }

  &.experienced {
    background: ${CORAL};
  }
`

export const LinkTag = styled.a`
  font-size: 12px;
  border-radius: 3px;
  padding: 3px 4px;
  opacity: .9;
  margin-right: 5px;
  margin-bottom: 2px;
  height: 20px;
  text-decoration: none;

  &.slide {
    background: ${BG_GRAY};
  }
`
