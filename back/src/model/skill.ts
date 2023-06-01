import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Grade } from "./grade";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Skill extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => Grade, (grade) => grade.skill)
  public grades: Grade[];
}
