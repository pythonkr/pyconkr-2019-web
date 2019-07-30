import { H1 } from 'components/atoms/ContentWrappers'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import TimeTable from 'components/organisms/Timetable'
import { DateNav, DateNavWrapper } from 'components/organisms/Timetable/StyledComponents'
import PageTemplate from 'components/templates/PageTemplate'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import * as React from 'react'
import { paths } from 'routes/paths'

import { TutorialNode } from 'lib/apollo_graphql/queries/getTutorials'
import { timetableMenu } from 'routes/paths'
import { PageDefaultPropsType } from 'types/PageDefaultPropsType'
import { withNamespaces } from '../../i18n'

@(withRouter as any)
@inject('stores')
@observer
class Tutorial extends React.Component<PageDefaultPropsType> {
  static async getInitialProps() {
    return {
      namespacesRequired: ['timetable'],
    }
  }

  async componentDidMount() {
    const { stores } = this.props
    const { retrieveTutorials, tutorials } = stores.programStore

    if (_.isEmpty(tutorials)) {
      await retrieveTutorials()
    }
  }

  componentWillUnmount() {
    const { stores } = this.props
    const { setSelectedDate } = stores.programStore
    setSelectedDate(null)
  }

  render() {
    const { t, stores } = this.props
    const { sortedTutorials, selectedDate, setSelectedDate } = stores.programStore
    const { tutorialStartAt, tutorialFinishAt } = stores.scheduleStore.schedule
    const _title = t('timetable:tutorial.title')
    if (!selectedDate) setSelectedDate(tutorialStartAt)

    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title: _title })} intlKey='' />}
        footer={<Footer />}
      >
        <LocalNavigation list={timetableMenu.submenu} />
        <H1>{ _title }</H1>
        <DateNavWrapper>
          <DateNav
            isActive={selectedDate === tutorialStartAt}
            onClick={() => setSelectedDate(tutorialStartAt)}
          >
            {tutorialStartAt}
          </DateNav>
          <DateNav
            isActive={selectedDate === tutorialFinishAt}
            onClick={() => setSelectedDate(tutorialFinishAt)}
          >
            {tutorialFinishAt}
          </DateNav>
        </DateNavWrapper>
        <TimeTable stores={stores} t={t} timetableData={sortedTutorials as TutorialNode[]} baseDetailHref={paths.program.tutorialDetail}/>
      </PageTemplate >
    )
  }
}

export default  withNamespaces(['timetable'])(Tutorial)
