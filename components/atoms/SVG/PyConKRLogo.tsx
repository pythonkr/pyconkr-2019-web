import React from 'react'

interface Prop {
  width: number,
  height: number,
}

export const PyConKRLogo: React.SFC<Prop> = ({
  width,
  height,
}) => (
  <img src='../../../static/icons/logo.svg' width={width} height={height} alt='PyCon KR' />
)
