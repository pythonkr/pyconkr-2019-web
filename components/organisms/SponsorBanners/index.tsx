import styled from '@emotion/styled'
import {
  H2, H3, Section
} from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { inject, observer } from 'mobx-react'
import { RouterProps, withRouter } from 'next/router'
import { StoresType } from 'pages/_app'
import React from 'react'
import { Banner } from './Banner'

const BannersWrapper = styled.ul`
    margin: 0 auto 15px auto;
    padding: 0;
    text-align: center;
`

type PropsType = {
  router?: RouterProps;
  stores?: StoresType;
}

@inject('stores')
@(withRouter as any)
@observer
class SponsorBanners extends React.Component<PropsType> {
  componentDidMount () {
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

    const { sponsors, sponsorLevels } = stores.sponsorStore

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

    return (
      <Section>
        <H2><IntlText intlKey='constant.sponsor'>🧚‍ 후원사 🧚‍</IntlText></H2>
        {sponsorLevels.map(sponsorLevel => {
          const level = sponsorLevel
          const banners = sponsorBanners[sponsorLevel.id].sponsors as any[]
          const isBannersExist = banners.length > 0

          if (!isBannersExist) return null

          return (
            <div key={level.id}>
              <H3>{level.name}</H3>
              <BannersWrapper>
                {banners.map(banner => {
                  return <Banner key={banner.id} banner={banner} levelName={(level.nameEn && level.nameEn.toLowerCase()) || ''}/>
                })}
              </BannersWrapper>
            </div>
          )}
        )}
      </Section>
    )
  }
}

export default SponsorBanners
