import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendRequest } from "../../actions";
import { apipaths } from "../../actions/apiPaths";

function Login() {

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const loginHandler = async (e) => {
    e.preventDefault();
    setMessage("logging in...")
    const { error, data } = await sendRequest(apipaths.login, user);
    // console.log(error, data);
    if(error) setMessage(error.message)
    if(data){
      setMessage(data.message);
      localStorage.setItem("userId", data.data._id);
      localStorage.setItem("token", data.data.token);
      navigate("/dashboard");
    }
  };
  return (
    <div className="section">
      <div className="form-container">
        <div className="text-center">
          {message && <p className="text-success">{message}</p>}
        </div>
        <h4 className="mt-0 mb-3">Log In</h4>
        <form onSubmit={loginHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Work Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>

          <div className="text-center text-white mt-3">
            don't have an account ?{" "}
            <Link to={"/signup"} className="text-white">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
