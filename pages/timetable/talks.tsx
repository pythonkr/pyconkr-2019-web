import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import * as React from 'react'

import { H1 } from 'components/atoms/ContentWrappers'

import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import TimeTable from 'components/organisms/Timetable'
import { DateNav, DateNavWrapper } from 'components/organisms/Timetable/StyledComponents'
import PageTemplate from 'components/templates/PageTemplate'

import { PresentationNode } from 'lib/apollo_graphql/queries/getPresentations'
import { paths, timetableMenu } from 'routes/paths'
import { PageDefaultPropsType } from 'types/PageDefaultPropsType'
import { withNamespaces } from '../../i18n'
import { formatDateInTimetable } from 'utils/formatDate'

@(withRouter as any)
@inject('stores')
@observer
class Talks extends React.Component<PageDefaultPropsType> {
  static async getInitialProps() {
    return {
      namespacesRequired: ['timetable'],
    }
  }

  async componentDidMount() {
    const { stores } = this.props
    const { presentations } = stores.cfpStore
    if (_.isEmpty(presentations)) {
      const _presentations = await stores.cfpStore.retrievePresentations()
      if (_presentations) stores.cfpStore.setPresentations(_presentations)
    }
  }

  onClickDateNav = (newSelectedDate: Date) => {
    const { stores } = this.props
    const { setSelectedDate, selectedDate } = stores.cfpStore

    if (selectedDate === newSelectedDate) return

    setSelectedDate(newSelectedDate)
  }

  render() {
    const { t, stores } = this.props
    const { selectedDate, setSelectedDate, conferenceTalks } = stores.cfpStore
    const { conferenceStartAt, conferenceFinishAt } = stores.scheduleStore.schedule
    const _title = t('timetable:talks.title')
    const today = formatDateInTimetable(new Date().toString())
    setSelectedDate(selectedDate || today)

    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title: _title })} intlKey='' />}
        footer={<Footer />}
      >
        <LocalNavigation list={timetableMenu.submenu} />
        <H1>{ _title }</H1>
        <DateNavWrapper>
          <DateNav
            isActive={stores.cfpStore.selectedDate === conferenceStartAt}
            onClick={() => this.onClickDateNav(conferenceStartAt)}
          >
            {conferenceStartAt}
          </DateNav>
          <DateNav
            isActive={stores.cfpStore.selectedDate === conferenceFinishAt}
            onClick={() => this.onClickDateNav(conferenceFinishAt)}
          >
            {conferenceFinishAt}
          </DateNav>
        </DateNavWrapper>
        <TimeTable stores={stores} t={t} timetableData={conferenceTalks as PresentationNode[]} baseDetailHref={paths.program.talkDetail}/>
      </PageTemplate>
    )
  }
}

export default  withNamespaces(['timetable'])(Talks)
