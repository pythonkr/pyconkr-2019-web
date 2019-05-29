import styled from '@emotion/styled'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { mobileWidth } from 'styles/layout'

export interface LinkProps {
  title: string,
  to: string,
  outlink: boolean
}

export interface ActionButtonProps {
  text: string,
  onClick: VoidFunction,
}

export interface NoticeBarProps {
  text: string,
  textIntlKey?: string,
  link?: LinkProps,
  actionButton?: ActionButtonProps,
  style?: any
}

interface StyledNoticeBarProps {
  color: string,
  borderColor: string,
  textColor: string,
  textLinkColor: string,
  style?: any
}

const StyledNoticeBarContent = styled.span`
  color: inherit;
  font-size: inherit;
  font-weight: 700;
  @media (max-width: ${mobileWidth}) {
    line-height: 1.4;
    width: 100%;
  }
`

const StyledNoticeBar = styled.p`
  height: 58px;
  padding: 0 29px 0 27px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 2px;
  background-color: ${({ color }: StyledNoticeBarProps) => color};
  border: solid 1px ${({ borderColor }) => borderColor};
  color: ${({ textColor }) => textColor};

  ${StyledNoticeBarContent} {
    a {
      color: rgba(0, 79, 255, 0.75);
      border-bottom: none;
    }
  }

  margin: 10px 0;

  h1 + & {
    margin-bottom: 60px;
  }

  p + & {
    margin-top: 30px;
  }

  a {
    font-size: 16px;
    color: ${({ textColor }) => textColor};
    text-decoration: none;
    display: inline-block;
    border-bottom: solid 1px ${({ textColor }) => textColor};
    @media (max-width: ${mobileWidth}) {
      line-height: 1.4;
    }
  }

  @media (max-width: ${mobileWidth}) {
    flex-direction: column;;
    padding: 15px 20px;
    height: auto;
    h1 + & {
      margin-bottom: 50px;
    }

    p + & {
      margin-top: 20px;
    }
  }
`

const NoticeBarLink: React.SFC<LinkProps> = ({
  title,
  to,
  outlink
}) => outlink
  ? <a
    href={to}
    target='_blank'
    rel='noreferrer'
  >{title}</a>
  : <Link href={to}><a>{title}</a></Link>

const ActionButton: React.SFC<ActionButtonProps> = ({
  text,
  onClick
}) => <button onClick={onClick}>{text}</button>

export const NoticeBar: React.SFC<PropsWithChildren<NoticeBarProps & StyledNoticeBarProps>>  = ({
  color,
  borderColor,
  textColor,
  textLinkColor,
  text,
  link,
  actionButton,
  style
}) => {
  return (
    <StyledNoticeBar
    color={color}
    borderColor={borderColor}
    textColor={textColor}
    textLinkColor={textLinkColor}
    style={style}
    >
      <StyledNoticeBarContent>
        {text}
      </StyledNoticeBarContent>
      {!!link && <NoticeBarLink {...link} />}
      {!!actionButton && <ActionButton {...actionButton} />}
    </StyledNoticeBar>
  )
}
