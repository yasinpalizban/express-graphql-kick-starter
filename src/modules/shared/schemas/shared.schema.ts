import { IGraphqlSchema } from "../../../core/interfaces/graphql.schema";

export const sharedSchema: IGraphqlSchema = {
  scalar: `
      scalar Void
      scalar Upload
      scalar DateTime
 `,
  type:
    `

  type Pagination {
       totalDocs: Int
       limit: Int
       page: Int
       nextPage: Int
       prevPage: Int
       totalPages: Int
       hasPrevPage: Boolean
       hasNextPage: Boolean
       pagingCounter: Int

     }

   `,
  input:
    `
     input PaginationInputData {
         page: String
         limit: String
         sort: String
         order: String

   }


    input SearchInputData {
     filed: String!
     method : String!
     value: String
     values: [String]

     sign: String
     subDoc : String
     join: String

     }
   `
};
