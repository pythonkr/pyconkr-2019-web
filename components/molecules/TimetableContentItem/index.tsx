import _ from 'lodash'
import * as React from 'react'

import Link from 'next/link'
import { formatDateOnlyTime } from 'utils/formatDate'
import { LinkTag, Tag, TagWrapper, TimeTableContentItem } from './StyledComponents'

type PropsType = {
  id: string;
  startAt: string;
  finishAt: string;
  roomNo: string;
  title: string;
  speakerName: string;
  difficultyKo?: string;
  difficultyEn?: string;
  slideUrl?: string;
  slideTitle?: string;
  isFirstItem: boolean;
  isLastItem: boolean;
  isSameGroup: boolean | undefined;
  isBreaktime: boolean;
  detailHref: string;
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
      detailHref,
      slideUrl,
      slideTitle,
    } = this.props
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
            <TagWrapper>
              {difficultyKo && difficultyEn && (
                <Tag className={difficultyEn && difficultyEn.toLowerCase()}>
                  {difficultyKo}
                </Tag>
              )}
              {slideUrl && !_.isEmpty(slideUrl) && (
                <LinkTag href={slideUrl} target='_blank' className='slide'>
                  {slideTitle}
                </LinkTag>
              )}
            </TagWrapper>
          </div>
        </div>
      </TimeTableContentItem>
    )
  }
}

export default TimetableContentItem
