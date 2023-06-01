import { Field, InputType } from "type-graphql";

@InputType()
export class CreateWilderInput {
    @Field()
    name: String
}