import * as React from 'react'

import { Tag, TagWrapper } from 'components/molecules/Program/List'
import Link from 'next/link'
import { paths } from 'routes/paths'
import { formatDateOnlyTime } from 'utils/formatDate'
import { TimeTableContentItem } from './StyledComponents'

type PropsType = {
  id: string;
  startAt: string;
  finishAt: string;
  roomNo: string;
  title: string;
  speakerName: string;
  difficultyKo: string;
  difficultyEn: string;
  isFirstItem: boolean;
  isLastItem: boolean;
  isSameGroup: boolean | undefined;
  isBreaktime: boolean;
}

class TimetableContentItem extends React.Component<PropsType> {
  render() {
    const {
      id,
      startAt,
      finishAt,
      roomNo,
      title,
      speakerName,
      difficultyKo,
      difficultyEn,
      isFirstItem,
      isLastItem,
      isSameGroup,
      isBreaktime,
    } = this.props
    const detailHref = `${paths.program.talkDetail}?id=${id}`
    let time = isSameGroup ? '' : `${formatDateOnlyTime(startAt)} ~ ${formatDateOnlyTime(finishAt)}`

    //Show finishedAt if it's breaktime
    if (isBreaktime) {
      time = ` ~ ${formatDateOnlyTime(finishAt)}`
    }

    return (
      <TimeTableContentItem
        isBorderTop={isFirstItem}
        isBorderBottom={isLastItem}
        isBreaktime={isBreaktime}
      >
        <div className='timeWrapper'>
          <div className='time'>{time}</div>
        </div>
        <div className='content'>
          <div className='room'>
            {isBreaktime ? '' : roomNo}
          </div>
          <div className='contentDetailWrapper'>
            {isBreaktime
              ? (
                <div className='subject'>
                  <div className='title'>{title}</div>
                  <div className='speakerName'>
                    {isBreaktime ? '' : speakerName}
                  </div>
                </div>
              )
              : (
                <Link href={detailHref}>
                  <div className='subject'>
                    <div className='title'>{title}</div>
                    <div className='speakerName'>
                      {isBreaktime ? '' : speakerName}
                    </div>
                  </div>
                </Link>
              )
            }
            <div className='tagWrapper'>
              <TagWrapper>
                <Tag className={difficultyEn && difficultyEn.toLowerCase()}>
                  {difficultyKo}
                </Tag>
              </TagWrapper>
            </div>
          </div>
        </div>
      </TimeTableContentItem>
    )
  }
}

export default TimetableContentItem