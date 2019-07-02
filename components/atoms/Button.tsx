import css from '@emotion/css'
import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import intl from 'react-intl-universal'
import { CORAL } from 'styles/colors'

type ButtonSize = 'big' | 'normal' | 'small'

interface Props {
  size?: ButtonSize,
  fontSize?: number,
  width?: number,
  height?: number,
  color?: string,
  primary?: boolean,
  disabled?: boolean,
  tag?: 'a' | 'button',
  to?: string,
  outlink?: boolean,
  onClick?: VoidFunction,
  intlKey?: string,
  title?: string,
  children?: string,
  [index: string]: any
}

interface StyledAProps {
  width: number,
  height: number,
  fontSize: number,
  color: string,
  primary: boolean,
  disabled: boolean,
  margin?: string
}

const buttonStyle = css`
  width: 280px;
  height: 60px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 2px;
`

export const StyledA = styled.a`
  ${buttonStyle}
  text-decoration: none;
  width: ${({ width }: StyledAProps) => `${width}px`};
  height: ${({ height })  => `${height}px`};
  background-color: ${({ primary, color }) => primary ? color : 'transparent'};
  opacity: ${({ disabled }) => disabled ? 0.4 : 1};
  cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
  border: solid 1px ${({ disabled, color }) => disabled ? '#bcc0c2' : color};
  span {
    color: ${({ primary, disabled, color }) => primary
      ? 'white'
      : disabled
        ? '#a2a7aa'
        : color
    };
    font-weight: ${({ fontSize }) => fontSize > 12 ? '700' : 'inherit'};
    font-size: ${({ fontSize })  => `${fontSize}px`};
    line-height: 1.2;
    margin-top: -1px;
  }
`

export const StyledButton = styled.button`
  ${buttonStyle}
  width: ${({ width }: StyledAProps) => `${width}px`};
  height: ${({ height })  => `${height}px`};
  background-color: ${({ primary, color }) => primary ? color : 'transparent'};
  opacity: ${({ disabled }) => disabled ? 0.4 : 1};
  cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
  border: solid 1px ${({ disabled, color }) => disabled ? '#bcc0c2' : color};
  margin: ${({margin}) => margin ? margin : '0'};
  span {
    color: ${({ primary, disabled, color }) => primary
      ? 'white'
      : disabled
        ? '#a2a7aa'
        : color
    };
    font-weight: ${({ fontSize }) => fontSize > 12 ? '700' : 'inherit'};
    font-size: ${({ fontSize })  => `${fontSize}px`};
    line-height: 1.2;
    margin-top: -1px;
  }
`

const getButtonWidth = (size: ButtonSize, width?: number) => {
  if (width) return width

  switch (size) {
    case 'big':
      return 300
    case 'small':
     return 100
    default:
      return 200
  }
}

const getButtonHeight = (size: ButtonSize, height?: number) => {
  if (height) return height

  switch (size) {
    case 'big':
      return 60
    case 'small':
     return 30
    default:
      return 50
  }
}

const getButtonFontSize = (size: ButtonSize, fontSize?: number) => {
  if (fontSize) return fontSize

  switch (size) {
    case 'big':
      return 19
    case 'small':
     return 12
    default:
      return 16
  }
}

export const Button: React.SFC<Props>  = ({
  size = 'normal',
  fontSize,
  width,
  height,
  margin,
  color = CORAL,
  primary = true,
  disabled = false,
  tag = 'a',
  to,
  outlink = false,
  onClick = () => { /* */ },
  intlKey,
  title,
  children,
  ...props
}) => {
  const buttonText = title || intl
    .get(intlKey)
    .defaultMessage(children)

  if (tag === 'button') {
    return <StyledButton
      color={color}
      width={getButtonWidth(size, width)}
      height={getButtonHeight(size, height)}
      fontSize={getButtonFontSize(size, fontSize)}
      primary={primary}
      disabled={disabled}
      margin={margin}
      onClick={onClick}
      {...props}
    >
      <span>{buttonText}</span>
    </StyledButton>
  }

  if (outlink) {
    return <StyledA
      color={color}
      width={getButtonWidth(size, width)}
      height={getButtonHeight(size, height)}
      fontSize={getButtonFontSize(size, fontSize)}
      primary={primary}
      disabled={disabled}
      href={to}
      target='_blank'
      rel='noreferrer'
      {...props}
    >
      <span>{buttonText}</span>
    </StyledA>
  }

  return <Link href={to}>
    <StyledA
      color={color}
      width={getButtonWidth(size, width)}
      height={getButtonHeight(size, height)}
      fontSize={getButtonFontSize(size, fontSize)}
      primary={primary}
      disabled={disabled}
      {...props}
    >
      <span>{buttonText}</span>
    </StyledA>
  </Link>
}
