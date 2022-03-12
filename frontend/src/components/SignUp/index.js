import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendRequest } from "../../actions";
import { apipaths } from "../../actions/apiPaths";

function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");

  const signUpHandler = async (e) => {
    e.preventDefault();
    const { error, data } = await sendRequest(apipaths.signup, user);
    if (error) setMessage(error.message);
    if (data) {
      setMessage(data.message);
      navigate("/");
    }
  };
  return (
    <div className="section">
      <div className="form-container">
        <div className="text-center">
          {message && <p className="text-success">{message}</p>}
        </div>
        <h4 className="mt-0 mb-3">Sign Up</h4>
        <form onSubmit={signUpHandler}>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="firstname"
              className="form-control"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div> 
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
          <div className="mb-3">
            <label htmlFor="confirmpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmpassword"
              className="form-control"
              onChange={(e) =>
                setUser({ ...user, confirmpassword: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={
              !user.password || user.password !== user.confirmpassword
                ? true
                : false
            }
            className="btn btn-primary"
          >
            Sign Up
          </button>
          <div className="text-center text-white mt-3">
            already have an account ?{" "}
            <Link to="/" className="text-white">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
