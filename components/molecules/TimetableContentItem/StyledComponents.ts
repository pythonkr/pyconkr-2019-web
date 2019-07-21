import styled from '@emotion/styled'
import { mobileWidth } from 'styles/layout'

export const TimeTableContentItem = styled.div<{
  isBorderBottom?: boolean;
  isBorderTop?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top: ${props => props.isBorderTop ? 'solid 2px #088487;' : ''};
  border-bottom: ${props => props.isBorderBottom ? 'solid 1px #dfe3e6' : ''};
  .time {
    flex: 1;
    text-align: center;
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
        cursor: pointer;

        .title {
          line-height: 1.2;
        }

        .speakerName {
          color: gray;
          padding-top: 5px;
        }

        &:hover {
          color: #088487;
          font-weight: 600;
        }
      }

      .tagWrapper {
        display: flex;
        align-items: center;
      }
    }
  }

  @media (max-width: ${mobileWidth}) {
    font-size: 12px;

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
