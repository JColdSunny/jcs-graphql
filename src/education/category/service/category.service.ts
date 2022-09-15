import { Injectable } from "@nestjs/common";
import {
  EducationCategoryServiceClient
} from "@proto/education/education-category-service/proto/v1/education_category_service_grpc_pb";
import {
  Category as GrpcCategory,
  GetCategoriesRequest, GetCategoriesResponse
} from "@proto/education/education-category-service/proto/v1/education_category_service_pb";
import { GrpcClient } from "@grpc/grpc.client";
import { CategoryEntity } from "@education/category/service/entity/category.entity";

@Injectable()
export class CategoryService {
  grpcClient: GrpcClient<EducationCategoryServiceClient>;

  constructor() {
    this.grpcClient = new GrpcClient<EducationCategoryServiceClient>(
      "localhost",
      "9900",
      EducationCategoryServiceClient
    );
  }

  async getCategories(): Promise<CategoryEntity[]> {
    const response = await new Promise<GetCategoriesResponse>((resolve, reject) => {
      this.grpcClient.client.getCategories(new GetCategoriesRequest(), (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });

    return response.getCategoriesList().map(this.mapToCategoryEntity);
  }

  private mapToCategoryEntity(grpcCategory: GrpcCategory): CategoryEntity {
    return {
      id: grpcCategory.getCategoryId(),
      name: grpcCategory.getName()
    };
  }

}