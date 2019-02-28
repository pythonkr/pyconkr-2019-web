import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { StoresType } from '../_app';
import { H1 } from 'components/atoms/H1';
import { Paragraph } from 'components/atoms/Paragraph';
import { H2 } from 'components/atoms/H2';

@inject('stores')
@observer
export default class Prospectus extends React.Component<{stores: StoresType}> {
    render () {
      return (
        <PageTemplate
          header={<Header title='후원사 안내 :: 파이콘 한국 2019' />}
          footer={<Footer />}
        >
          <H1 intlKey='contribute.overview.title'>
            후원사 안내
          </H1>
          {/* Status Bar */}
          <Paragraph>
            파이콘은 커뮤니티 주관으로 이뤄지는 비영리 개발자 대상 행사로, 여타 기업 및 기관에서 개최하는 개발자 행사와는 성격이 다릅니다. 발표자와 튜토리얼 진행자를 포함하여, 자원봉사자와 준비위원회 담당자 등 모든 인원이 금전적 이득 없이 순수히 오픈소스 프로그래밍 언어인 파이썬의 저변 확대와 커뮤니티 활성화를 위해 진행하는 행사입니다.
          </Paragraph>
          <Paragraph>
            따라서, 본 행사에 후원하심은 후원사 또는 개인의 오픈소스 커뮤니티 및 파이썬 사용자에 대한 방향과 태도를 가장 솔직하게 보여주시는 것이라 할 수 있겠습니다. 또한, 다양한 매체로의 홍보, 후원사 튜토리얼, 후원사 세션과 부스 구성 등을 지원해드리며, 이를 우수한 개발자 모집의 장으로 활용하실 수 있습니다.
          </Paragraph>
          <section>
            <H2 intlKey='a'>문의</H2>
            <Paragraph>
              sponsor@pycon.kr
              이메일 주시면 상세한 스폰서 안내문서를 보내드립니다.
            </Paragraph>
          </section>
          <section>
            <H2 intlKey='a'>후원사 등급</H2>
            <Paragraph>
              개최지와 여건에 따라 등급별 지원 내용은 다소 달라질 수 있습니다. 또한, 후원사에 의해 제공되는 튜토리얼이나 세션, 증정품은 준비위원회와 사전 협의가 필요합니다. 자세한 문의는 sponsor@pycon.kr 로 주시기 바랍니다.
            </Paragraph>
            {/* 유의사항  */}
            {/* Table */}
            <ul>
              <li>후원금은 VAT 별도 금액입니다.</li>
              <li>커뮤니티 스폰서십은 비영리 단체에 한합니다.</li>
              <li>후원사 부스 1 칸의 크기는 3m x 2m x 2.5m 기준입니다.</li>
              <li>세부 사항은 행사 전까지 다소 변경될 수 있습니다.</li>
              <li>출판사 후원의 경우, 파이썬 관련 도서 출판 기록이 필요합니다.</li>
              <li>미디어 후원의 경우, 언론 보도 및 홍보 이력이 필요합니다.</li>
              <li>자세한 문의는 sponsor@pycon.kr 로 주시기 바랍니다.</li>
            </ul>
          </section>
        </PageTemplate>
      )
    }
}
