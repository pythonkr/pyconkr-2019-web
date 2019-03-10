import { Button } from 'components/atoms/Button'
import { H1, H2, Paragraph } from 'components/atoms/withIntl'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import NavLink from 'components/atoms/NavLink'
import { differenceInCalendarDays, isFuture, isPast } from 'date-fns'
import { keynoteRecommendation, lightningTalk, sprintProposal, talkProposal, tutorialProposal, volunteer } from 'dates'
import { inject, observer } from 'mobx-react'
import React from 'react'
import intl from 'react-intl-universal'
import { paths } from 'routes/paths'
import { DateDTO } from 'types/common'
import { formatDateInWords } from 'utils/formatDate'
import { StoresType } from '../_app'

export type IndexPagePropsType = {
  stores: StoresType;
}

const contributions = [{
  title: '키노트 발표자 추천',
  intlKey: 'contribute.overview.table.keynote',
  openDate: keynoteRecommendation.open,
  link: paths.contribute.recommendingAKeynoteSpeaker,
}, {
  title: '발표안 제안',
  intlKey: 'contribute.overview.table.talk',
  openDate: talkProposal.open,
  closeDate: talkProposal.close,
  link: paths.contribute.cfpDetailedGuide
}, {
  title: '튜토리얼 제안',
  intlKey: 'contribute.overview.table.tutorial',
  openDate: tutorialProposal.open,
  closeDate: tutorialProposal.close,
  // link: paths.contribute.proposingATutorial
}, {
  title: '스프린트 제안',
  intlKey: 'contribute.overview.table.sprint',
  openDate: sprintProposal.open,
  // link: paths.contribute.proposingASprint
}, {
  title: '자원봉사자 모집',
  intlKey: 'contribute.overview.table.volunteer',
  openDate: volunteer.open,
  closeDate: volunteer.close,
}, {
  title: '라이트닝 토크 신청',
  intlKey: 'contribute.overview.table.lightingtalk',
  openDate: lightningTalk.open,
  dateDescription: {
    default: '컨퍼런스 당일',
    intlKey: 'contribute.overview.table.status.conferenceDays'
  }
}]

const getContributionClass = (openDate?: DateDTO, closeDate?: DateDTO) => {
  if (!openDate || isFuture(openDate)) return ''
  if (closeDate && isPast(closeDate)) return 'disabled'

  return 'active'
}

const getContributionStatus = (openDate?: DateDTO, closeDate?: DateDTO, link?: string) => {
  if (!openDate || !link) return '-'
  if (isFuture(openDate) && link) {
    const diff = differenceInCalendarDays(new Date(), openDate)

    return diff < 7
      ? intl.get('contribute.overview.table.status.openBefore', { diff })
        .defaultMessage(`모집 시작 D${diff}`)
      : intl.get('contribute.overview.table.status.preparing')
        .defaultMessage('준비 중')
  }
  if (closeDate && isPast(closeDate)) {
    return intl.get('contribute.overview.table.status.closed')
      .defaultMessage('마감')
  }

  if (closeDate && differenceInCalendarDays(new Date(), closeDate) < 7) {
    const diff = differenceInCalendarDays(new Date(), closeDate)

    return intl.get('contribute.overview.table.status.closeAfter', { diff })
      .defaultMessage(`마감 D${diff}`)
  }

  return intl.get('contribute.overview.table.status.onProgress')
    .defaultMessage('모집 중')
}

@inject('stores')
@observer
export default class CFPDetailedGuide extends React.Component<{ stores: StoresType }> {
  render() {
    return (
      <PageTemplate
        header={<Header title='공헌 안내 :: 파이콘 한국 2019' />}
        footer={<Footer />}
      >
        <div>
          <NavLink
            to={paths.contribute.overview}
            intlKey='gnb.contribute.overview'
            name='공헌 안내'
          />
            <NavLink
            to={paths.contribute.recommendingAKeynoteSpeaker}
            intlKey='gnb.contribute.recommendKeynoteSpeaker'
            name='키노트 연사 추천'
          />
          <NavLink
            to={paths.contribute.cfpDetailedGuide}
            intlKey='gnb.contribute.cfpDetailedGuide'
            name='발표안 작성 가이드'
          />
        </div>
        {/* <NavLink
          to={paths.contribute.proposingATalk}
          intlKey='gnb.contribute.proposingATalk'
          name='발표안 제안하기'
        /> */}
        <H1 intlKey='contribute.overview.title'>
          파이콘 한국에 공헌하는 다양한 방법
        </H1>
        <Paragraph intlKey='contribute.overview.intro'>
          파이콘 한국에는 발표, 튜토리얼 튜터 및 멘토, 스프린트 진행, 자원 봉사 등 다양한 형태로 공헌할 수 있습니다.
          각 항목은 아래와 같은 일정으로 모집합니다.
          </Paragraph>
        <table>
          <tbody className='has-bg'>
            {contributions.map(({ title, intlKey, openDate, closeDate, link, dateDescription }) =>
              <tr
                key={title}
                className={getContributionClass(openDate, closeDate)}
              >
                <td className='bold'>
                  { intl.get(intlKey).defaultMessage(title) }</td>
                <td>
                  {
                    dateDescription ? intl.get(dateDescription.intlKey).defaultMessage(dateDescription.default)
                    : `${formatDateInWords(openDate)} -
                      ${(closeDate && formatDateInWords(closeDate)) ||
                      intl.get('contribute.overview.table.status.untilSelected')
                        .defaultMessage('마감 시까지')}`
                  }
                </td>
                <td>
                  {getContributionStatus(openDate, closeDate, link)}
                </td>
                <td className='center-align'>
                  {link
                    ? <Button
                      size='small'
                      height={27}
                      intlKey='contribute.overview.table.moreDetail'
                      to={link}
                      disabled={getContributionClass(openDate, closeDate) === 'disabled'}
                      primary={getContributionClass(openDate, closeDate) === 'active' ? true : false}
                    >자세히 보기</Button>
                    : '-'
                  }
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <section>
          <H2 intlKey='common.contact'>문의</H2>
          <Paragraph intlKey='asdfasdfasdf'>program@pycon.kr</Paragraph>
        </section>
      </PageTemplate>
    )
  }
}
