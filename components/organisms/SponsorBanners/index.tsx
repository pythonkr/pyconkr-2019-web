import styled from '@emotion/styled'
import classNames from 'classnames'
import {
  H2, H3, Section
} from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { observer } from 'mobx-react'
import { RouterProps } from 'next/router'
import { StoresType } from 'pages/_app'
import React from 'react'
import { paths } from 'routes/paths'
import { mobileWidth } from 'styles/layout'

const BannersWrapper = styled.ul`
    margin: 0 auto 15px auto;
    padding: 0;
    text-align: center;
`

type PropsType = {
  router: RouterProps;
  stores: StoresType;
}

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

class Banner extends React.Component<BannerPropsType, { isSquare: boolean }> {
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
        <BannerLi className={boxClass}>
          <a href={`${paths.sponsor.detail}?id=${banner.id}`}>
            <BannerWrapper>
              <BannerImage
                id={banner.id}
                alt={banner.name}
                src={banner.logoImage}
                onLoad={(event) => this.handleImageLoaded(event)}/>
            </BannerWrapper>
          </a>
        </BannerLi>
      </>
    )
  }
}
@observer
class SponsorBanners extends React.Component<PropsType> {
  render() {
    const {stores} = this.props
    const {sponsors, sponsorLevels} = stores.sponsorStore

    const sponsorBanners = {} as any
    sponsorLevels.forEach((sponsorLevel) => {
      sponsorBanners[sponsorLevel.id] = {
        name: sponsorLevel.name,
        sponsors: []
      }
    })

    sponsors.forEach((sponsor) => {
      const sponsorLevel = sponsor && sponsor.level && sponsor.level.id
      const sponsorList = sponsorLevel && sponsorBanners[sponsorLevel.toString()].sponsors
      const sponsorBanner = {
        id: sponsor.id,
        name: sponsor.name,
        logoImage: sponsor.logoImage,
      }
      sponsorList.push(sponsorBanner)
    })

    return <Section>
      <H2><IntlText intlKey='constant.sponsor'>🧚‍♀️ 후원사 🧚‍♂️</IntlText></H2>
      {sponsorLevels.map(sponsorLevel => {

      return (
        <SponsorBannersPerLevel
          key={sponsorLevel.id}
          level={sponsorLevel as any}
          banners={sponsorBanners[sponsorLevel.id].sponsors}/>
      )})}
    </Section>
  }
}

type BannerPerLevelType = {
  key: string;
  level: {
    name: string;
    nameEn: string;
  };
  banners: any[];
}
const SponsorBannersPerLevel = (props: BannerPerLevelType) => {
  const bannerExists = props.banners.length > 0
  if (bannerExists) {
    return (<>
      <H3>{props.level.name}</H3>
      <BannersWrapper>
        {
          props.banners.map(banner => {
            <Banner key={banner.id} banner={banner} levelName={props.level.nameEn.toLowerCase()}/>
          })
        }
      </BannersWrapper>
    </>)
  }

  return null
}

export default SponsorBanners
