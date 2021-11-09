import { IGraphqlSchema } from "@/core/interfaces/graphql.schema";
import { GraphqlFunctionInterface } from "@/modules/auth/interfaces/graphql.function.interface";

export class GraphqlFunction implements GraphqlFunctionInterface {
  private name: string;
  private body: IGraphqlSchema;

  constructor(body: IGraphqlSchema) {
    this.name = "";

    this.body = body;
  }

  decode(): this {


    if (this.body.query) {

      this.name = this.body.query.replace(/(\r\n|\n|\r)/gm, "");
    }

    if (this.body.mutation) {
      this.name = this.body.mutation.replace(/(\r\n|\n|\r)/gm, "");
    }


    return this;
  }

  manipulate(): this {
    if (this.name.search("/Update/gm") !== -1) {
      this.name = this.name.replace(/Update/gm, "");

    }

    if (this.name.search("/Create/gm") !== -1) {
      this.name = this.name.replace(/Create/gm, "");
    }

    if (this.name.search("/Delete/gm") !== -1) {
      this.name = this.name.replace(/Delete/gm, "");
    }
    return this;
  }

  exchange(): this {


    const controllers: object = {
      settings: "setting",
      users: "user",
      permissions: "permissions",
      userPermissions: "userPermissions",
      groupPermissions: "groupPermissions"
    };

    for (const key in controllers) {
      if (key === this.name) {

        this.name = controllers[key];
      }
    }
    return this;

  }

  getResolver(): string {
    return this.name;
  }


  explode(): this {
    let explode: string[];

    if (this.name.search("\\(") !== -1) {

      explode = this.name.split("(");
      explode = explode[0].split("{");
      this.name = explode[1];
    } else {

      explode = this.name.split("{");
      this.name = explode[1];
      this.name = this.name.replace("}", "");
    }
    this.name = this.name.replace(/\s/g,"");
    return this;
  }

  getMethod(): string {

    if (this.name.search("/Update/gm") !== -1) {
      return "put";

    }

    if (this.name.search("/Create/gm") !== -1) {
      return "post";
    }

    if (this.name.search("/Delete/gm") !== -1) {
      return "delete";
    }

    return "get";
  }
  checkGraphqlRequest(): boolean {

    if (this.body.query||this.body.mutation) {

     return true;
    }

    return false;
  }
}
