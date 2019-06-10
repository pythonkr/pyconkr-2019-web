import styled from '@emotion/styled'
import {inject, observer} from 'mobx-react'
import {RouterProps, withRouter} from 'next/router'
import {IntlText} from 'components/atoms/IntlText'
import {paths} from 'routes/paths'
import {StoresType} from 'pages/_app'
import React from 'react'
import {
  Section, H2, H3
} from 'components/atoms/ContentWrappers'

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
    width: 100%;
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

  &.sapphire.square {
    width: 150px;
  }

  &.square {
    width: 120px;
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

class Banner extends React.Component<BannerPropsType> {
  constructor(props) {
    super(props)
    this.state = {isSquare: false}
  }

  handleImageLoaded = event => {
    if (event.target.height === event.target.width) {
      this.setState({isSquare: true})
    }
    console.log(event.target.height, event.target.width)
  }

  render() {
    const {levelName, banner} = this.props
    const boxClass = [levelName]
    if (this.state.isSquare) {
      boxClass.push('square')
    }

    return (<>
    <BannerLi className={boxClass.join(' ')}>
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
  </>)
  }
}

const SponsorBannersPerLevel = (props) => {
  const bannerExists = props.banners.length > 0
  if (bannerExists) {
    return (<>
      <H3>{props.level.name}</H3>
      <BannersWrapper>
        {
          props.banners.map(banner =>
            <Banner banner={banner} levelName={props.level.nameEn.toLowerCase()}/>
          )
        }
      </BannersWrapper>
    </>)
  }
  return null
}

@inject('stores')
@(withRouter as any)
@observer
class SponsorBanners extends React.Component<PropsType> {
  render() {
    const {stores} = this.props
    const {sponsors, sponsorLevels} = stores.sponsorStore

    let sponsorBanners = {}
    sponsorLevels.forEach(function (sponsorLevel) {
      sponsorBanners[sponsorLevel.id] = {
        name: sponsorLevel.name,
        sponsors: []
      }
    })

    sponsors.forEach(function (sponsor) {
      const sponsorLevel = sponsor.level.id
      const sponsorList = sponsorBanners[sponsorLevel.toString()].sponsors
      const sponsorBanner = {
        id: sponsor.id,
        name: sponsor.name,
        logoImage: sponsor.logoImage,
      }
      sponsorList.push(sponsorBanner)
    })

    return <Section>
      <H2><IntlText intlKey='constant.sponsor'>🧚‍♀️ 후원사 🧚‍♂️</IntlText></H2>
      {
        sponsorLevels.map(sponsorLevel =>
          <SponsorBannersPerLevel
            level={sponsorLevel}
            banners={sponsorBanners[sponsorLevel.id].sponsors}/>
        )
      }
    </Section>
  }
}

export default SponsorBanners
