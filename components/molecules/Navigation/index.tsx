import styled from '@emotion/styled'
import NavLink from 'components/atoms/NavLink'
import React from 'react'
import { contentWidth } from 'styles/layout'

const NavWrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: ${contentWidth};
`

const NavItem = styled.li`
    display: inline-block;
    padding: 10px;
`

class Navigation extends React.Component {
    render () {
        return (
            <NavWrapper>
                <ul>
                    <NavItem>
                        <NavLink to='/sponsor' name='후원' />
                    </NavItem>
                    <NavItem>
                        <NavLink to='/contribute' name='공헌' />
                    </NavItem>
                </ul>
                <ul>
                    <NavItem>
                        <NavLink
                            to="https://github.com/login/oauth/authorize?state=github&client_id=bc6a4bddabaa55004090&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&scope=user:email"
                            name="GitHub 로그인"
                            />
                        </NavItem>
                    <NavItem>
                        <NavLink
                        to="https://accounts.google.com/o/oauth2/v2/auth?state=google&scope=profile%20email&include_granted_scopes=true&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&client_id=434664051101-ms06l6uja93lrjs3errmb73alb6dek1f.apps.googleusercontent.com"
                        name="Google 로그인"
                        />
                    </NavItem>
                    <NavItem>
                        <NavLink
                        to="https://www.facebook.com/v3.2/dialog/oauth?scope=email&client_id=373255026827477&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&state=facebook&response_type=code"
                        name="Facebook 로그인"
                        />
                    </NavItem>

                    <NavItem>
                        <NavLink
                        to="https://nid.naver.com/oauth2.0/authorize?client_id=K1dzcT_4mOnrA7KTFVFq&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&state=naver"
                        name="Naver 로그인"
                        />
                    </NavItem>
                    <NavItem>
                        <button onClick={() => {}}>English</button>
                    </NavItem>
                </ul>
            </NavWrapper>
        )
    }
}

export default Navigation
