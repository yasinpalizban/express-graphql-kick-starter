export function beforeLoggedIn(value: string): boolean {
  const authListFunctions: string[] = ["signIn","signUp"
    , "signOut", "forgot", "activationViaEmail", "sendActivateCodeViaEmail",
    "activationViaSms", "sendActivateCodeViaSms", "resetPasswordViaEmail",
    "resetPasswordViaSms"];

  for (const item of authListFunctions) {
    if (value == item) {
      return true;
    }
  }

  return false;
}

export function afterLoggedIn(value: string): boolean {
  const authListFunctions: string[] = [
    "signUp","signIn", "forgot", "activationViaEmail", "sendActivateCodeViaEmail",
    "activationViaSms", "sendActivateCodeViaSms", "resetPasswordViaEmail",
    "resetPasswordViaSms"];

  for (const item of authListFunctions) {
    if (value == item) {
      return true;
    }
  }

  return false;
}
