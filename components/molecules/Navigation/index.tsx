import intl from 'react-intl-universal';
import styled from '@emotion/styled'
import NavLink from 'components/atoms/NavLink'
import React from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { navigationPadding } from 'styles/layout';
import NavMenuSubLink from 'components/atoms/NavMenuSubLink';
import { paths } from 'routes/paths';
import { StoresType } from 'pages/_app';

const NavWrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 0 ${navigationPadding};
    box-sizing: border-box;
    width: 100%;
    background-color: #088487;
    color: white;
`
const NavItem = styled.li`
    display: inline-block;
    margin: 0 10px;
    position: relative;
`
const NavMenuSubLinkList = styled.ul`
    position: absolute;
    top: 60px;
    left: 0;
    display: flex;
    flex-direction: column;
    color: black;
    visibility: hidden;
    width: 100px;
    ${NavItem}:hover & {
        visibility: visible;
    }
`

@inject('stores')
@observer
export default class Navigation extends React.Component<{stores: StoresType}> {
    render () {
        const { stores } = this.props
        const { profile } = toJS(stores.profileStore)
        return (
        <NavWrapper>
            <ul>
                <NavItem>
                    <span>파이콘 로고</span>
                </NavItem>
            </ul>
            <ul>
                <NavItem>
                    <NavLink
                        to='/'
                        intlKey='gnb.home'
                        name='홈'
                    />
                </NavItem>
                <NavItem>
                    <NavLink
                        to={paths.help.faq}
                        intlKey='gnb.help.root'
                        name='지원 및 안내'
                    />
                    <NavMenuSubLinkList>
                        <NavMenuSubLink
                            to={paths.help.faq}
                            intlKey='gnb.help.faq'
                            name='자주 묻는 질문'
                        />
                        <NavMenuSubLink
                            to={paths.help.notice}
                            intlKey='gnb.help.notice'
                            name='알림'
                        />
                        <NavMenuSubLink
                            to={paths.help.venue}
                            intlKey='gnb.help.venue'
                            name='장소'
                        />
                    </NavMenuSubLinkList>
                </NavItem>
                <NavItem>
                    <NavLink
                        to={paths.contribute.overview}
                        intlKey='gnb.contribute.root'
                        name='공헌하기'
                    />
                    <NavMenuSubLinkList>
                        <NavMenuSubLink
                            to={paths.contribute.overview}
                            intlKey='gnb.contribute.overview'
                            name='공헌 안내'
                        />
                         <NavMenuSubLink
                            to={paths.contribute.cfpDetailedGuide}
                            intlKey='gnb.contribute.cfpDetailedGuide'
                            name='발표안 작성 가이드'
                        />
                         <NavMenuSubLink
                            to={paths.contribute.proposingATalk}
                            intlKey='gnb.contribute.proposingATalk'
                            name='발표안 제안하기'
                        />
                    </NavMenuSubLinkList>
                </NavItem>
                <NavItem>
                    <NavLink
                        to={paths.sponsor.prospectus}
                        intlKey='gnb.sponsor.root'
                        name='후원'
                    />
                    <NavMenuSubLinkList>
                        <NavMenuSubLink
                            to={paths.sponsor.prospectus}
                            intlKey='gnb.sponsor.prospectus'
                            name='후원사 안내'
                        />
                         <NavMenuSubLink
                            to={paths.sponsor.applicationForm}
                            intlKey='gnb.sponsor.applicationForm'
                            name='후원사 신청'
                        />
                    </NavMenuSubLinkList>
                </NavItem>
                <NavItem>
                    {
                        (!profile || Object.keys(profile).length == 0) ?
                            <NavLink
                                to='/account/login'
                                intlKey='gnb.login'
                                name='로그인'
                            />
                        :
                            <>
                            <NavLink
                                to='/account/login'
                                intlKey='gnb.info'
                                name='내정보'
                            />
                            <NavMenuSubLinkList>
                                <NavMenuSubLink
                                    // to={paths.sponsor.prospectus}
                                    intlKey='gnb.info.history'
                                    name='제안 및 신청 내역'
                                />
                                <NavMenuSubLink
                                    // to={paths.sponsor.applicationForm}
                                    intlKey='gnb.info.profile'
                                    name='프로필'
                                />
                                <button onClick={() => { stores.profileStore.logout() }}>
                                    { intl.get('gnb.logout').defaultMessage('로그아웃') }
                                </button>
                            </NavMenuSubLinkList>
                            </>
                    }
                </NavItem>
            </ul>
        </NavWrapper>
        )
    }
}

