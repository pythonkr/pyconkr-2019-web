import styled from '@emotion/styled'
import intl from 'react-intl-universal'

const SNSLinkA = styled.a`
  display: inline-flex;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  
  svg {
    width: 100%;
    height: 100%;
  }
`

type SNSLinkPropTypes = {
  to: string;
  intlKey: string;
  name: string;
  src: string;
  viewBox: string;
}

export const SNSLink = ({ to, intlKey, name, viewBox, src }: SNSLinkPropTypes) => {
  return (
    <SNSLinkA
      href={to}
      target='blank'
    >
      {/*<span>{intl.get(intlKey)*/}
        {/*.defaultMessage(name)}</span>*/}
      <span aria-label={intl.get(intlKey).defaultMessage(name)}>
        {/*<img alt={intl.get(intlKey).defaultMessage(name)} src={intl.get(intlKey).defaultMessage(src)}/>*/}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={intl.get(intlKey).defaultMessage(viewBox)}>
          <path d={intl.get(intlKey).defaultMessage(src)}/>
        </svg>
      </span>
    </SNSLinkA>
  )
}
