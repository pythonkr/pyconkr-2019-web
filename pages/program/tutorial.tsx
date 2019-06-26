import { H1, H2, Ul, Li, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import React from 'react'
import { programMenu } from 'routes/paths'
import { withNamespaces } from '../../i18n'
import {Loading} from 'components/atoms/Loading'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

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
    }
  }
}
`

export type PropsType = {
  t: i18next.TFunction;
}

const TutorialList = (props) => {
  const { tutorials }  = props
  console.log(props)
  console.log(tutorials)
  return (<>
    <Ul>
      {
        tutorials.map(({id, name, owner, difficulty}) => {
          return (
            <Li key={id}>{name}/{owner ? owner.profile.name : ''}/{difficulty.name}</Li>
          )
        })
      }
    </Ul>
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
          <Paragraph>{ t('program:tutorial.desc2') }</Paragraph>
          <Query query={TUTORIALS}>
            {({ loading, error, data }) => {
              if (loading || error) return (<Loading width={50} height={50}/>);
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
