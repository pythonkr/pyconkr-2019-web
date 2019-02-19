import React from "react";
import { inject, observer } from "mobx-react";
import { IRootStore } from "stores/RootStore";
import Footer from "components/organisms/Footer";
import Header from "components/organisms/Header";
import PageTemplate from "components/templates/PageTemplate";
import qs from "qs";

import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

export type IndexPagePropsType = {
  stores: IRootStore;
};

@inject("stores")
@observer
class Index extends React.Component<{ stores: IRootStore }> {
  componentDidMount() {
    if (location.search.indexOf("code") == -1) {
      return;
    }
    const { code } = qs.parse(location.search, { ignoreQueryPrefix: true });
    // 서버에 token 요청 하고
    const httpLink = createHttpLink({
      // uri: "http://dev.pycon.kr/api/graphql"
      uri: "http://localhost:8000/api/graphql"
    });

    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem("token");
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `JWT ${token}` : ""
        }
      };
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });
    client
      .mutate({
        variables: { oauthType: "github", code: code },
        mutation: gql`
          mutation OAuthTokenAuth($oauthType: String!, $code: String!) {
            oAuthTokenAuth(oauthType: $oauthType, code: $code) {
              token
            }
          }
        `
      })
      .then(result => {
        if (result.errors) {
          throw new Error(`Authentication is failed: ${result.errors}`);
        }

        const token = result.data.oAuthTokenAuth.token;
        console.log(token);
        localStorage.setItem("token", token);
        return client.query({
          query: gql`
            query {
              profile {
                username
                email
                profile {
                  name
                  avatarUrl
                }
              }
            }
          `
        });
      })
      .then(response => {
        console.log(response);
        alert(JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <PageTemplate header={<Header />} footer={<Footer />}>
        <span>Pycon HomePage</span>
      </PageTemplate>
    );
  }
}

export default Index;
