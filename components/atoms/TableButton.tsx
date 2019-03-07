import styled from '@emotion/styled'
import React from 'react'
import intl from 'react-intl-universal'
import Link from 'next/link';
import css from '@emotion/css';

interface Props {
  color?: string,
  primary?: boolean,
  disabled?: boolean,
  tag?: 'a' | 'button',
  to?: string,
  outlink?: boolean,
  onClick?: VoidFunction,
  intlKey: string,
  children: string
}

interface StyledAProps {
  color: string,
  primary: boolean,
  disabled: boolean
}


const tableButtonStyle = css`
  width: 103px;
  height: 27px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const StyledA = styled.a`
  ${tableButtonStyle}
  background-color: ${(props: StyledAProps) => props.primary ? props.color : 'white'};
  border: solid 1px ${(props: StyledAProps) => props.disabled ? '#bcc0c2' : props.color};
  span {
    color: ${(props: StyledAProps) => props.primary
      ? 'white'
      : props.disabled
        ? '#a2a7aa'
        : props.color
    };
    font-size: 12px;
    line-height: 1;
    margin-top: -1px;
  }
`

const StyledButton = styled.button`
  ${tableButtonStyle}
  background-color: ${(props: StyledAProps) => props.primary ? props.color : 'white'};
  border: solid 1px ${(props: StyledAProps) => props.color};
  span {
    color: ${(props: StyledAProps) => props.primary ? 'white' : props.color};
    font-size: 12px;
    line-height: 1;
    margin-top: -1px;
  }
`

export const TableButton: React.SFC<Props> = ({
  color = '#3d70b2',
  primary = true,
  disabled = false,
  tag = 'a',
  to,
  outlink = false,
  onClick = () => {},
  intlKey,
  children,
}) => {
  const buttonText = intl
    .get(intlKey)
    .defaultMessage(children)

  if (tag === 'button') {
    return <StyledButton
      color={color}
      primary={primary}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{buttonText}</span>
    </StyledButton>
  }

  if (outlink) {
    return <StyledA
      color={color}
      primary={primary}
      disabled={disabled}
      href={to}
      target='_blank'
    >
      <span>{buttonText}</span>
    </StyledA>
  }

  return <Link href={to}>
    <StyledA
      color={color}
      primary={primary}
      disabled={disabled}
    >
      <span>{buttonText}</span>
    </StyledA>
  </Link>
}

