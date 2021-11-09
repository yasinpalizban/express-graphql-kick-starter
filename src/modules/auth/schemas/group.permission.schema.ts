import { IGraphqlSchema } from "../../../core/interfaces/graphql.schema";

export const groupPermissionSchema: IGraphqlSchema = {

  type:
    `
    type  GroupPermission {
         _id: String!
          actions: String!
         GroupId: String!
    }

    type ObjectGroupPermission {
    data: [GroupPermission]
    pager : Pagination

    }

   `,
  input:
    `
     input GroupPermissionInputData {
         actions: String!
         GroupId: String
   }`,
  query:
    `
     groupPermissions(id: ID!,paginate: PaginationInputData, search: SearchInputData): ObjectGroupPermission
      groupPermission(id: ID!,subId: ID!): GroupPermission

`,
  mutation: `
   groupPermissionCreate(id: ID!,inputs: GroupPermissionInputData): Void
   groupPermissionUpdate(id: ID!,subId: ID!,inputs: GroupPermissionInputData): Void
   groupPermissionDelete(id: ID!, subId: ID!): Void
 `
};
