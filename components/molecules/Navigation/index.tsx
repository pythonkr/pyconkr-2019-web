import styled from '@emotion/styled'
import NavLink from 'components/atoms/NavLink'
import NavMenuSubLink from 'components/atoms/NavMenuSubLink'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import intl from 'react-intl-universal'
import { paths } from 'routes/paths'
import { navigationPadding } from 'styles/layout'

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 ${navigationPadding};
  background-color: #263056;
  color: white;
  box-sizing: border-box;
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
  top: 60px;
  left: 0;
  width: 180px;
  font-size: 14px;
  background: #FFF;
  color: black;
  ${NavItem}:hover & {
      visibility: visible;
  }
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
                    <button onClick={() => { stores.authStore.logout() }}>
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
          </NavItem>
        </ul>
      </NavWrapper>
    )
  }
}

export default Navigation
