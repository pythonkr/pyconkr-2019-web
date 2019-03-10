import styled from '@emotion/styled'
import Link from 'next/link'
import NavLink from 'components/atoms/NavLink'
import NavMenuSubLink from 'components/atoms/NavMenuSubLink'
import { PyConKRLogo } from 'components/atoms/SVG'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'
import { StoresType } from 'pages/_app'
import React from 'react'
import intl from 'react-intl-universal'
import { paths } from 'routes/paths'
import { CORAL, CORAL_LIGHT } from 'styles/colors'
import { navigationPadding } from 'styles/layout'

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 ${navigationPadding};
  background-color: white;
  box-sizing: border-box;
  border-bottom: solid 2px ${CORAL_LIGHT};
  z-index: 100;
`
const NavItem = styled.li`
  display: inline-block;
  position: relative;
  margin: 0 10px;
  font-size: 14px;
`
const NavMenuSubLinkList = styled.ul`
  visibility: hidden;
  display: flex;
  position: absolute;
  flex-direction: column;
  top: 80px;
  left: -30px;
  width: 180px;
  font-size: 14px;
  background: #FFF;
  color: black;
  ${NavItem}:hover & {
    visibility: visible;
  }
`
const HeaderLogo = styled.p`
  margin: 23px 0 20px;
  line-height: 0;
`

@inject('stores')
@observer
class Navigation extends React.Component<{ stores: StoresType }> {
  render() {
    const { stores } = this.props

    return (
      <NavWrapper>
        <ul>
          <NavItem>
            <Link href='/'>
              <HeaderLogo>
                <PyConKRLogo
                  width={139}
                  height={37}
                  color={CORAL}
                />
              </HeaderLogo>
            </Link>
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
          {/* <NavItem>
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
          </NavItem> */}
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
              {/* <NavMenuSubLink
                to={paths.contribute.proposingATalk}
                intlKey='gnb.contribute.proposingATalk'
                name='발표안 제안하기'
              /> */}
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
              {/* <NavMenuSubLink
                to={paths.sponsor.applicationForm}
                intlKey='gnb.sponsor.applicationForm'
                name='후원사 신청'
              /> */}
            </NavMenuSubLinkList>
          </NavItem>
          {/* <NavItem>
            {
              stores.authStore.logined ?
                <>
                  <NavLink
                    to={paths.account.profile}
                    intlKey='gnb.info.root'
                    name='내 정보'
                  />
                  <NavMenuSubLinkList>
                    <NavMenuSubLink
                      to={paths.account.contribution}
                      intlKey='gnb.info.history'
                      name='제안 및 신청 내역'
                    />
                    <NavMenuSubLink
                      to={paths.account.profile}
                      intlKey='gnb.info.profile'
                      name='프로필'
                    />
                    <button onClick={() => {
                      stores.authStore.logout()
                      Router.replace(paths.home)
                    }}>
                      {intl.get('gnb.info.logout')
                        .defaultMessage('로그아웃')}
                    </button>
                  </NavMenuSubLinkList>
                </>
                :
                <NavLink
                  to={paths.account.login}
                  intlKey='gnb.info.login'
                  name='로그인'
                />
            }
          </NavItem> */}
        </ul>
      </NavWrapper>
    )
  }
}

export default Navigation
