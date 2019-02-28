/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: oAuthTokenAuth
// ====================================================

export interface oAuthTokenAuth_oAuthTokenAuth {
  __typename: "OAuthTokenAuth";
  token: string | null;
}

export interface oAuthTokenAuth {
  oAuthTokenAuth: oAuthTokenAuth_oAuthTokenAuth | null;
}

export interface oAuthTokenAuthVariables {
  clientId: string;
  code: string;
  oauthType: string;
  redirectUri: string;
}
