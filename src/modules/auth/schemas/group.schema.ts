import { IGraphqlSchema } from "../../../core/interfaces/graphql.schema";

export const groupSchema: IGraphqlSchema = {

  type:
    `

    type  Group {
         _id: String!
         name: String!
         description: String

    }
    type ObjectGroup {
    data: [Group]
    pager : Pagination

    }

   `,
  input:
    `
     input GroupInputData {
         name: String!
         description: String!

   }`,
  query:
    `
     groups(paginate: PaginationInputData, search: SearchInputData): ObjectGroup
     group(id: ID!): Group

`,
  mutation: `
  groupCreate( inputs: GroupInputData): Void
  groupUpdate(id: ID!,inputs: GroupInputData): Void
  groupDelete(id: ID!): Void
 `
};
