import { gql } from "@apollo/client";

export const GET_ALL_WILDERS_AND_SKILLS = gql`
  query getAllWildersAndSkills {
    getAllWildersAndSkills{
    name
    id
    grades {
      id
      grade
      skill {
        name
        id
      }
    }
    }
  }
`;

export const CREATE_WILDER = gql`
  mutation createWilder($name: String!) {
    createWilder(name: $name) {
        id
        name
    }
  }
`