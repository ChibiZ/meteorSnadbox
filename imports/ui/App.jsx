import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from "meteor/react-meteor-data";
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Flow } from './Flow.jsx';
import { LoginForm } from './LoginForm.jsx';
import { RegForm } from './RegForm.jsx';
// import { LoginWithGithub } from './TODOLoginWithGithub.jsx';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();
  return (
  <div>
    {/* <LoginWithGithub/> */}
    <Hello/>
    {!user && <LoginForm/>}
    {user && 
      <div className="user" onClick={logout}>
        Logout: {user.username}
      </div>
    }
    <Info/>
    <Flow/>
    {!user && <RegForm/>}
  </div>)
};
