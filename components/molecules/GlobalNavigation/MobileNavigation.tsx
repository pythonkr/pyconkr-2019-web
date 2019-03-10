import styled from '@emotion/styled'
import { SNSLink } from 'components/atoms/SNSLink'
import { PyConKRLogo } from 'components/atoms/SVG'
import React from 'react'
import { CORAL, CORAL_LIGHT } from 'styles/colors'

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background-color: white;
  box-sizing: border-box;
  border-bottom: solid 2px ${CORAL_LIGHT};
  z-index: 100;

//
div#navHambuger {
  // display: none;
  display: block;
  position: fixed;
  top: 10px;
  right: 10px;
  z-index:10;
  width: 38px;
  height: 38px;
  border: 1px solid #000;
  background: ${CORAL};
}

//
div#navMenuList {
  display: none;
  position: fixed;
  overflow-y: scroll;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 62px 0 62px 10%;
  background-color: rgba(000, 000, 000, 0.8);
}

div#navMenuList.active {
  display: block;
}

div#navMenuList ul {
  height: auto;
  margin: 0px auto;
}

div#navMenuList li.navMenuLi {
  // height: 55px;
  font-size: 25px;
  line-height: 55px;
  color: rgba(255, 255, 255, 0.75);
}

div#navMenuList li.navMenuLi span.caret {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin: 0 0 3px 5px;
  border-style: solid;
  border-width: 6px 6px 0 6px;
  border-color: rgba(255, 255, 255, 0.75) transparent transparent transparent;
}

div#navMenuList li span.caret.active {
  margin: 0 0 5px 5px;
  border-width: 0 6px 6px 6px;
  border-color: transparent transparent rgba(255, 255, 255, 0.75) transparent;
}

div#navMenuList ul.navMiniMenu {
  display: none;
}

div#navMenuList ul.navMiniMenu.active {
  display: block;
}

div#navMenuList ul.navMiniMenu li {
  padding-left: 20px;
}

div#navMenuList ul.navMenuSNS {
  margin: 10px 0 0 -10px;

  &:first-of-typed {
    margin-top: 25px;
  }
}

