import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { StoresType } from '../_app';
import { H1 } from 'components/atoms/H1';
import { Paragraph } from 'components/atoms/Paragraph';
import { H2 } from 'components/atoms/H2';
import { paths } from 'routes/paths';
import Link from 'next/link';

export type IndexPagePropsType = {
  stores: StoresType;
}

const contributions = [{
  title: '발표안 제안',
  intlKey: 'contribute.overview.table.talk',
  openDate: '2019-03-13',
  closeDate: '2019-05-31',
  link: paths.contribute.proposingATalk
}, {
  title: '튜토리얼 제안',
  intlKey: 'contribute.overview.table.tutorial',
  openDate: '2019-03-13',
  closeDate: '2019-05-31',
  link: paths.contribute.proposingATutorial
}, {
  title: '스프린트 제안',
  intlKey: 'contribute.overview.table.sprint',
  openDate: '2019-03-13',
  closeDate: '2019-05-31',
  link: paths.contribute.proposingASprint
}]

@inject('stores')
@observer
export default class CFPDetailedGuide extends React.Component<{stores: StoresType}> {
    render () {
      return (
        <PageTemplate
          header={<Header title='공헌 안내 :: 파이콘 한국 2019' />}
          footer={<Footer />}
        >
          <H1 intlKey='contribute.overview.title'>
            파이콘에 공헌하는 다양한 방법
          </H1>
          <Paragraph intlKey='contribute.overview.intro'>
            파이콘 한국에는 발표, 튜토리얼 진행, 스프린트 진행, 자원 봉사 등 다양한 형태로 공헌할 수 있습니다.
            각 항목은 아래와 같은 일정으로 모집합니다.
          </Paragraph>
          <table>
            <thead></thead>
            {contributions.map(contribution => <tr>
              <td>{contribution.title}</td>
              <td>{contribution.openDate} - {contribution.closeDate}</td>
              <td>준비 중</td>
              <td><Link href={contribution.link}><a>자세히 보기</a></Link></td>
            </tr>)}
          </table>
          <section>
            <H2 intlKey='common.contact'>문의</H2>
            <Paragraph>program@pycon.kr</Paragraph>
          </section>
        </PageTemplate>
      )
    }
}
