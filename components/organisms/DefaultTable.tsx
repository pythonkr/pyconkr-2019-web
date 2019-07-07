import { ContentTableWrapper, TableWithBg, TBody } from 'components/atoms/ContentWrappers'
import _ from 'lodash'
import { StoresType } from 'pages/_app'
import React from 'react'

type DateDescription = {
    // tslint:disable-next-line: no-reserved-keywords
    default: string;
    intlKey: string;
}

export type Contribution = {
    title?: string;
    intlKey?: string;
    openDate?: string;
    closeDate?: string;
    link?: string;
    editLink?: string;
    dateDescription?: DateDescription;
    isMyContribution?: boolean;
    isProposalSubmitted?: boolean;
    isProposalAccepted?: boolean;
}

export type Ticket = {
    title?: string;
    intlKey?: string;
    openDate?: string;
    closeDate?: string;
    link?: string;
    editLink?: string;
    dateDescription?: DateDescription;
}

type PropsType = {
    stores: StoresType;
    renderTableRow?(): any;
}

export default class DefaultTable extends React.Component<PropsType> {
    render() {
        const { renderTableRow } = this.props

        return (
            <ContentTableWrapper>
                <TableWithBg>
                    <TBody>
                        {renderTableRow? renderTableRow() : this.props.children}
                    </TBody>
                </TableWithBg>
            </ContentTableWrapper>
        )
    }
}
