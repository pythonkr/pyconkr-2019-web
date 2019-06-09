import styled from '@emotion/styled'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import { RouterProps, withRouter } from 'next/router'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"

import { StoresType } from 'pages/_app'
import React from 'react'
import {
    Section, H2, H3
  } from 'components/atoms/ContentWrappers'

const SponsorBannersSlider = styled.div`
//   width: 940px;
  height: 250px;
  background-color: rgba(216, 216, 216, 0);
  margin-left: auto;
  margin-right: auto;

  h2 {
    font-size: 18px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #4a4a4a;
  }
`

const BannersWrapper = styled.div`
    height: 130px;

    margin-left: auto;
    margin-right: auto;

    width: max-content;
    max-width: 100%;

    white-space: nowrap;
    overflow-x: scroll;
`

const SliderWrapper = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  height: 100%;
  padding-top: 47px;
  padding-bottom: 42px;

  margin-left: auto;
  margin-right: auto;
`

type PropsType = {
    router: RouterProps;
    stores: StoresType;
}

const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props
    return (
        <div
      className={className}
      style={{ ...style, height: "40px", display: "block", background: "green" }}
      onClick={onClick}
    >
    </div>
    )
}

const CustomNextArrow = (props) => {
    const { className, style, onClick } = props
    return (
        <div
      className={className}
      style={{ ...style, height: "40px", display: "block", background: "green" }}
      onClick={onClick}
    >
    </div>
    )
}

const Banner = styled.img`
    margin-top: 33px;
    margin-bottom: 0px;
    margin-left: auto;
    margin-right: auto;

    padding-top: 0px
    padding-bottom: 0px;
    padding-left: 10px;
    padding-right: 10px;

    height: 80px;

    position: relative;
    display: inline;
`


const SponsorBannersPerLevel = (props) => {
    return (<>
        <h2>{props.level.name}</h2>
        <BannersWrapper>
            {
                props.banners.map( banner => 
                    <Banner id={banner.id} 
                            alt={banner.name}
                            src={banner.logoImage} />
                )
            }
        </BannersWrapper>
    </>)
}

@inject('stores')
@(withRouter as any)
@observer
class SponsorBanners extends React.Component<PropsType> {
    render() {
        const { stores } = this.props
        const { sponsors, sponsorLevels } = stores.sponsorStore

        // const settings = {
        //     dots: true,
        //     infinite: true,
        //     speed: 500,
        //     slidesToShow: 1,
        //     slidesToScroll: 1,
        //     autoplay: true,
        //     autoplaySpeed: 5000,
        //     cssEase: "linear",
        //     prevArrow: <CustomPrevArrow/>,
        //     nextArrow: <CustomNextArrow/>
        // }

        let sponsorBanners = {}
        sponsorLevels.forEach(function(sponsorLevel) {
            sponsorBanners[sponsorLevel.id] = { 
                name: sponsorLevel.name,
                sponsors: []
            }
        })

        sponsors.forEach(function(sponsor) {
            const sponsorLevel = sponsor.level.id
            const sponsorList = sponsorBanners[sponsorLevel.toString()].sponsors
            const sponsorBanner = {
                sponsorId: sponsor.id,
                name: sponsor.name,
                logoImage: sponsor.logoImage,
            }
            sponsorList.push(sponsorBanner)
        })

        return <Section>
            <H2>후원사</H2>
            {/* <SponsorBannersPerLevel level={sponsorLevel} banners={sponsorBanners[sponsorLevel.id].sponsors} */}
                {
                    sponsorLevels.map( sponsorLevel => 
                        <SponsorBannersPerLevel 
                            level={sponsorLevel} 
                            banners={sponsorBanners[sponsorLevel.id].sponsors>
                                {sponsorLevel.name}
                        </SponsorBannersPerLevel> )
                }    
            
            
            {/* <SponsorBannersSlider>
                <SliderWrapper>
                    <Slider {...settings}>
                        {
                            sponsorLevels.map( sponsorLevel => <SponsorBannersPerLevel level={sponsorLevel} banners={sponsorBanners[sponsorLevel.id].sponsors} />)
                        }
                    </Slider>
                </SliderWrapper>
            </SponsorBannersSlider> */}
        </Section>
    }
}

export default SponsorBanners
