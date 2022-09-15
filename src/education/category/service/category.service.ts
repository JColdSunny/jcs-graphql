import { Injectable } from "@nestjs/common";
import { GetCategoriesResponseDto, GetCategoriesResponseDtoUnion } from "../get-categories/interface";

import {
  EducationCategoryServiceClient
} from "@proto/education/education-category-service/proto/v1/education_category_service_grpc_pb";
import {
  Category as GrpcCategory,
  GetCategoriesRequest, GetCategoriesResponse
} from "@proto/education/education-category-service/proto/v1/education_category_service_pb";
import { GrpcClient } from "@grpc/grpc.client";
import { Category } from "../dto/category.dto";

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

  async getCategories(): Promise<typeof GetCategoriesResponseDtoUnion> {
    const response = await new Promise<GetCategoriesResponse>((resolve, reject) => {
      this.grpcClient.client.getCategories(new GetCategoriesRequest(), (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });

    return new GetCategoriesResponseDto({
      categories: response.getCategoriesList().map(this.mapToCat)
    });
  }

  mapToCat(grpcCategory: GrpcCategory): Category {
    return {
      id: grpcCategory.getCategoryId(),
      name: grpcCategory.getName()
    };
  }

}