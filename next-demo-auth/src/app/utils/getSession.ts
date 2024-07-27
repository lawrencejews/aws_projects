import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import { getServerSession, NextAuthOptions } from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"
import createUserPool from "./cognitoUserPool"
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession } from "amazon-cognito-identity-js"
import { Session } from "inspector"

export const AuthOptions: NextAuthOptions = {

  providers: [

    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: " password" }
      },
      async authorize(credentials?: Record<string, string> | undefined): Promise<any> {
        if (!credentials || !credentials.username || !credentials.password) {
          throw new Error("Username and Password not defined correctly")
        }

        const Userpool: CognitoUserPool = await createUserPool()
        const cognitoUser: CognitoUser = new CognitoUser({
          Username: credentials.username,
          Pool: Userpool,
        })

        const authenticationDetails: AuthenticationDetails = new AuthenticationDetails({
          Username: credentials.username,
          Password: credentials.password
        })
        return new Promise((resolve, reject): void => {
          cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result: CognitoUserSession): void => {
              console.log("Cognito Login Success: ", result)
              const payload: { [p: string]: any } = result.getIdToken().payload
              resolve({
                id: credentials.username,
                email: credentials.username
              });
            },
            onFailure: (err) => {
              console.log("Cognito Login Failed", err)
              if (err.code = "UserNotConfirmedException") {
                resolve({
                  id: credentials.username,
                  email: "Not Verified"
                })
              }
              reject(new Error(err.message) || "Cognito Email Auth Failed")
            }
          })
        })
      }

    }),
  ],
  pages: {
    signIn: "/login"
  }
}

export function getSession(...args:[
  GetServerSidePropsContext['req'],
  GetServerSidePropsContext['res']] |
[NextApiRequest, NextApiResponse] |
[]):Promise<Session | null>{  // Session
  return getServerSession(...args, AuthOptions)
}