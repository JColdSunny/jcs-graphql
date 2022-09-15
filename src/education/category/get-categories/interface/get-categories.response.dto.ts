import { createUnionType, Field, ObjectType } from "@nestjs/graphql";
import { Category } from "../dto/category.dto";

export const GetCategoriesResponseDtoUnion = createUnionType({
  name: "GetCategoriesResponseDtoUnion",
  types: () => [GetCategoriesResponseDto]
});

@ObjectType()
export class GetCategoriesResponseDto {

  @Field(() => [Category])
  categories: Category[];

  constructor(props: GetCategoriesResponseDto) {
    this.categories = props.categories;
  }
}