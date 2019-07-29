import { ContentTableWrapper, Td, Tr, Table, TBody, isHeader, H1, H2, Ul, Li, Paragraph, Section } from 'components/atoms/ContentWrappers'
import styled from '@emotion/styled'
import { paths } from 'routes/paths'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { StoresType } from '../_app'
import i18next from 'i18next'
import { withNamespaces } from '../../i18n'
import Link from 'next/link'
import { AlertBar } from 'components/atoms/AlertBar'

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

const ChildcareTableRow = (props) => <>
  <Tr>
    <Td className={isHeader}>
      { props.header }
    </Td>
    <Td>
      { props.children }
    </Td>
  </Tr>
</>


@inject('stores')
@observer
export class Childcare extends React.Component<PropsType> {
  async componentDidMount() {
  }
  render() {
    const { stores, t } = this.props
    const title = t('help:childcare.title')
    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title })} intlKey='' />}
        footer={<Footer />}
      >
        <H1>
          { title }
        </H1>
        <Section>
          <AlertBar 
              text={t('program:common.goToBuyTicket')} 
              link={
                {
                  title: t('program:common.goToBuyTicketButton'), 
                  to: paths.ticket.childcare, 
                  outlink:false
                }
              }
            />
          <Paragraph>
            { t('help:childcare.desc1') }
          </Paragraph>
          <Table>
            <colgroup>
              <col width='20%'/>
              <col width='80%'/>
            </colgroup>
            <TBody>
              <ChildcareTableRow header={ t('help:childcare.table-1-header') }>
                { t('help:childcare.table-1-content') }
              </ChildcareTableRow>
              <ChildcareTableRow header={ t('help:childcare.table-2-header') }>
                { t('help:childcare.table-2-content') }
              </ChildcareTableRow>
              <ChildcareTableRow header={ t('help:childcare.table-3-header') }>
                { t('help:childcare.table-3-content') }
              </ChildcareTableRow>
              <ChildcareTableRow header={ t('help:childcare.table-4-header') }>
                { t('help:childcare.table-4-content') }
              </ChildcareTableRow>
              <ChildcareTableRow header={ t('help:childcare.table-5-header') }>
                { t('help:childcare.table-5-content') }
              </ChildcareTableRow>
              <ChildcareTableRow header={ t('help:childcare.table-6-header') }>
                { t('help:childcare.table-6-content') }
              </ChildcareTableRow>
              <ChildcareTableRow header={ t('help:childcare.table-7-header') }>
                { t('help:childcare.table-7-content') }
              </ChildcareTableRow>
              <ChildcareTableRow header={ t('help:childcare.table-8-header') }>
                { t('help:childcare.table-8-content') }
              </ChildcareTableRow>
              <ChildcareTableRow header={ t('help:childcare.table-9-header') }>
                { `${t('help:childcare.table-9-content-1')}\n${t('help:childcare.table-9-content-2')}` }
              </ChildcareTableRow>
              <ChildcareTableRow header={ t('help:childcare.table-10-header') }>
                { t('help:childcare.table-10-content') }
              </ChildcareTableRow>
            </TBody>
          </Table>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['help', 'program'])(Childcare)
