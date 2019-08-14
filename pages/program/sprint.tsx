import { Button } from 'components/atoms/Button'
import { ContentButtonWrapper, H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
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

const SPRINTS = gql`
query Sprints {
  sprints {
    id
    name
    owner {
      profile {
        name
      }
    }
  }
}
`

export type PropsType = {
  t: i18next.TFunction;
}

const SprintList = (props) => {
  const { sprints }  = props
  
  return (<>
    <ProgramUl>
      {
        sprints.map(({id, name, owner}) => {
          const href = `${paths.program.sprintDetail}?id=${id}`
          return (
            <ProgramItem
              key={ id } 
              href={href}
              speakerName={owner ? owner.profile.name : ''}
              name={name} />
          )
        })
      }
    </ProgramUl>
  </>)
}

export class Sprint extends React.Component<PropsType> {
  render() {
    const { t } = this.props
    const title = t('program:sprint.title')

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
            { t('program:sprint.desc1-1') }
          </Paragraph>
          <Paragraph>
            { t('program:sprint.desc1-2') }
          </Paragraph>
          <ContentButtonWrapper>
            {/*<Button*/}
            {/*  intlKey='tempkey'*/}
            {/*  to='https://forms.gle/6C5JCqGtC657DQ6i6'*/}
            {/*  outlink*/}
            {/*>스프린트 진행 신청하기</Button>*/}
          </ContentButtonWrapper>
        </Section>
        <Section>
          <H2>{ t('program:sprint.header2') }</H2>
          <AlertBar 
            text={t('program:common.goToBuyTicket')} 
            link={
              {
                title: t('program:common.goToBuyTicketButton'), 
                to: paths.ticket.sprint, 
                outlink:false
              }
            }
          />
          <Paragraph>{ t('program:sprint.desc2') }</Paragraph>
          <Query query={SPRINTS}>
            {({ loading, error, data }) => {
              if (loading || error) 
                return (<Loading width={50} height={50}/>);
              const sprints = data.sprints
              if(_.isEmpty(sprints)){
                return (
                    <AlertBar text={ t('program:common.waitingAlert') } />
                )
              }
              return (
                <SprintList sprints={ data.sprints }/>
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

export default withNamespaces(['program'])(Sprint)
