import NavLink from "components/atoms/NavLink";
import styled from "@emotion/styled";
import { contentWidth } from "styles/layout";

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: ${contentWidth};
`;

const NavItem = styled.li`
  display: inline-block;
  padding: 10px;
`;

const Navigation = () => (
  <NavWrapper>
    <ul>
      <NavItem>
        <NavLink to="/sponsor" name="후원" />
      </NavItem>
      <NavItem>
        <NavLink to="/contribute" name="공헌" />
      </NavItem>
    </ul>
    <ul>
      <NavItem>
        <NavLink
          to="https://github.com/login/oauth/authorize?client_id=e9bef37a5fda0f10f327&scope=user:email"
          name="로그인"
        />
      </NavItem>
      <NavItem>
        <button onClick={() => {}}>English</button>
      </NavItem>
    </ul>
  </NavWrapper>
);

export default Navigation;
