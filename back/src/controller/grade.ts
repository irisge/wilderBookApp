import { Request, Response } from "express";
import dataSource from "../utils";
import { Grade } from "../entity/grade";

const gradeController = {
  create: async (req: Request, res: Response) => {
    const gradeToCreate = new Grade();
    gradeToCreate.grade = req.body.grade;
    gradeToCreate.skillId = req.body.skillId;
    gradeToCreate.wilderId = req.body.wilderId;

    try {
      await dataSource.manager.save(Grade, gradeToCreate);
      res.send("grade created");
    } catch (err) {
      console.log(err);
      res.send("Error while creating the grade");
    }
  },
};

export default gradeController;
