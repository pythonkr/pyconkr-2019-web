import styled from '@emotion/styled'
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

      .tagWrapper {
        display: flex;
        align-items: center;
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
        display: flex;
        align-items: center;

        .room,
        .subject {
          padding: 0 10px;
        }
      }
    }
  }
`
