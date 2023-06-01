import { DataSource } from "typeorm";
import { Grade } from "./model/grade";
import { Skill } from "./model/skill";
import { Wilder } from "./model/wilder";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [Wilder, Skill, Grade],
});

export default dataSource;
