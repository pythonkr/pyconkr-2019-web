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
import { paths, timetableMenu } from 'routes/paths'

import { SprintNode } from 'lib/apollo_graphql/queries/getSprints'
import { PageDefaultPropsType } from 'types/PageDefaultPropsType'
import { withNamespaces } from '../../i18n'

@(withRouter as any)
@inject('stores')
@observer
class Sprint extends React.Component<PageDefaultPropsType> {
  static async getInitialProps() {
    return {
      namespacesRequired: ['timetable'],
    }
  }

  async componentDidMount() {
    const { stores } = this.props
    const { retrieveSprints, sprints } = stores.programStore

    if (_.isEmpty(sprints)) {
      await retrieveSprints()
    }
  }

  componentWillUnmount() {
    const { stores } = this.props
    const { setSelectedDate } = stores.programStore
    setSelectedDate(null)
  }

  onClickDateNav = (newSelectedDate: Date) => {
    const { stores } = this.props
    const { setSelectedDate, selectedDate } = stores.programStore

    if (selectedDate === newSelectedDate) return

    setSelectedDate(newSelectedDate)
  }

  render() {
    const { t, stores } = this.props
    const { selectedDate, sortedSprints, setSelectedDate } = stores.programStore
    const { sprintStartAt, sprintFinishAt } = stores.scheduleStore.schedule
    const _title = t('timetable:sprint.title')
    if (!selectedDate) setSelectedDate(sprintStartAt)

    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title: _title })} intlKey='' />}
        footer={<Footer />}
      >
        <LocalNavigation list={timetableMenu.submenu} />
        <H1>{ _title }</H1>
        <DateNavWrapper>
          <DateNav isActive>
            {`${sprintStartAt} ~ ${sprintFinishAt}`}
          </DateNav>
        </DateNavWrapper>
        <TimeTable stores={stores} t={t} timetableData={sortedSprints as SprintNode[]} baseDetailHref={paths.program.sprintDetail}/>
      </PageTemplate >
    )
  }
}

export default  withNamespaces(['timetable'])(Sprint)
