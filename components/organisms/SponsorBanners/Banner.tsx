import styled from '@emotion/styled'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { paths } from 'routes/paths'
import { mobileWidth } from 'styles/layout'

const BannerLi = styled.li`
list-style: none;
display: inline-block;
width: 20%;
padding: 3%;
box-sizing: border-box;

&.keystone
{
  width: 90%;
}

&.diamond,
&.sapphire
{
  width: 50%;
}

&.platinum {
  width: 33%;
}

&.gold {
  width: 25%;
}

&.sapphire.square,
&.diamond.square {
  width: 170px;
  @media (max-width: ${mobileWidth}) {
      width: 100px;
  }
}

&.platinum.square {
  width: 150px;
  @media (max-width: ${mobileWidth}) {
      width: 90px;
  }
}

&.square {
  width: 120px;
  @media (max-width: ${mobileWidth}) {
      width: 70px;
  }
}
`

const BannerWrapper = styled.div`
`

const BannerImage = styled.img`
  width: 100%;
  height: auto;
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
            <a>
              <BannerWrapper>
                <BannerImage
                  id={banner.id}
                  alt={banner.name}
                  src={banner.logoImage}
                  onLoad={(event) => this.handleImageLoaded(event)}/>
              </BannerWrapper>
            </a>
          </Link>
        </BannerLi>
      </>
    )
  }
}
