import { ContentTableWrapper, Td, Tr, Table, TBody, isHeader, H1, H2, Ul, Li, Paragraph, Section } from 'components/atoms/ContentWrappers'
import styled from '@emotion/styled'
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

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

const BabycareTableRow = (props) => <>
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
export class Babycare extends React.Component<PropsType> {
  async componentDidMount() {
  }
  render() {
    const { stores, t } = this.props
    const title = t('help:babycare.title')
    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title })} intlKey='' />}
        footer={<Footer />}
      >
        <H1>
          { title }
        </H1>
        <Section>
          <Paragraph>
            { t('help:babycare.desc1') }
          </Paragraph>
          <Table>
            <colgroup>
              <col width='20%'/>
              <col width='80%'/>
            </colgroup>
            <TBody>
              <BabycareTableRow header={ t('help:babycare.table-1-header') }>
                { t('help:babycare.table-1-content') }
              </BabycareTableRow>
              <BabycareTableRow header={ t('help:babycare.table-2-header') }>
                { t('help:babycare.table-2-content') }
              </BabycareTableRow>
              <BabycareTableRow header={ t('help:babycare.table-3-header') }>
                { t('help:babycare.table-3-content') }
              </BabycareTableRow>
              <BabycareTableRow header={ t('help:babycare.table-4-header') }>
                { t('help:babycare.table-4-content') }
              </BabycareTableRow>
              <BabycareTableRow header={ t('help:babycare.table-5-header') }>
                { t('help:babycare.table-5-content') }
              </BabycareTableRow>
              <BabycareTableRow header={ t('help:babycare.table-6-header') }>
                { t('help:babycare.table-6-content') }
              </BabycareTableRow>
              <BabycareTableRow header={ t('help:babycare.table-7-header') }>
                { t('help:babycare.table-7-content') }
              </BabycareTableRow>
              <BabycareTableRow header={ t('help:babycare.table-8-header') }>
                { t('help:babycare.table-8-content') }
              </BabycareTableRow>
              <BabycareTableRow header={ t('help:babycare.table-9-header') }>
                { `${t('help:babycare.table-9-content-1')}\n${t('help:babycare.table-9-content-2')}` }
              </BabycareTableRow>
              <BabycareTableRow header={ t('help:babycare.table-10-header') }>
                { t('help:babycare.table-10-content') }
              </BabycareTableRow>
            </TBody>
          </Table>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['help'])(Babycare)
