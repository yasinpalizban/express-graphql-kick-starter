import { IGraphqlSchema } from "../../../core/interfaces/graphql.schema";

export const overViewSchema: IGraphqlSchema = {
  type: `
  type PostOverView {
    user: AuthUser
  }
  `,
  query:
    `
     overView: PostOverView
`
};
