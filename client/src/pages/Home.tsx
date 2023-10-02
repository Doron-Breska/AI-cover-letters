// import { ChangeEvent, useState } from "react";
// import { useDispatch } from "react-redux";

import LoginForm from "../components/LoginForm";
import Token from "../components/Token";
import UserProfile from "../components/UserProfile";

// type Props = {}

const Home = () => {
  return (
    <div>
      <LoginForm />
      <UserProfile />
      <Token />
    </div>
  );
};

export default Home;
