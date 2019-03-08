import { Button } from 'components/atoms/Button'
import { ContentButtonWrapper, ContentTableWrapper } from 'components/atoms/ContentWrapper'
import { H1 } from 'components/atoms/H1'
import { H2 } from 'components/atoms/H2'
import { Paragraph } from 'components/atoms/Paragraph'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { keynoteRecommendation } from 'dates'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { paths } from 'routes/paths'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
import { StatusBar } from '../../components/atoms/StatusBar'
import { StoresType } from '../_app'

export type IndexPagePropsType = {
  stores: StoresType;
}

const schedule = [{
  title: '키노트 연사 추천 오픈',
  date: keynoteRecommendation.open
}, {
  title: '키노트 연사 추천 마감',
  description: '마감 시까지'
}]

@inject('stores')
@observer
export default class CFPDetailedGuide extends React.Component<{ stores: StoresType }> {
  render() {
    return (
      <PageTemplate
        header={<Header title='키노트 연사 추천하기 :: 파이콘 한국 2019' />}
        footer={<Footer />}
      >
        <H1 intlKey='contribute.overview.title'>
          키노트 연사 추천하기
        </H1>
        <StatusBar
          title='키노트 연사 추천'
          actionText='추천'
          link={paths.contribute.recommendingAKeynoteSpeaker}
          openDate={keynoteRecommendation.open}
        />
        <Paragraph>
          파이써니스타들의 북극성이 되어주실 파이콘 한국 2019 키노트 연사를 찾고 있습니다.
        </Paragraph>
        <Paragraph>
          생활/일/취미 등에 파이썬을 적극적으로 활용하시는 분, 주변 사람들에게 파이썬을 열심히 전파하시는 분 등 파이썬을 적극적으로 사용하는 분이 있다면 주저 말고 추천해주시기 바랍니다.
        </Paragraph>
        <ContentButtonWrapper>
          <Button
            size='big'
            intlKey='dsfd'
            to='https://goo.gl/forms/APta2y38kzBbT5DJ2'
            outlink
          >추천 양식 열기</Button>
        </ContentButtonWrapper>
        <section>
          <H2 intlKey='aaa'>일정</H2>
          <ContentTableWrapper>
            <table style={{ width: '518px' }}>
              <tbody>
                {schedule.map(({ title, date, description }) =>
                  <tr key={title}>
                    <td className='bold'>{title}</td>
                    <td>
                      {description || formatDateInWordsWithWeekdayAndTime(date!)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </ContentTableWrapper>
        </section>
        <section>
          <H2 intlKey='bbb'>문의</H2>
          <Paragraph>program@pycon.kr</Paragraph>
        </section>
        <section></section>
      </PageTemplate>
    )
  }
}
