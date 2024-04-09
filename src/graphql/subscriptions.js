/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDocument = /* GraphQL */ `
  subscription OnCreateDocument(
    $filter: ModelSubscriptionDocumentFilterInput
    $owner: String
  ) {
    onCreateDocument(filter: $filter, owner: $owner) {
      id
      name
      sender
      receiver
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateDocument = /* GraphQL */ `
  subscription OnUpdateDocument(
    $filter: ModelSubscriptionDocumentFilterInput
    $owner: String
  ) {
    onUpdateDocument(filter: $filter, owner: $owner) {
      id
      name
      sender
      receiver
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteDocument = /* GraphQL */ `
  subscription OnDeleteDocument(
    $filter: ModelSubscriptionDocumentFilterInput
    $owner: String
  ) {
    onDeleteDocument(filter: $filter, owner: $owner) {
      id
      name
      sender
      receiver
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
