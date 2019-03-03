import styled from '@emotion/styled'
import intl from 'react-intl-universal'

const SNSLinkA = styled.a`
  display: inline-flex;
  height: 36px;
  align-items: center;
  text-decoration: none;
`

type SNSLinkPropTypes = {
  to: string;
  intlKey: string;
  name: string;
}

export const SNSLink = ({ to, intlKey, name }: SNSLinkPropTypes) => {
  return (
    <SNSLinkA
      href={to}
      target='blank'
    >
      <span>{intl.get(intlKey)
        .defaultMessage(name)}</span>
    </SNSLinkA>
  )
}
