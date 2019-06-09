import { Button } from 'components/atoms/Button'
import {
  ContentButtonWrapper, ContentTableWrapper, H1, H2, isBold, Paragraph, ScheduleTable,
  Section, TBody, Td, Tr
} from 'components/atoms/ContentWrappers'
import {
  IntlText
} from 'components/atoms/IntlText'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import React from 'react'
import intl from 'react-intl-universal'
import { contributionMenu, paths } from 'routes/paths'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
import { StatusBar } from '../../components/atoms/StatusBar'
import { StoresType } from '../_app'

export type IndexPagePropsType = {
  stores: StoresType;
}

@inject('stores')
@observer
export default class CFPDetailedGuide extends React.Component<{ stores: StoresType }> {
  render() {
    const { keynoteRecommendationStartAt, keynoteRecommendationFinishAt } = this.props.stores.scheduleStore.schedule
    const schedule = [{
      title: '키노트 연사 추천 오픈',
      intlKey: 'contribute.recommendKeynoteSpeaker.schedule.open',
      date: keynoteRecommendationStartAt
    }, {
      title: '키노트 연사 추천 마감',
      intlKey: 'contribute.recommendKeynoteSpeaker.schedule.deadline',
      date: keynoteRecommendationFinishAt
    }]

    return (
      <PageTemplate
        header={<Header title='키노트 연사 추천하기 :: 파이콘 한국 2019' intlKey='contribute.recommendKeynoteSpeaker.pageTitle' />}
        footer={<Footer />}
      >
        <LocalNavigation list={contributionMenu.submenu} />

        <H1><IntlText intlKey='contribute.recommendKeynoteSpeaker.title'>
          키노트 연사 추천하기
        </IntlText></H1>
        <StatusBar
          titleIntlKey='contribute.recommendKeynoteSpeaker.title'
          actionIntlKey='common.recommend'
          link={paths.contribute.recommendingAKeynoteSpeaker}
          openDate={keynoteRecommendationStartAt}
          closeDate={keynoteRecommendationFinishAt}
        />
        <Paragraph><IntlText intlKey='contribute.recommendKeynoteSpeaker.description1'>
          파이써니스타들의 북극성이 되어주실 파이콘 한국 2019 키노트 연사를 찾고 있습니다.
        </IntlText></Paragraph>
        <Paragraph><IntlText intlKey='contribute.recommendKeynoteSpeaker.description2'>
          생활/일/취미 등에 파이썬을 적극적으로 활용하시는 분,
          주변 사람들에게 파이썬을 열심히 전파하시는 분 등 파이썬을 적극적으로 사용하는 분이 있다면
          주저 말고 추천해주시기 바랍니다.
        </IntlText></Paragraph>
        <ContentButtonWrapper>
          <Button
            intlKey='contribute.recommendKeynoteSpeaker.recommendButton'
            to='https://goo.gl/forms/APta2y38kzBbT5DJ2'
            outlink
          >추천 양식 열기</Button>
        </ContentButtonWrapper>
        <Section>
          <H2><IntlText intlKey='common.schedule'>일정</IntlText></H2>
          <ContentTableWrapper>
            <ScheduleTable>
              <TBody>
                {schedule.map(({ title, date, desc, intlKey }) =>
                  <Tr key={title}>
                    <Td className={isBold}>{intl.get(intlKey).d(title)}</Td>
                    <Td>
                      {
                        desc ?
                        <IntlText intlKey={desc.intlKey}>{desc.defaultText}</IntlText>
                        : formatDateInWordsWithWeekdayAndTime(date!)
                      }
                    </Td>
                  </Tr>
                )}
              </TBody>
            </ScheduleTable>
          </ContentTableWrapper>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}
