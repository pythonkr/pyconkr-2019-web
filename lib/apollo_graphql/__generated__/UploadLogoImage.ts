/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadLogoImage
// ====================================================

export interface UploadLogoImage_uploadLogoImage {
  __typename: "UploadLogoImage";
  success: boolean | null;
  image: any | null;
}

export interface UploadLogoImage {
  uploadLogoImage: UploadLogoImage_uploadLogoImage | null;
}

export interface UploadLogoImageVariables {
  file: any;
}
