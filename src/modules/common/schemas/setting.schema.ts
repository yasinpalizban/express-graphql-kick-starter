import { IGraphqlSchema } from "../../../core/interfaces/graphql.schema";

export const settingSchema: IGraphqlSchema = {

  type:
    `
    type  Setting {
         _id: String!
         key: String!
         value: String!
         description: String
         status: Boolean
         createdAt: String
         updatedAt: String
         deletedAt: String
    }
    type ObjectSetting {
    data: [Setting]
    pager : Pagination

    }

   `,
  input:
    `
     input SettingInputData {
         key: String!
         value: String!
         description: String!
         status: Boolean!
   }`,
  query:
    `
     settings(paginate: PaginationInputData, search: SearchInputData): ObjectSetting
     setting(id: ID!): Setting

`,
  mutation: `
  settingCreate( inputs: SettingInputData): Void
  settingUpdate(id: ID!,inputs: SettingInputData): Void
  settingDelete(id: ID!): Void
 `
};
