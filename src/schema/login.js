import { gql } from "@apollo/client";

export const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;

export const LOGIN_USER= gql`
mutation loginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
    refreshToken
    user {
      id
      email
      lastName
      firstName
      role{
        privillege{
          privillegeName
          permitted
          privillegeType
        }
      }
      pages {
        page
      }
      tel
      teacherId{
        _id
        lastName
        firstName
      }
    }
  }
}
`
