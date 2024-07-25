"use client"
import React, { useState } from 'react'

function Page() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async () => {

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input type={"text"} onChange={(e) => setUsername(e.target.value)} />
        <label>Password: </label>
        <input type={"password"} onChange={(e) => setPassword(e.target.value)} />
        <button type={"submit"}>Login</button>
      </form>
    </div>
  )
}

export default Page