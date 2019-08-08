import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import _ from 'lodash'
import React from 'react'
import { paths, programMenu } from 'routes/paths'
import { withNamespaces } from '../../i18n'
import {Loading} from 'components/atoms/Loading'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { ProgramUl, ProgramItem } from 'components/molecules/Program/List'
import { AlertBar } from 'components/atoms/AlertBar'

const SPONSORS = gql`
query Sponsors {
  sponsors {
    id
    name
    openLunchTitle
    level {
      id
      openLunch
    }
  }
}
`

export type PropsType = {
  t: i18next.TFunction;
}

const OpenlunchList = (props) => {
  const { sponsors }  = props
  
  return (<>
    <ProgramUl>
      {
        sponsors.map(({id, name, openLunchTitle}) => {
          const href = `${paths.program.openLunchDetail}?id=${id}`
          return (
            <ProgramItem
              key={ id } 
              href={href}
              speakerName={name}
              name={openLunchTitle} />
          )
        })
      }
    </ProgramUl>
  </>)
}

export class Openlunch extends React.Component<PropsType> {
  render() {
    const { t } = this.props
    const title = t('program:openlunch.title')

    return (
      <PageTemplate
        header={<Header title={ t('common:pageTitle', {title}) } intlKey='' />}
        footer={<Footer />}
      >
        <LocalNavigation list={programMenu.submenu} />
        <H1>
          { title }
        </H1>
        <Section>
          <Paragraph>
            { t('program:openlunch.desc1-1') }
          </Paragraph>
          <Paragraph>
            { t('program:openlunch.desc1-2') }
          </Paragraph>
        </Section>
        <Section>
          <H2>{ t('program:openlunch.header2') }</H2>
          <Paragraph>{ t('program:openlunch.desc2') }</Paragraph>
          <Query query={SPONSORS}>
            {({ loading, error, data }) => {
              if (loading) return (<Loading width={50} height={50}/>)
              if (error) {
                console.log(error)
                return (<AlertBar text={error.message} />)
              }
              const sponsors = data.sponsors.filter(sponsor => sponsor.level.openLunch && sponsor.openLunchTitle)
              if(_.isEmpty(sponsors)){
                return (
                    <AlertBar text={ t('program:common.waitingAlert') } />
                )
              }
              return (
                <OpenlunchList sponsors={ sponsors }/>
              )
            }}
          </Query>
        </Section>
        <Section>
          <H2>{t('common:contact')}</H2>
          <Paragraph>
            <a href='mailto: program@pycon.kr'>program@pycon.kr</a>
          </Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['program'])(Openlunch)
