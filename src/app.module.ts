import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { CategoryModule } from "@education/category/category.module";
import { GraphqlConfigService } from "./graphql-config.service";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [CategoryModule],
      useClass: GraphqlConfigService
    })
  ]
})
export class AppModule {
}
