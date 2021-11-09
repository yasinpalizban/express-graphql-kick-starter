export const authConfig = {
  defaultUserProfile: "public/upload/profile/default-avatar.jpg",
  gmail: {
    clientId: "",
    clientSecret: ""
  },

  facebook: {
    appId: "",
    appSecret: ""
  },
  captcha: {
    siteKey: "",
    secretKey: ""
  },
  time: {
    day: 86400,
    hour: 3600
  },
  authRoutes: ["activationViaSms",
    "activationViaEmail",
    "sendActivateCodeViaSms",
    "sendActivateCodeViaEmail",
    "resetPasswordViaSms",
    "resetPasswordViaEmail",
    "forgot",
    "signUp",
    "signIn"

  ]

};
