/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCategories
// ====================================================

export interface getCategories_categories {
  __typename: "CategoryNode";
  name: string;
  nameKo: string | null;
  nameEn: string | null;
  slug: string;
}

export interface getCategories {
  categories: (getCategories_categories | null)[] | null;
}
