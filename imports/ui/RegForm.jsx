import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import React, { useState } from "react";

export const RegForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submit = async (e) => {
    e.preventDefault();
      await Accounts.createUser({
        username: username,
        password: password,
      }, (error) => {
        if(error){
          alert("Username already exists");
          console.log(error);
        } else {
          Meteor.loginWithPassword(username, password);
        }
      });
  };

  return (
    <form onSubmit={submit} className="login-form">
      <label htmlFor="username">Username</label>

      <input
        type="text"
        placeholder="Username"
        name="username"
        required
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password</label>

      <input
        type="password"
        placeholder="Password"
        name="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Registry</button>
    </form>
  );
};