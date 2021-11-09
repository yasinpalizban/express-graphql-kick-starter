import { IGraphqlSchema } from "../../../core/interfaces/graphql.schema";

export const authSchema: IGraphqlSchema = {
  type:
    `

    type AuthPermissionUser {
         _id: ID!
         actions: String!
         userId: String!
         userName: String!
         firstName: String!
         lastName: String!
         permission: String!
         permissionId: String!

    }

    type AuthPermissionGroup {
      _id: ID!
     actions: String!
     groupId: String!
     group: String!
     permission: String!
     permissionId: String!
   }


 type AuthPermissions {
      _id: String!
      name: String!
    }

    type AuthJwt {
      token: String!
      expire: Int!
    }

    type AuthRole {
     _id: String!
     name: String!
    }

    type AuthUser {
     _id: ID!
     firstName: String!
     lastName: String!
     userName: String!
     password: String!
     email: String!
     phone: String!
     image: String!
     address: String!
     gender: Boolean!
     country: String!
     city: String!
     active: Boolean!
     activeToken: String!
     activeExpires: String!
     status: Boolean!
     statusMessage: String!
     resetToken: String!
     resetExpires: String!
     resetAt: String!
     createdAt: String!
     updatedAt: String!
     deletedAt: String!
    }

 type AuthLogIn {
       statusMessage: String
        permissions: AuthPermissions
        permissionGroup: AuthPermissionGroup
        permissionUser: AuthPermissionUser
        userInformation: AuthUser
        role: AuthRole
        jwt: AuthJwt

    }


     `,
  input:
    `
   input SignInInputData {
     login: String!
     password: String!
   }

   input SignUpInputData {
     login: String!
     userName: String!
     password: String!
     passwordConfirm: String!
   }

   input ForgotInputData {
     login: String!
   }
   input ResetPasswordEmailInputData {
     email: String!
     resetToken: String!
     password: String!
     passwordConfirm: String!
   }
   input ResetPasswordSmsInputData {
     phone: String!
     resetToken: String!
     password: String!
     passwordConfirm: String!
   }

    input SendActivateCodeEmailInputData {
     email: String!
   }

   input SendActivateCodeSmsInputData {
     phone: String!
   }
   input ActivateSmsInputData {
    phone: String!
    activeToken: String!
   }
   input ActivateEmailInputData {
    email: String!
    activeToken: String!
   }
   `,
  query:
    `
    signIn(inputs: SignInInputData): AuthLogIn
    signOut: Void

    `,
  mutation: `

   signUp(inputs: SignUpInputData): AuthUser!

   forgot(inputs: ForgotInputData): Void
   resetPasswordViaEmail(inputs: ResetPasswordEmailInputData): Void
   resetPasswordViaSms(inputs: ResetPasswordSmsInputData): Void

   sendActivateCodeViaEmail(inputs: SendActivateCodeEmailInputData): Void
   sendActivateCodeViaSms(inputs: SendActivateCodeSmsInputData): Void
   activationViaEmail(inputs: ActivateEmailInputData): Void
   activationViaSms(inputs: ActivateSmsInputData): Void
  `

}


