import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wilder } from "./wilder";
import { Skill } from "./skill";

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public wilderId: number;

  @Column()
  public skillId: number;

  @Column()
  public grade: number;

  @ManyToOne(() => Wilder, (wilder) => wilder.grades)
  public wilder: Wilder;

  @ManyToOne(() => Skill, (skill) => skill.grades)
  public skill: Skill;
}
