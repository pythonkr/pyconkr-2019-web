import { H1, H2, Paragraph, Section, Ul, Li } from 'components/atoms/ContentWrappers'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import React from 'react'
import _ from 'lodash'
import { paths, programMenu } from 'routes/paths'
import { withNamespaces } from '../../i18n'
import { ProgramUl, ProgramItem } from 'components/molecules/Program/List'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { AlertBar } from 'components/atoms/AlertBar'
import {Loading} from 'components/atoms/Loading'

const YOUNGCODERS = gql`
query YoungCoders {
  youngCoders {
    id
    name
    companyName
    difficulty {
      id
      name
      nameEn
      nameKo
    }
  }
}
`

export type PropsType = {
  t: i18next.TFunction;
}

const YoungCoderList = (props: any) => {
  const { youngCoders }  = props
  
  return (<>
    <ProgramUl>
      {
        youngCoders.map(({id, name, companyName, difficulty}) => {
          const href = `${paths.program.youngcoderDetail}?id=${id}`
          return (
            <ProgramItem
              key={ id } 
              href={href}
              speakerName={companyName}
              name={name}
              difficulty={difficulty} />
          )
        })
      }
    </ProgramUl>
  </>)
}

export class Youngcoder extends React.Component<PropsType> {
  render() {
    const { t } = this.props
    const title = t('program:youngCoder.title')

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
          <Paragraph>{ t('program:youngCoder.desc1') }</Paragraph>
        </Section>
        <Section>
          <H2>{ t('program:youngCoder.header2') }</H2>
          <AlertBar 
            text={t('program:common.goToBuyTicket')} 
            link={
              {
                title: t('program:common.goToBuyTicketButton'), 
                to: paths.ticket.youngcoder, 
                outlink:false
              }
            }
          />
          <Paragraph>{ t('program:youngCoder.desc2') }</Paragraph>
          <Query query={YOUNGCODERS}>
            {({ loading, error, data }) => {
                if (loading || error) 
                  return (<Loading width={50} height={50}/>)
                const youngCoders = data.youngCoders
                if(_.isEmpty(youngCoders)){
                  return (
                      <AlertBar text={t('program:common.waitingAlert')} />
                  )
                }
                return (
                  <YoungCoderList youngCoders={youngCoders}/>
                )
            }}
          </Query>
        </Section>
        <Section>
          <H2>{ t('program:youngCoder.header3') }</H2>
          <Paragraph>
            { t('program:youngCoder.desc3-1') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc3-2') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc3-3') }
          </Paragraph>
        </Section>
        <Section>
          <H2>{ t('program:youngCoder.header4') }</H2>
          <Paragraph>
            { t('program:youngCoder.desc4-1') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc4-2') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc4-3') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc4-4') }
          </Paragraph>
        </Section>
        <Section>
          <H2>{ t('program:youngCoder.header5') }</H2>
          <Paragraph>
            { t('program:youngCoder.desc5-1') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc5-2') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc5-3') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc5-4') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc5-5') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc5-6') }
          </Paragraph>
        </Section>
        <Section>
          <H2>{ t('program:youngCoder.header6') }</H2>
          <Paragraph> 
            { t('program:youngCoder.desc6-1') }
          </Paragraph>
          <Ul>
            <Li>{ t('program:youngCoder.desc6-1-1') }</Li>
            <Li>{ t('program:youngCoder.desc6-1-2') }</Li>
          </Ul>

          <Paragraph> 
            { t('program:youngCoder.desc6-2') }
          </Paragraph>
          <Ul>
            <Li>{ t('program:youngCoder.desc6-2-1') }</Li>
          </Ul>

        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['program'])(Youngcoder)
