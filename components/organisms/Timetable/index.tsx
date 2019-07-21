import i18next from 'i18next'
import _ from 'lodash'
import * as React from 'react'

import TimetableContentItem from 'components/molecules/TimetableContentItem'
import { PresentationNode } from 'lib/apollo_graphql/queries/getPresentations'
import { observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import { DateNav, DateNavWrapper, TimetableContents } from './StyledComponents'

type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

@observer
class TimeTable extends React.Component<PropsType> {
  render() {
    const { stores } = this.props
    const { conferenceTalks } = stores.cfpStore

    return (
      <>
        <DateNavWrapper>
          <DateNav isActive>2019. 08. 17</DateNav>
          <DateNav>2019. 08. 18</DateNav>
        </DateNavWrapper>
        <TimetableContents>
          {conferenceTalks && (conferenceTalks as PresentationNode[]).map((talk, index) => {
            const { owner, place, name, difficulty, id } = talk
            const speakerName = owner && owner.profile && owner.profile.name
            const roomNo = place && place.name

            return (
              <TimetableContentItem
                key={`tableContentItem_${id}`}
                id={id}
                startAt={talk.startedAt}
                finishAt={talk.finishedAt}
                roomNo={roomNo || 'Not Assigned'}
                speakerName={speakerName || 'Unknown'}
                title={name || 'Unknown'}
                difficultyKo={difficulty && difficulty.name || ''}
                difficultyEn={difficulty && difficulty.nameEn || ''}
                isFirstItem={index === 0}
                isLastItem={(index + 1) === _.size(conferenceTalks)}
              />
            )
          })}
        </TimetableContents>
      </>
    )
  }
}

export default TimeTable
