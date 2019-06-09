import styled from '@emotion/styled'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import { RouterProps, withRouter } from 'next/router'
import { IntlText } from 'components/atoms/IntlText'
// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"
// import Slider from "react-slick"

import { StoresType } from 'pages/_app'
import React from 'react'
import {
    Section, H2, H3
  } from 'components/atoms/ContentWrappers'

// const SponsorBannersSlider = styled.div`
// //   width: 940px;
//   height: 250px;
//   background-color: rgba(216, 216, 216, 0);
//   margin-left: auto;
//   margin-right: auto;

//   h2 {
//     font-size: 18px;
//     font-weight: 500;
//     font-style: normal;
//     font-stretch: normal;
//     line-height: normal;
//     letter-spacing: normal;
//     text-align: center;
//     color: #4a4a4a;
//   }
// `

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
`
const BannerWrapper = styled.div`
    
`

const BannerImage = styled.img`
    width: 100%;
    height: auto;
    vertical-align: middle;
`

const Banner = (props) => {
    return (<>
        <BannerLi className={props.levelName}>
            <BannerWrapper>
                <BannerImage
                    id={props.banner.id}
                    alt={props.banner.name}
                    src={props.banner.logoImage}/>
            </BannerWrapper>
        </BannerLi>
    </>)
}

const SponsorBannersPerLevel = (props) => {
    const bannerExists = props.banners.length > 0
    if (bannerExists) {
        return (<>
            <H3>{props.level.name}</H3>
            <BannersWrapper>
                {
                    props.banners.map( banner => 
                        <Banner banner={banner} levelName={props.level.nameEn.toLowerCase()} />
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
        const { stores } = this.props
        const { sponsors, sponsorLevels } = stores.sponsorStore

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
            <H2><IntlText intlKey='constant.sponsor'>🧚‍♀️ 후원사🧚‍♂️</IntlText></H2>
                {
                    sponsorLevels.map( sponsorLevel => 
                        <SponsorBannersPerLevel 
                            level={sponsorLevel} 
                            banners={sponsorBanners[sponsorLevel.id].sponsors}/>
                    )
                }    
        </Section>
    }
}

export default SponsorBanners
