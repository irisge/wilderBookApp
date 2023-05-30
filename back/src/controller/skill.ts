import { Request, Response } from "express";
import dataSource from "../utils";
import { Skill } from "../entity/skill";

const skillController = {
  create: async (req: Request, res: Response) => {
    const skillToCreate = new Skill();
    skillToCreate.name = req.body.name;
    try {
      await dataSource.manager.save(Skill, skillToCreate);
      res.send("skill created");
    } catch (err) {
      console.log(err);
      res.send("Error while creating the skill");
    }
  },
  read: async (req: Request, res: Response) => {
    try {
      const skills = await dataSource.manager.find(Skill);
      res.send(skills);
    } catch (err) {
      console.log(err);
      res.send("Error while getting the skills");
    }
  },
};

export default skillController;
