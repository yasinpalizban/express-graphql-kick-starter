import { IGraphqlSchema } from "../../../core/interfaces/graphql.schema";

export const permissionSchema: IGraphqlSchema = {

  type:
    `
    type  Permission {
         _id: String!
         name: String!
         description: String
    }
    type ObjectPermission {
    data: [Permission]
    pager : Pagination

    }

   `,
  input:
    `
     input PermissionInputData {
         name: String!
         description: String
   }`,
  query:
    `
     permissions(paginate: PaginationInputData, search: SearchInputData): ObjectPermission
      permission(id: ID!): Permission

`,
  mutation: `
   permissionCreate( inputs: PermissionInputData): Void
   permissionUpdate(id: ID!,inputs: PermissionInputData): Void
   permissionDelete(id: ID!): Void
 `
};
