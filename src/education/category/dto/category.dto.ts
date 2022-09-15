import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Category model" })
export class Category {

  @Field(() => ID, { description: "A unique identified." })
  id: number;

  @Field(() => String, { description: "Category name" })
  name: string;
}