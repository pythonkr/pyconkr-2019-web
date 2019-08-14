import TimetableContentItem from 'components/molecules/TimetableContentItem'
import { differenceInMilliseconds } from 'date-fns'
import i18next from 'i18next'
import { PresentationNode } from 'lib/apollo_graphql/queries/getPresentations'
import { SprintNode } from 'lib/apollo_graphql/queries/getSprints'
import { TutorialNode } from 'lib/apollo_graphql/queries/getTutorials'
import _ from 'lodash'
import { observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import * as React from 'react'
import { withNamespaces } from '../../../i18n'
import { TimetableContents } from './StyledComponents'

type PropsType = {
  timetableData: any;
  stores: StoresType;
  t: i18next.TFunction;
  baseDetailHref: string;
}

@observer
class TimeTable extends React.Component<PropsType> {
  render() {
    const { timetableData, baseDetailHref, t } = this.props

    if (_.isNil(timetableData)) return null

    return (
      <>
        <TimetableContents>
          {timetableData && timetableData.map((item: PresentationNode | TutorialNode | SprintNode, index: number) => {
            const { owner, place, name, id, startedAt, finishedAt, isBreaktime } = item
            let slideUrl = ''
            if (item.__typename === 'PublicPresentationNode') {
              slideUrl = item.slideUrl
            }

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
              isSameGroup =
                startedAt === previousItem.startedAt &&
                finishedAt === previousItem.finishedAt &&
                timeDiffCurrent === timeDiffPrevious
            }

            if (nextItem) {
              const timeDiffCurrent = differenceInMilliseconds(startedAt, finishedAt)
              const timeDiffNext = differenceInMilliseconds(nextItem.startedAt, nextItem.finishedAt)
              isLastItem =
                (startedAt !== nextItem.startedAt && finishedAt !== nextItem.finishedAt) ||
                timeDiffCurrent !== timeDiffNext
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
                slideUrl={slideUrl}
                slideTitle={t('timetable:slides')}
                isFirstItem={index === 0}
                isLastItem={isLastItem}
                isSameGroup={isSameGroup}
                isBreaktime={isBreaktime}
                detailHref={`${baseDetailHref}?id=${id}`}
              />
            )
          })}
        </TimetableContents>
      </>
    )
  }
}

export default withNamespaces(['timetable'])(TimeTable)
