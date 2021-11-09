import { IGraphqlSchema } from "../../../core/interfaces/graphql.schema";

export const userPermissionSchema: IGraphqlSchema = {

  type:
    `
    type  UserPermission {
         _id: String!
          actions: String!
         userId: String!
    }

    type ObjectUserPermission {
    data: [UserPermission]
    pager : Pagination

    }

   `,
  input:
    `
     input UserPermissionInputData {
         actions: String!
         userId: String
   }`,
  query:
    `
     userPermissions(id: ID!,paginate: PaginationInputData, search: SearchInputData): ObjectUserPermission
      userPermission(id: ID!,subId: ID!): UserPermission

`,
  mutation: `
   userPermissionCreate(id: ID!,inputs: UserPermissionInputData): Void
   userPermissionUpdate(id: ID!,subId: ID!,inputs: UserPermissionInputData): Void
   userPermissionDelete(id: ID!, subId: ID!): Void
 `
};
