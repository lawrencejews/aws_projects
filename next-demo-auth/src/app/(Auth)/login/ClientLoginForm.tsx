"use client"
import React, { FormEvent, useState } from 'react'
import { signIn }  from "next-auth/react"

function Page():React.JSX.Element {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      const result = signIn("credentials",{ username, password, callbackUrl:"/"})
    }catch(error){console.log(error)}
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input type={"text"} onChange={(e:React.ChangeEvent<HTMLInputElement>):void => setUsername(e.target.value)} />
        <label>Password: </label>
          <input type={"password"} onChange={(e: React.ChangeEvent<HTMLInputElement>):void => setPassword(e.target.value)} />
        <button type={"submit"}>Login</button>
      </form>
    </div>
  )
}

export default Page;
