"use server"
import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import createUserPool from "./cognitoUserPool";

interface cognitoRegisterProps {
  username: string;
  password: string;
  familyName: string;
}

export default async function cognitoRegister({ username, password, familyName }: cognitoRegisterProps): Promise<any>{
  return new Promise(async (resolve, reject): Promise<void> => {
    const Userpool: CognitoUser = await createUserPool()
    const attributeList: CognitoUserAttribute[] = [
      new CognitoUserAttribute({ Name: "email", Value: username }),
      new CognitoUserAttribute({Name: "family_name", Value: familyName}),
    ]

    Userpool.signUp(username, password, attributeList, [], (err: Error | undefined) =>{
      if (err) {
        console.log("Cognito Register Error", err)
        reject(new Error (err.message) || "Cognito Register Failed!")
      }

      console.log("Cognito Registration result: ", result)
      const response: {userConfirmed: (boolean | undefined)} = {
        userConfirmed: result?.userConfirmed,
        userSub: result?.userSub
      }
      // Own Database
      resolve(response)
    })
  })
}