import { Query, Resolver } from "@nestjs/graphql";
import { CategoryService } from "../../service";
import { GetCategoriesResponseDtoUnion } from "./get-categories.response.dto";

@Resolver()
export class GetCategoriesResolver {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @Query(() => GetCategoriesResponseDtoUnion, { name: "getCategories" })
  async getCategories(): Promise<typeof GetCategoriesResponseDtoUnion> {
    return this.categoryService.getCategories();
  }

}