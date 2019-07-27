import i18next from 'i18next'
import _ from 'lodash'
import * as React from 'react'

import { Loading } from 'components/atoms/Loading'
import TimetableContentItem from 'components/molecules/TimetableContentItem'
import { differenceInMilliseconds } from 'date-fns'
import { PresentationNode } from 'lib/apollo_graphql/queries/getPresentations'
import { SprintNode } from 'lib/apollo_graphql/queries/getSprints'
import { TutorialNode } from 'lib/apollo_graphql/queries/getTutorials'
import { observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import { TimetableContents } from './StyledComponents'

type PropsType = {
  timetableData: any;
  stores: StoresType;
  t: i18next.TFunction;
}

@observer
class TimeTable extends React.Component<PropsType> {
  render() {
    const { timetableData } = this.props

    if (_.isNil(timetableData)) return null

    return (
      <>
        <TimetableContents>
          {timetableData && timetableData.map((item: PresentationNode | TutorialNode | SprintNode, index: number) => {
            const { owner, place, name, id, startedAt, finishedAt, isBreaktime } = item
            const speakerName = owner && owner.profile && owner.profile.name
            const roomNo = place && place.name
            let difficultyKo
            let difficultyEn
            if (item.__typename !== 'SprintNode') {
              difficultyKo = item.difficulty && item.difficulty.name || ''
              difficultyEn = item.difficulty && item.difficulty.nameEn || ''
            }
            const previousItem = timetableData[index - 1]
            const nextItem = timetableData[index + 1]
            let isSameGroup
            let isLastItem = (index + 1) === _.size(timetableData)

            if (previousItem) {
              const timeDiffCurrent = differenceInMilliseconds(startedAt, finishedAt)
              const timeDiffPrevious = differenceInMilliseconds(previousItem.startedAt, previousItem.finishedAt)
              isSameGroup = timeDiffCurrent === timeDiffPrevious
            }

            if (nextItem) {
              const timeDiffCurrent = differenceInMilliseconds(startedAt, finishedAt)
              const timeDiffNext = differenceInMilliseconds(nextItem.startedAt, nextItem.finishedAt)
              isLastItem = timeDiffCurrent !== timeDiffNext
            }

            return (
              <TimetableContentItem
                key={`tableContentItem_${id}`}
                id={id}
                startAt={startedAt}
                finishAt={finishedAt}
                roomNo={roomNo || 'Not Assigned'}
                speakerName={speakerName || 'Unknown'}
                title={name || 'Unknown'}
                difficultyKo={difficultyKo}
                difficultyEn={difficultyEn}
                isFirstItem={index === 0}
                isLastItem={isLastItem}
                isSameGroup={isSameGroup}
                isBreaktime={isBreaktime}
              />
            )
          })}
        </TimetableContents>
      </>
    )
  }
}

export default TimeTable
