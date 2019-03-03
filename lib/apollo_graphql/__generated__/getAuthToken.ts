/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: getAuthToken
// ====================================================

export interface getAuthToken_oAuthTokenAuth {
  __typename: "OAuthTokenAuth";
  token: string | null;
}

export interface getAuthToken {
  oAuthTokenAuth: getAuthToken_oAuthTokenAuth | null;
}

export interface getAuthTokenVariables {
  clientId: string;
  code: string;
  oauthType: string;
  redirectUri: string;
}
