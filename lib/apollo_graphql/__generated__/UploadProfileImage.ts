/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadProfileImage
// ====================================================

export interface UploadProfileImage_uploadProfileImage {
  __typename: "UploadProfileImage";
  success: boolean | null;
  image: any | null;
}

export interface UploadProfileImage {
  uploadProfileImage: UploadProfileImage_uploadProfileImage | null;
}

export interface UploadProfileImageVariables {
  file: any;
}
