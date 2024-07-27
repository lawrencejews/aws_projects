"use server"

import {CognitoUserPool} from "amazon-cognito-identity-js"

const userPoolId: string | undefined = process.env.COGNITO_ID
const clientId: string | undefined = process.env.COGNITO_CLIENT_ID

if (!userPoolId || !clientId) {
  throw Error("Cognito environment not defined!")
}

const poolData: { UserPoolId: string, ClientId: string } = {
  UserPoolId: userPoolId,
  ClientId: clientId
}

async function createUserPool(): Promise<any>{
  return new CognitoUserPool(poolData)
}

export default createUserPool;