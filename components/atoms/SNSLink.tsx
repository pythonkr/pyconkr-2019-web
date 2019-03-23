import styled from '@emotion/styled'
import intl from 'react-intl-universal'

const SNSLinkA = styled.a`
  display: inline-flex;
  width: 25px;
  height: 25px;
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
  fill: string;
}

export const SNSLink = ({ to, intlKey, name, src, viewBox, fill }: SNSLinkPropTypes) => {
  return (
    <SNSLinkA
      href={to}
      title={name}
      target='blank'
    >
      <span aria-label={intl.get(intlKey).defaultMessage(name)} style={{ width: '20px' }}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox={viewBox}
          fill={fill}
        >
          <path d={src}/>
        </svg>
      </span>
    </SNSLinkA>
  )
}
