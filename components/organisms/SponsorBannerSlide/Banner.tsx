import styled from '@emotion/styled'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { paths } from 'routes/paths'
import { mobileWidth } from 'styles/layout'

const BannerLi = styled.li`
list-style: none;
width: 20%;
padding: 1% 3%;
box-sizing: border-box;

&.keystone
{
  width: 50%;
}

&.diamond,
&.sapphire
{
  width: 40%;
}

&.platinum {
  width: 30%;
}

&.gold {
  width: 20%;
}

&.sapphire.square,
&.diamond.square {
  width: 140px;
  @media (max-width: ${mobileWidth}) {
      width: 80px;
  }
}

&.platinum.square {
  width: 120px;
  @media (max-width: ${mobileWidth}) {
      width: 70px;
  }
}

&.square {
  width: 120px;
  @media (max-width: ${mobileWidth}) {
      width: 70px;
  }
}
`

const BannerImage = styled.img`
  width: 100%;
  vertical-align: middle;
`

type BannerPropsType = {
  levelName: string;
  banner: any;
}

export class Banner extends React.Component<BannerPropsType, { isSquare: boolean }> {
  state = {
    isSquare: false,
  }

  handleImageLoaded = (event: any) => {
    const imgRatio = event.target.height / event.target.width
    if (imgRatio < 1.2 && imgRatio > 0.8) {
      this.setState({ isSquare: true })
    }
  }

  render() {
    const { levelName, banner } = this.props
    const { isSquare } = this.state
    const boxClass = classNames(levelName, { square: !!isSquare })

    return (
      <>
        <BannerLi key={banner.id} className={boxClass}>
          <Link href={`${paths.sponsor.detail}?id=${banner.id}`}>
            <a style={{ display: 'inline-block' }}>
              <BannerImage
                id={banner.id}
                alt={banner.name}
                src={banner.logoImage}
                onLoad={(event) => this.handleImageLoaded(event)}/>
              </a>
          </Link>
        </BannerLi>
      </>
    )
  }
}
