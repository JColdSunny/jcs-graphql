import { Client, credentials } from "@grpc/grpc-js";
import { ClassConstructor } from "class-transformer";

export class GrpcClient<T extends Client> {
  public client: T;

  constructor(host: string, port: string, client: ClassConstructor<T>) {
    this.client = new client(`${host}:${port}`, credentials.createInsecure());
  }

}