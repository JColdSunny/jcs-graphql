import { Injectable } from "@nestjs/common";
import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";
import { join } from "path";

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  constructor() {
  }

  createGqlOptions(): GqlModuleOptions {
    return {
      autoSchemaFile: join(process.cwd(), "src/schema.gql")
    };
  }

}