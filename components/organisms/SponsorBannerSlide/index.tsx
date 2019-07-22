import styled from '@emotion/styled'
import { H2, H3 } from 'components/atoms/ContentWrappers'
import { WideContentWidthWrapper } from 'components/atoms/WideContentWidthWrapper'
import _ from 'lodash'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { RouterProps, withRouter } from 'next/router'
import { StoresType } from 'pages/_app'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { HEADING_LIGHT_BLACK } from 'styles/colors'
import { mobileWidth } from 'styles/layout'
import { Banner } from './Banner'

const BannersWrapper = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 15px auto;
  padding: 0;
  text-align: center;
  @media (max-width: ${mobileWidth}) {
    margin-bottom: 20px;
  }
`

const SliderWrapper = styled.div`
padding: 50px 30px 25px;
margin-bottom: 42px;
@media (max-width: ${mobileWidth}) {
  margin-bottom: 22px;
}

& .slick-arrow {
  width: 23px;
  height: 42px;
  @media (max-width: ${mobileWidth}) {
    width: 18px;
    height: 28px;
  }
}
& .slick-arrow::before {
  content: none;
}
& .slick-track {
  vertical-align: middle;
}
& .slick-dots li button:before {
  line-height: 1;
}
& .slick-dots {
  @media (max-width: ${mobileWidth}) {
    bottom: -14px;
  }
}
`

const SponsorGroupTitle = styled(H3)`
color: ${HEADING_LIGHT_BLACK};
font-size: 18px;
text-align: center;
margin-top: 0;
margin-bottom: 15px;
font-weight: 500;

@media (max-width: ${mobileWidth}) {
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 10px;
}
`

const BannerGroupWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

type PropsType = {
  router?: RouterProps;
  stores?: StoresType;
}

const bannerForRowMap = {
  1: 1,
  2: 2,
  3: 2,
  4: 4,
  5: 5,
  6: 5,
  7: 5,
  8: 5
}

const NextArrow = (props) => <button {...props}>
  <svg width='100%' height='100%' viewBox='0 0 23 42' xmlns='http://www.w3.org/2000/svg'>
    <path d='M1 1l20 19.84L1 41' stroke='#D0D2D3' strokeWidth='2' fill='none' fillRule='evenodd' />
  </svg>
</button>

const PrevArrow = (props) => <button {...props}>
  <svg width='100%' height='100%' viewBox='0 0 23 42' xmlns='http://www.w3.org/2000/svg'>
    <path d='M21.84 1L2 20.84 21.84 41' stroke='#D0D2D3' strokeWidth='2' fill='none' fillRule='evenodd' />
  </svg>
</button>

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 700,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  pauseOnFocus: true,
  pauseOnDotsHover: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
}

@inject('stores')
@(withRouter as any)
@observer
class SponsorBannerSlide extends React.Component<PropsType> {
  componentDidMount() {
    const { stores } = this.props
    if (stores) {
      const { isInitialized } = stores.sponsorStore

      if (!isInitialized) {
        stores.sponsorStore.initialize()
      }
    }
  }

  render() {
    const { stores } = this.props

    if (!stores) return null

    const { sponsors, sponsorLevels } = toJS(stores.sponsorStore)

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

    let bannerGroups: {
      name: string | null;
      id: string;
      banners: any;
    }[] = []
    sponsorLevels.forEach(sponsorLevel => {
      const level = sponsorLevel
      const banners = sponsorBanners[sponsorLevel.id].sponsors as any[]
      const bannerGroupsForLevel = _.chunk(banners, (bannerForRowMap as any)[level.id])
      bannerGroups = [
        ...bannerGroups,
        ...bannerGroupsForLevel.map((group, index) => ({
          name: sponsorLevel.nameEn,
          id: `${sponsorLevel.id}${index}`,
          banners: group
        }))
      ]
    })

    return (
      <WideContentWidthWrapper>
        {/* <H2><IntlText intlKey='constant.sponsor'>🧚‍♀️ 후원사 🧚‍♂️</IntlText></H2> */}
        <SliderWrapper>
          <Slider {...sliderSettings}>
            {bannerGroups && bannerGroups.map(bannerGroup => <BannerGroupWrapper key={bannerGroup.id}>
              <SponsorGroupTitle>후원사 - {bannerGroup.name}</SponsorGroupTitle>
              <BannersWrapper>
                {bannerGroup.banners.map(banner => <Banner
                  key={banner.id}
                  banner={banner}
                  levelName={(bannerGroup.name && bannerGroup.name.toLowerCase()) || ''}
                />)}
              </BannersWrapper>
            </BannerGroupWrapper>)}
          </Slider>
        </SliderWrapper>
      </WideContentWidthWrapper>
    )
  }
}

export default SponsorBannerSlide
