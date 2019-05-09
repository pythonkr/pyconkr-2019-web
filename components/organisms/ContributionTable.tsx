import { ContentTableWrapper, TableWithBg, TBody } from 'components/atoms/ContentWrappers'
import ContributionTableRow from 'components/molecules/ContributionTableRow'
import _ from 'lodash'
import { toJS } from 'mobx'
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
}

type PropsType = {
    contributions: Contribution[];
    stores: StoresType;
}
export default class ContributionTable extends React.Component<PropsType> {
    getProposalList () {
        const { stores } = this.props
        const proposals = []
        if (stores) {
            const { sponsorStore, cfpStore } = stores
            const { proposal: cfpProposal } = cfpStore && toJS(cfpStore)
            const { proposal: sponsorProposal } = sponsorStore && toJS(sponsorStore)
            proposals.push(cfpProposal, sponsorProposal)
        }

        return proposals
    }

    renderContributionTableRow () {
        const { contributions } = this.props

        return (
            contributions.map((contribution) => {
                return (
                 <ContributionTableRow
                    key={contribution.title}
                    title={contribution.title || ''}
                    intlKey={contribution.intlKey || ''}
                    openDate={contribution.openDate || ''}
                    closeDate={contribution.closeDate || ''}
                    link={contribution.link || ''}
                    editLink={contribution.editLink || ''}
                    dateDescription={contribution.dateDescription}
                 />
                )
            })
        )
    }

    render() {
        return (
            <ContentTableWrapper>
                <TableWithBg>
                    <TBody>
                        {this.renderContributionTableRow()}
                    </TBody>
                </TableWithBg>
            </ContentTableWrapper>
        )
    }
}
