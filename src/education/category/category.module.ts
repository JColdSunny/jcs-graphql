import { Module } from "@nestjs/common";
import { GetCategoriesResolver } from "./get-categories/interface/get-categories.resolver";
import { CategoryService } from "./service";

@Module({
  providers: [
    GetCategoriesResolver,

    CategoryService
  ]
})
export class CategoryModule {
}
