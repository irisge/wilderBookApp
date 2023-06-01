import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Wilder } from "./wilder";
import { Skill } from "./skill";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Grade extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public wilderId: number;

  @Column()
  public skillId: number;

  @Field()
  @Column({nullable: true})
  public grade: number;

  @ManyToOne(() => Wilder, (wilder) => wilder.grades)
  public wilder: Wilder;

  @Field(() => Skill)
  @ManyToOne(() => Skill, (skill) => skill.grades)
  public skill: Skill;
}
