/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getDifficulties
// ====================================================

export interface getDifficulties_difficulties {
  __typename: "DifficultyNode";
  id: string;
  name: string;
  nameKo: string | null;
  nameEn: string | null;
}

export interface getDifficulties {
  difficulties: (getDifficulties_difficulties | null)[] | null;
}