div#navMenuList ul.navMenuSNS li {
  display: inline-block;
  list-style: none;
  padding: 10px;
}
`
const NavItem = styled.li`
`

export const MobileNavigation = ({}) => {
  return <NavWrapper id='mobile'>
    <ul>
      <NavItem>
        <PyConKRLogo
          width={139}
          height={37}
          color={CORAL}
        />
      </NavItem>
    </ul>
    <ul>
      <NavItem>
        <div id='navHambuger'>
          X
        </div>
        <div id='navMenuList'>
          <ul>
            <li className='navMenuLi'>
              <span>파이콘 한국</span>
            </li>
            <li className='navMenuLi'>
              <span>지원 및 안내</span>
              <span className='caret'></span>
              <ul className='navMiniMenu'>
                <li>자주 묻는 질문</li>
                <li>알림</li>
                <li>장소</li>
              </ul>
            </li>
            <li className='navMenuLi'>
              <span>공헌하기</span>
              <span className='caret'></span>
              <ul className='navMiniMenu'>
                <li>공헌 안내</li>
                <li>발표안 작성 가이드</li>
                <li>발표안 제안하기</li>
              </ul>
            </li>
            <li className='navMenuLi'>
              <span>후원</span>
              <span className='caret'></span>
              <ul className='navMiniMenu'>
                <li>후원사 안내</li>
                <li>후원사 신청</li>
              </ul>
            </li>
            <li className='navMenuLi'>
              <span>로그인</span>
              <span className='caret'></span>
            </li>
            <li>
              <ul className='navMenuSNS'>
                <li>
                  <SNSLink
                    to='https://blog.pycon.kr/'
                    intlKey='fixedFooter.blogLink'
                    name='블로그'
                    fill='white'
                    src='M 12.125 15 C 8.231006 15 5 18.231006 5 22.125 L 5 77.875 C 5 81.768994 8.231006 85 12.125 85 L 67.875 85 C 71.768994 85 75 81.768994 75 77.875 L 75 60.28125 L 94.125 41.1875 A 3.0003 3.0003 0 0 0 94.125 36.9375 L 85.0625 27.875 A 3.0003 3.0003 0 0 0 82.90625 27 A 3.0003 3.0003 0 0 0 80.8125 27.875 L 75 33.6875 L 75 22.125 C 75 18.231006 71.768994 15 67.875 15 L 12.125 15 z M 12.125 21 L 67.875 21 C 68.556226 21 69 21.443774 69 22.125 L 69 39.71875 L 51.875 56.875 A 3.0003 3.0003 0 0 0 51 59 L 51 68 A 3.0003 3.0003 0 0 0 54 71 L 63 71 A 3.0003 3.0003 0 0 0 65.125 70.125 L 69 66.25 L 69 77.875 C 69 78.556226 68.556226 79 67.875 79 L 12.125 79 C 11.443774 79 11 78.556226 11 77.875 L 11 22.125 C 11 21.443774 11.443774 21 12.125 21 z M 19.6875 29 A 3.0040663 3.0040663 0 1 0 20 35 L 60 35 A 3.0003 3.0003 0 1 0 60 29 L 20 29 A 3.0003 3.0003 0 0 0 19.6875 29 z M 82.9375 34.25 L 87.75 39.0625 L 84.53125 42.28125 L 79.71875 37.46875 L 82.9375 34.25 z M 19.6875 41 A 3.0040663 3.0040663 0 1 0 20 47 L 55 47 A 3.0003 3.0003 0 1 0 55 41 L 20 41 A 3.0003 3.0003 0 0 0 19.6875 41 z M 75.46875 41.71875 L 80.28125 46.53125 L 61.75 65 L 57 65 L 57 60.25 L 75.46875 41.71875 z M 19.6875 53 A 3.0040663 3.0040663 0 1 0 20 59 L 44 59 A 3.0003 3.0003 0 1 0 44 53 L 20 53 A 3.0003 3.0003 0 0 0 19.6875 53 z M 19.6875 65 A 3.0040663 3.0040663 0 1 0 20 71 L 44 71 A 3.0003 3.0003 0 1 0 44 65 L 20 65 A 3.0003 3.0003 0 0 0 19.6875 65 z '
                    viewBox='0 0 100 100'
                  />
                </li>
                <li>
                  <SNSLink
                    to='https://twitter.com/pyconkr'
                    intlKey='fixedFooter.twitterLink'
                    name='트위터'
                    fill='white'
                    src='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'
                    viewBox='0 0 24 24'
                  />
                </li>
                <li>
                  <SNSLink
                    to='https://ko-kr.facebook.com/pyconkorea/'
                    intlKey='fixedFooter.facebookLink'
                    name='페이스북'
                    fill='white'
                    src='M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z'
                    viewBox='0 0 24 24'
                  />
                </li>
                <li>
                  <SNSLink
                    to='https://github.com/pythonkr'
                    intlKey='fixedFooter.githubLink'
                    name='깃헙'
                    fill='white'
                    src='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
                    viewBox='0 0 24 24'
                  />
                </li>
              </ul>
              <ul className='navMenuSNS'>
                <li>
                  <SNSLink
                    to='https://www.flickr.com/photos/126829363@N08/sets/'
                    intlKey='fixedFooter.flickerLink'
                    name='플리커'
                    fill='white'
                    src='M17 5c-1.961 0-3.731.809-5.002 2.108-1.27-1.299-3.038-2.108-4.998-2.108-3.866 0-7 3.134-7 7s3.134 7 7 7c1.96 0 3.728-.809 4.998-2.108 1.271 1.299 3.041 2.108 5.002 2.108 3.866 0 7-3.134 7-7s-3.134-7-7-7zm0 12c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z'
                    viewBox='0 0 24 24'
                  />
                </li>
                <li>
                  <SNSLink
                    to='https://www.youtube.com/channel/UC26x6D5xpKx6io4ShfXa_Ow'
                    intlKey='fixedFooter.youtubeLink'
                    name='유투브'
                    fill='white'
                    src='M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z'
                    viewBox='0 0 24 24'
                  />
                </li>
                <li>
                  <SNSLink
                    to='https://www.youtube.com/channel/UC26x6D5xpKx6io4ShfXa_Ow'
                    intlKey='fixedFooter.youtubeLink'
                    name='Global'
                    fill='white'
                    src='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10 12c0 .685-.07 1.354-.202 2h-3.853c.121-1.283.129-2.621 0-4h3.853c.132.646.202 1.315.202 2zm-.841-4h-3.5c-.383-1.96-1.052-3.751-1.948-5.278 2.435.977 4.397 2.882 5.448 5.278zm-5.554 0h-2.605v-5.658c1.215 1.46 2.117 3.41 2.605 5.658zm-4.605-5.658v5.658h-2.605c.488-2.248 1.39-4.198 2.605-5.658zm0 7.658v4h-2.93c-.146-1.421-.146-2.577 0-4h2.93zm0 6v5.658c-1.215-1.46-2.117-3.41-2.605-5.658h2.605zm2 5.658v-5.658h2.605c-.488 2.248-1.39 4.198-2.605 5.658zm0-7.658v-4h2.93c.146 1.421.146 2.577 0 4h-2.93zm-4.711-11.278c-.896 1.527-1.565 3.318-1.948 5.278h-3.5c1.051-2.396 3.013-4.301 5.448-5.278zm-6.087 7.278h3.853c-.121 1.283-.129 2.621 0 4h-3.853c-.132-.646-.202-1.315-.202-2s.07-1.354.202-2zm.639 6h3.5c.383 1.96 1.052 3.751 1.948 5.278-2.435-.977-4.397-2.882-5.448-5.278zm12.87 5.278c.896-1.527 1.565-3.318 1.948-5.278h3.5c-1.051 2.396-3.013 4.301-5.448 5.278z'
                    viewBox='0 0 24 24'
                  />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </NavItem>
    </ul>
  </NavWrapper>
}
