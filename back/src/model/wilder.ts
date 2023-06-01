import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Grade } from "./grade";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Wilder extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Grade])
  @OneToMany(() => Grade, (grade) => grade.wilder, { cascade: true })
  public grades: Grade[];
}
