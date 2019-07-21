import * as React from 'react'

import { Tag, TagWrapper } from 'components/molecules/Program/List'
import Link from 'next/link';
import { TimeTableContentItem } from './StyledComponents'
import { paths } from 'routes/paths';

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
    } = this.props
    const detailHref = `${paths.program.talkDetail}?id=${id}`

    return (
      <TimeTableContentItem isBorderTop={isFirstItem} isBorderBottom={isLastItem}>
        <div className='time'>{`${startAt} ~ ${finishAt}`}</div>
        <div className='content'>
          <div className='room'>{roomNo}</div>
          <div className='contentDetailWrapper'>
            <Link href={detailHref}>
              <div className='subject'>
                <div className='title'>{title}</div>
                <div className='speakerName'>{speakerName}</div>
              </div>
            </Link>
            <div className='tagWrapper'>
              <TagWrapper>
                <Tag className={difficultyEn && difficultyEn.toLowerCase()}>{difficultyKo}</Tag>
              </TagWrapper>
            </div>
          </div>
        </div>
      </TimeTableContentItem>
    )
  }
}

export default TimetableContentItem
