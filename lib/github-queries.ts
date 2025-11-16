/**
 * GitHub GraphQL Queries for Projects v2
 */

export const PROJECT_V2_QUERY = `
  query GetProjectV2($owner: String!, $number: Int!, $after: String) {
    organization(login: $owner) {
      projectV2(number: $number) {
        id
        title
        shortDescription
        url
        fields(first: 20) {
          nodes {
            ... on ProjectV2Field {
              id
              name
              dataType
            }
            ... on ProjectV2SingleSelectField {
              id
              name
              dataType
              options {
                id
                name
                color
              }
            }
            ... on ProjectV2IterationField {
              id
              name
              dataType
            }
          }
        }
        items(first: 100, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            type
            createdAt
            updatedAt
            fieldValues(first: 20) {
              nodes {
                ... on ProjectV2ItemFieldTextValue {
                  text
                  field {
                    ... on ProjectV2Field {
                      name
                    }
                  }
                }
                ... on ProjectV2ItemFieldNumberValue {
                  number
                  field {
                    ... on ProjectV2Field {
                      name
                    }
                  }
                }
                ... on ProjectV2ItemFieldDateValue {
                  date
                  field {
                    ... on ProjectV2Field {
                      name
                    }
                  }
                }
                ... on ProjectV2ItemFieldSingleSelectValue {
                  name
                  field {
                    ... on ProjectV2SingleSelectField {
                      name
                    }
                  }
                }
                ... on ProjectV2ItemFieldIterationValue {
                  title
                  field {
                    ... on ProjectV2IterationField {
                      name
                    }
                  }
                }
              }
            }
            content {
              ... on Issue {
                number
                title
                url
                state
                repository {
                  name
                  owner {
                    login
                  }
                }
                author {
                  login
                  avatarUrl
                }
                labels(first: 10) {
                  nodes {
                    name
                    color
                  }
                }
              }
              ... on PullRequest {
                number
                title
                url
                state
                repository {
                  name
                  owner {
                    login
                  }
                }
                author {
                  login
                  avatarUrl
                }
                labels(first: 10) {
                  nodes {
                    name
                    color
                  }
                }
              }
              ... on DraftIssue {
                title
              }
            }
          }
        }
      }
    }
    rateLimit {
      limit
      remaining
      used
      resetAt
    }
  }
`;
