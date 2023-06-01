import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Skill } from "../model/skill";

@Resolver(Skill)
export class SkillResolver {
    @Query(() => [Skill])
    async getAllSkills():Promise<Skill[]> {
    return await Skill.find()
    }
    
    @Query(() => [Skill])
    async getSkillById(@Arg("id") id: number): Promise<Skill[]> {
        try {
        const skill = await Skill.findOne({ where: { id } });
        if (skill !== null && skill !== undefined) {
            return [skill];
        } else {
            return []; // Return an empty array if no skill is found
        }
        } catch (e) {
            console.log(e);
            return []; // Return an empty array in case of an error
        }
    }   

    @Mutation(() => [Skill])
    async createSkill(@Arg("name") name: string):Promise<[Skill]> {
     const skill =  await Skill.create({
      name
     }).save()
     return [skill]
    }

  @Mutation(() => Boolean)
  async deleteSkill(@Arg("id") id: number): Promise<boolean> {
    try {
        const skill = await Skill.findOne({where :{id}});
        if (skill == null) {
        // skill with the specified ID was not found
        return false;
        }

        await Skill.delete(id);
        return true;
    } catch(e) {
        console.log(e)
        return false;
    }
    }
}
