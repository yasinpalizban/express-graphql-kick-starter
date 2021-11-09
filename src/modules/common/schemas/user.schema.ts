import { IGraphqlSchema } from "../../../core/interfaces/graphql.schema";

export const userSchema: IGraphqlSchema = {

  type:
    `

    type ObjectUser {
    data: [AuthUser]
    pager : Pagination

    }

   `,
  input:
    `
     input UserCreateInputData {
         email: String!
         userName: String!
         phone: String!
         role: String!
         firstName: String
         lastName: String
   }

   input UserUpdateInputData {
         role: String
         firstName: String
         lastName: String
         status: Boolean
         password: String
   }


   `,
  query:
    `
     users(paginate: PaginationInputData, search: SearchInputData): ObjectUser
     user(id: ID!): AuthUser

`,
  mutation: `
  userCreate( inputs: UserCreateInputData): Void
  userUpdate(id: ID!,inputs: UserUpdateInputData): Void
  userDelete(id: ID!): Void
 `
};
