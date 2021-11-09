import { IGraphqlSchema } from "../../../core/interfaces/graphql.schema";

export const profileSchema: IGraphqlSchema = {

  type:
    `
  type Profile {
      _id: ID!
     firstName: String
     lastName: String
     userName: String
     password: String
     email: String
     phone: String
     image: String
     address: String
     gender: Boolean
     country: String
     city: String
     active: Boolean
     status: Boolean
     statusMessage: String
     createdAt: String
     updatedAt: String
     deletedAt: String
    }

    type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

   `,
  input:
    `
     input ProfileInputData {
         image: String
        firstName: String
        lastName: String
        country: String
        city: String
        password: String
        passConfirm: String
   }`,
  query:
    `
     profile: Profile!
`,
  mutation: `
 profileUpdate(inputs: ProfileInputData): Void
 profileImage:Void
 `
};
