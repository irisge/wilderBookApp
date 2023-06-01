import { gql } from "apollo-server-express";

const skillSchema = gql`
  type Skill {
    id: ID!
    name: String
  }

  type Query {
    getAllSkills: [Skill] 
    getSkill(id: Int): Skill 
  }
`;

export default  skillSchema; 