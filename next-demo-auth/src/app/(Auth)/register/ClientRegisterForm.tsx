"use client"
import React, { FormEvent, useState } from 'react'
import cognitoRegister from '@/app/utils/cognitoRegister'

function ClientRegisterForm() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [familyName, setFamilyName] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const registerData: { username: string, password: string, familyName: string } = {
      username: username,
      password: password,
      familyName: familyName
    }

    try {
      const result = await cognitoRegister(registerData)
      console.log(result)
    } catch (error) { console.log(error) }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input type={"text"} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setUsername(e.target.value)} />
        <label>Password: </label>
        <input type={"password"} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)} />
        <label>FamilyName: </label>
        <input type={"text"} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFamilyName(e.target.value)} />
        <button type={"submit"}>Register</button>
      </form>
    </div>

  )
}

export default ClientRegisterForm