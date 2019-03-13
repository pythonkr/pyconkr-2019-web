import { H1 } from "components/atoms/ContentWrappers";
import { IntlText } from "components/atoms/IntlText";
import { NoticeBar } from "components/atoms/NoticeBar";
import PageTemplate from "components/templates/PageTemplate";
import Footer from "components/organisms/Footer";
import Header from "components/organisms/Header";
import { FormWrapper } from "components/atoms/ContentWrappers";
import { RouterProps, withRouter } from "next/router";
import { inject, observer } from "mobx-react";
import React from "react";
import {
  ALERT_BLUE_DARK,
  ALERT_YELLOW,
  ALERT_YELLOW_DARK,
  ALERT_YELLOW_SEMI_DARK
} from "styles/colors";
import { paths } from "routes/paths";
import { StoresType } from "../_app";

@inject("stores")
@withRouter
@observer
class Logout extends React.Component<{
  stores: StoresType;
  router: RouterProps;
}> {
  state = {
    isTermsOfService: false,
    isPrivacyPolicy: false
  };
  componentWillMount() {}

  render() {
    const { stores } = this.props;
    return (
      <PageTemplate
        header={<Header title="파이콘 한국 2019" />}
        footer={<Footer />}
      >
        <H1>
          <IntlText intlKey="homeTitle">약관 동의</IntlText>
        </H1>
        <NoticeBar
          color={ALERT_YELLOW}
          borderColor={ALERT_YELLOW_SEMI_DARK}
          textColor={ALERT_YELLOW_DARK}
          textLinkColor={ALERT_BLUE_DARK}
          text={"파이콘 한국 서비스 약관과 개인 정보 처리 방침을 ~~~~"}
        />
        <FormWrapper>
          <form
            onSubmit={e => {
              e.preventDefault();
              stores.profileStore.updateAgreement(this.state).then(() => {
                alert("asdf");
              });
            }}
          >
            <label>서비스 이용 약관</label>
            <input
              type="checkbox"
              aria-checked={this.state.isTermsOfService}
              checked={this.state.isTermsOfService}
              onChange={() =>
                this.setState({
                  isTermsOfService: !this.state.isTermsOfService
                })
              }
            />
            <label>개인정보 처리 방침 동의</label>
            <input
              type="checkbox"
              aria-checked={this.state.isPrivacyPolicy}
              checked={this.state.isPrivacyPolicy}
              onChange={() =>
                this.setState({ isPrivacyPolicy: !this.state.isPrivacyPolicy })
              }
            />
            <button type="submit">동의합니다!</button>
          </form>
        </FormWrapper>
      </PageTemplate>
    );
  }
}

export default Logout;
