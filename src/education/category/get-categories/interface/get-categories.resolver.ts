import { Query, Resolver } from "@nestjs/graphql";
import { CategoryService } from "../../service";
import { GetCategoriesResponseDto, GetCategoriesResponseDtoUnion } from "./get-categories.response.dto";
import { Category } from "@education/category/get-categories/dto/category.dto";

@Resolver()
export class GetCategoriesResolver {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @Query(() => GetCategoriesResponseDtoUnion, { name: "getCategories" })
  async getCategories(): Promise<typeof GetCategoriesResponseDtoUnion> {
    const response = await this.categoryService.getCategories();

    return new GetCategoriesResponseDto({
      categories: response.map(x => new Category({
        id: x.id,
        name: x.name
      }))
    });
  }

}