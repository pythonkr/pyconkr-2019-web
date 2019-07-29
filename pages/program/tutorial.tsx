import { H1, H2, Ul, Li, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import React from 'react'
import { paths, programMenu } from 'routes/paths'
import { withNamespaces } from '../../i18n'
import {Loading} from 'components/atoms/Loading'
import _ from 'lodash'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { ProgramUl, ProgramItem } from 'components/molecules/Program/List'
import { AlertBar } from 'components/atoms/AlertBar'


const TUTORIALS = gql`
query Tutorials {
  tutorials {
    id
    name
    owner {
      profile {
        name
      }
    }
    difficulty {
      name
      nameEn
    }
  }
}
`

export type PropsType = {
  t: i18next.TFunction;
}

const TutorialList = (props) => {
  const { tutorials }  = props
  
  return (<>
    <ProgramUl>
      {
        tutorials.map(({id, name, owner, difficulty}) => {
          const href = `${paths.program.tutorialDetail}?id=${id}`
          return (
            <ProgramItem
              key={ id } 
              href={href}
              speakerName={owner ? owner.profile.name : ''}
              name={name}
              difficulty={difficulty} />
          )
        })
      }
    </ProgramUl>
  </>)
}

export class Tutorial extends React.Component<PropsType> {
  render() {
    const { t } = this.props
    const title = t('program:tutorial.title')

    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', {title})} intlKey='' />}
        footer={<Footer />}
      >
        <LocalNavigation list={programMenu.submenu} />
        <H1>
          { title }
        </H1>
        <Section>
          <Paragraph>
            { t('program:tutorial.desc1-1') }
          </Paragraph>
          <Paragraph>
            { t('program:tutorial.desc1-2') }
          </Paragraph>
        </Section>
        <Section>
          <H2>{ t('program:tutorial.header2') }</H2>
          <AlertBar 
            text={t('program:common.goToBuyTicket')} 
            link={
              {
                title: t('program:common.goToBuyTicketButton'), 
                to: paths.ticket.tutorial, 
                outlink:false
              }
            }
          />
          <Paragraph>{ t('program:tutorial.desc2') }</Paragraph>
          <Query query={TUTORIALS}>
            {({ loading, error, data }) => {
              if (loading || error) 
                return (<Loading width={50} height={50}/>);
              const tutorials = data.tutorials
              if(_.isEmpty(tutorials)){
                return (
                    <AlertBar text={t('program:common.waitingAlert')} />
                )
              }
              return (
                <TutorialList tutorials={ data.tutorials }/>
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

export default withNamespaces(['program'])(Tutorial)
