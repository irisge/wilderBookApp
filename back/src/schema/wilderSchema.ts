import { gql } from "apollo-server-express";

const wilderSchema = gql`
  type Wilder {
    id: ID!
    name: String
  }

  type Query {
    getAllWilders: [Wilder] 
    getWilder(id: Int): Wilder 
  }
`;

export default  wilderSchema; 
