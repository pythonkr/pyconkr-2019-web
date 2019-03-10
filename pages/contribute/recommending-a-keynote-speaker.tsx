import { Button } from 'components/atoms/Button'
import { ContentButtonWrapper, ContentTableWrapper } from 'components/atoms/ContentWrapper'
import NavLink from 'components/atoms/NavLink'
import { H1, H2, Paragraph } from 'components/atoms/withIntl'
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
        <div style={ {textAlign: 'center'} }>
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
          {/* <NavLink
          to={paths.contribute.proposingATalk}
          intlKey='gnb.contribute.proposingATalk'
          name='발표안 제안하기'
          /> */}
        </div>
        
        <H1 intlKey='contribute.overview.title'>
          키노트 연사 추천하기
        </H1>
        <StatusBar
          title='키노트 연사 추천'
          actionText='추천'
          link={paths.contribute.recommendingAKeynoteSpeaker}
          openDate={keynoteRecommendation.open}
        />
        <Paragraph intlKey='asdfasdfasdf'>
          파이써니스타들의 북극성이 되어주실 파이콘 한국 2019 키노트 연사를 찾고 있습니다.
        </Paragraph>
        <Paragraph intlKey='asdfasdfasdf'>
          생활/일/취미 등에 파이썬을 적극적으로 활용하시는 분, 주변 사람들에게 파이썬을 열심히 전파하시는 분 등 파이썬을 적극적으로 사용하는 분이 있다면 주저 말고 추천해주시기 바랍니다.
        </Paragraph>
        <ContentButtonWrapper>
          <Button
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
          <Paragraph intlKey='asdfasdfasdf'>program@pycon.kr</Paragraph>
        </section>
        <section></section>
      </PageTemplate>
    )
  }
}
