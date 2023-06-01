import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Wilder } from "../model/wilder";
import { Skill } from "../model/skill";
import { Grade } from "../model/grade";

@Resolver(Wilder)
export class WilderResolver {
  @Query(() => [Wilder])
  async getAllWilders():Promise<Wilder[]> {
    const wilder = await Wilder.find()
    return wilder
  }

  @Query(() => [Wilder])
  async getAllWildersAndSkills(): Promise<Wilder[]> {
  
    const wilders = await Wilder.find({
      relations: {
        grades: {
          skill: true,
        },
      },
    });
  
    // Filter out wilders with null or missing ID
    const filteredWilders = wilders.filter((wilder) => wilder.id !== null);
  
    console.log(JSON.stringify(filteredWilders, null, 2));
    return filteredWilders;
  }

  @Query(() => [Wilder])
  async getWilderById(@Arg("id") id:number): Promise<Wilder[]> {
    const wilder = await Wilder.findOne({where: {id}})
    if (wilder == null || wilder === undefined){
      return []
    } else {
      return [wilder]
    }
  }

  @Query(() => [Wilder])
  async getWilderAndSkillById(@Arg("id") id:number): Promise<Wilder[]> {
    const wilder = await Wilder.findOne({where: {id}, relations: {grades: {skill: true}}})
    if (wilder == null || wilder === undefined){
      return []
    } else {
      return [wilder]
    }
  }

  @Mutation(() => [Wilder])
  async createWilder(@Arg("name") name: string):Promise<[Wilder]> {
   const wilder =  await Wilder.create({
    name
   }).save()
   return [wilder]
}

  @Mutation(() => Boolean)
  async deleteWilder(@Arg("id") id: number): Promise<boolean> {
    try {
      const wilder = await Wilder.findOne({where :{id}, relations: {grades: true}});
      if (wilder == null) {
        // Wilder with the specified ID was not found
        return false;
      }

      console.log(wilder)
      for (const grade of wilder.grades) {
        await Grade.delete(grade.id);
      }

      await Wilder.delete(id);
      return true;
    } catch(e){
      console.log(e)
      return false;
    }
  }
  
  @Mutation(() => [Wilder])
  async addNewSkillToWilder(
    @Arg("wilderId") wilderId: number,
    @Arg("grade") grade: number,
    @Arg("name") name: string
  ): Promise<Wilder[] | null> {
    try {
      const wilder = await Wilder.findOne({ where: { id: wilderId }, relations: ["grades"] });
      if (wilder === null) {
        // Wilder with the specified ID was not found
        return null;
      }
  
      const newSkill = Skill.create({ name });
      const savedSkill = await newSkill.save();
  
      const newGrade = Grade.create({ grade });
      newGrade.wilder = wilder;
      newGrade.skill = savedSkill;
      await newGrade.save();
  
      wilder.grades.push(newGrade);
      await wilder.save();
  
      const filteredWilders = await Wilder.find({ where: { id: wilderId }, relations: ["grades", "grades.skill"] });
  
      return filteredWilders
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  @Mutation(() => Wilder)
  async addGradeToWilder(
    @Arg("wilderId") wilderId: number,
    @Arg("skillId") skillId: number,
    @Arg("grade") grade: number
  ): Promise<Wilder | undefined> {
    try {
      const wilder = await Wilder.findOne({ where: { id: wilderId }, relations: ["grades"] });
      if (wilder == null) {
        // Wilder with the specified ID was not found
        return undefined;
      }

      const skill = await Skill.findOne({ where: { id: skillId } });
      if (skill == null) {
        // Skill with the specified ID was not found
        return undefined;
      }

      const newGrade = Grade.create({ grade, wilderId, skillId });
      await newGrade.save();

      wilder.grades.push(newGrade);
      await wilder.save();

      return wilder;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }


  @Mutation(() => Wilder)
  async updateGradeToWilder(
    @Arg("wilderId") wilderId: number,
    @Arg("gradeId") gradeId: number,
    @Arg("newGrade") newGrade: number
  ): Promise<Wilder | undefined> {
    try {
        const wilder = await Wilder.findOne({ where: { id: wilderId }, relations: ["grades"] });
        if (wilder == null) {
          // Wilder with the specified ID was not found
          return undefined;
        }
  
        const grade = await Grade.findOne({ where: { id: gradeId}});
        if (grade == null) {
          // Grade with the specified ID for the given wilder was not found
          return undefined;
        }
  
        grade.grade = newGrade;
        await grade.save();
  
        return wilder;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  @Mutation(() => Boolean)
  async deleteGradeToWilder(
    @Arg("id") id: number,
    @Arg("gradeId") gradeId: number
  ): Promise<boolean> {
    try {
      const wilder = await Wilder.findOne({where :{id}, relations: {grades: {skill: true}}});
      if (wilder == null) {
        // Wilder with the specified ID was not found
        return false;
      }

      const grade = await wilder.grades.find((grade) => grade.id === gradeId);
      if (grade == null) {
        // Wilder with the specified ID was not found
        return false;
      } else {
        await grade.remove();
        return true
      }
    } catch {
      return false;
    }
  }


}

