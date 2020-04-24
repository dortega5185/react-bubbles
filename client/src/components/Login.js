import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const intialState = {
  username: "",
  password: "",
  isFetching: false,
};

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState(intialState);
  const { push } = useHistory();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin({ ...login, isFetching: true });
    axiosWithAuth()
      .post("/api/login", login)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.payload));
        push("/bubble-page");
      })
      .catch((err) => {
        console.log(err, "sorry, an error has occured while logging you in");
      });
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        Username:
        <input
          type="text"
          name="username"
          label="username"
          value={login.username}
          onChange={handleChange}
          placeholder="username"
        />
        <br />
        Password:
        <input
          type="password"
          name="password"
          label="password"
          value={login.password}
          onChange={handleChange}
          placeholder="password"
        />
        <br />
        <button>Log in</button>
        {login.isFetching && "Please wait...logging you in"}
      </form>
    </>
  );
};

export default Login;
