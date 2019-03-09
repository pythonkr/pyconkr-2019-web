import React from 'react'

interface Prop {
  className?: string,
  width: number,
  height: number,
  color: string
}

export const NaverLogo: React.SFC<Prop> = ({
  className = '',
  width,
  height,
  color
}) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    viewBox='0 0 19.1 17.5'
    aria-labelledby='title'
  >
    <title id='title'>Naver Logo Icon</title>
    <path fill={color} d='M12.59 0v8.83L6.54 0H0v17.5h6.52V8.67l6.04 8.83h6.54V0h-6.51z'/>
  </svg>
)
