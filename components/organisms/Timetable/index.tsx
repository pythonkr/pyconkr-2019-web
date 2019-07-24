import i18next from 'i18next'
import _ from 'lodash'
import * as React from 'react'

import TimetableContentItem from 'components/molecules/TimetableContentItem'
import { differenceInMilliseconds } from 'date-fns'
import { PresentationNode } from 'lib/apollo_graphql/queries/getPresentations'
import { observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import { TimetableContents } from './StyledComponents'

type PropsType = {
  timetableData: PresentationNode[];
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
          {timetableData && timetableData.map((talk, index) => {
            const { owner, place, name, difficulty, id, startedAt, finishedAt } = talk
            const speakerName = owner && owner.profile && owner.profile.name
            const roomNo = place && place.name
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
                difficultyKo={difficulty && difficulty.name || ''}
                difficultyEn={difficulty && difficulty.nameEn || ''}
                isFirstItem={index === 0}
                isLastItem={isLastItem}
                isSameGroup={isSameGroup}
              />
            )
          })}
        </TimetableContents>
      </>
    )
  }
}

export default TimeTable
