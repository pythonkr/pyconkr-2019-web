/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubmitSponsor
// ====================================================

export interface SubmitSponsor_submitSponsor {
  __typename: "SubmitSponsor";
  success: boolean | null;
  submitted: boolean | null;
}

export interface SubmitSponsor {
  submitSponsor: SubmitSponsor_submitSponsor | null;
}

export interface SubmitSponsorVariables {
  submitted: boolean;
}
