import styled from '@emotion/styled'
import { H1, H2, Section } from 'components/atoms/ContentWrappers'
import MarkdownWrapper from 'components/atoms/MarkdownWrapper'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { programMenu } from 'routes/paths'
import { withNamespaces } from '../../i18n'
import { StoresType } from '../_app'

const ProfileImage = styled.div`
  text-align: center;

  img {
    width: 50%;
    border-radius: 50%;
    box-shadow: 0px 0px 20px #DFDFDF
  }
`

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

@inject('stores')
@observer
export class Keynote extends React.Component<PropsType> {
  state = {
    speakers: []
  }

  async componentDidMount() {
    const { stores } = this.props
    const presentations = await stores.cfpStore.retrievePresentations()
    const speakers = presentations.filter(
      (item) => item.isKeynote
    ).map(
      (presentation) => presentation.owner.profile
    )
    this.setState({
      speakers
    })
  }

  render() {
    const { t } = this.props
    const title = t('program:keynote.title')

    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', {title})} intlKey='' />}
        footer={<Footer />}
      >
        <LocalNavigation list={programMenu.submenu} />
        <H1>
          { title }
        </H1>
        {
          this.state.speakers.map(profile => {
            return (
              <Section key={ profile.name }>
                <H2>{ profile.name }</H2>
                <ProfileImage>
                  <img src={ profile.image ? profile.image : profile.avartarUrl } />
                </ProfileImage>
                <Section>
                  <MarkdownWrapper contents={profile.bio}/>
                </Section>
              </Section>
            )
          })
        }
      </PageTemplate>
    )
  }
}

export default withNamespaces(['program'])(Keynote)
