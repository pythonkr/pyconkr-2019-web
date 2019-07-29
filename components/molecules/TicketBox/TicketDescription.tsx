import styled from '@emotion/styled'
import i18next from 'i18next'
import * as React from 'react'
import { mobileWidth } from 'styles/layout'

type PropsType = {
    title: string;
    description: string;
    warning: string;
    cancelButtonTitle?: string;
    onCancel?: (() => void);
    t: i18next.TFunction;
}

export const TicketDescriptionWrapper = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    padding: 32px 0 20px 28px;

    @media (max-width: ${mobileWidth}) {
      display: block;
      padding: 29px 28px;

      h1 {
        margin-bottom: 35px;
      }

      p:nth-of-type(1) {
        margin-bottom: 43px;
      }
    }

    h1 {
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 23px;
    }

    p {
      font-size: 15px;
      line-height: 1.67;
    }
  }
`

const TicketDescriptionBottomWrapper = styled.div<{isCancel: boolean}>`
  margin-top: auto;
  display: flex;
  align-items: center;

  @media (max-width: ${mobileWidth}) {
    flex-direction: column-reverse;
  }
`

export const TicketWarning = styled.div<{isCancel: boolean }>`
  margin-left: ${props => props.isCancel ? '20px' : '0'};
  font-size: 15px;
  font-weight: bold;
  line-height: 1.47;
  color: #f95858 !important;
  white-space: pre-line;
  
  @media (max-width: ${mobileWidth}) {
    margin-left: 0;
    margin-top: 20px;
  }
`

const ButtonCancel = styled.button`
  width: 86px;
  height: 53px;
  border: solid 1px;
  font-size: 18px;

  @media (max-width: ${mobileWidth}) {
    width: 100%;
    margin-top: 20px;
  }
`

export const DescText = styled.div`
    margin: 2px 0;
    font-size: 15px;
    line-height: 18px;
    white-space: pre-line;
`

class TicketDescription extends React.Component<PropsType> {

    render() {
        const { t, title, description, warning, onCancel, cancelButtonTitle } = this.props

        return (
            <TicketDescriptionWrapper>
              <h1>{title}</h1>
              <DescText>{description}</DescText>
              <TicketDescriptionBottomWrapper isCancel={!!onCancel}>
                {onCancel && (
                  <ButtonCancel className='back' onClick={onCancel}>
                    {cancelButtonTitle || t('ticket:back')}
                  </ButtonCancel>
                )}
                <TicketWarning isCancel={!!onCancel}>
                  {warning}
                </TicketWarning>
              </TicketDescriptionBottomWrapper>
            </TicketDescriptionWrapper>
        )
    }
}

export default TicketDescription
