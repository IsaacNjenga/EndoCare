import React, { useContext, useState } from "react";
import "../assets/css/form.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Validation from "../components/validation";
function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = Validation(values);
    setErrors(errs);
    if (errs.email === "" && errs.password === "") {
      axios
        .post("login", values, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            setUser(res.data.user);
            toast.success(`Welcome ${res.data.user.name}`, {
              position: "top-right",
              autoClose: 5000,
            });

            navigate("/dashboard");
          }
        })
        .catch((err) => {
          if (err.response.data.errors) {
            setServerErrors(err.response.data.errors);
            toast.error(err.response.data.error[0].msg);
          } else {
            console.log(err);
            toast.error(err.response.data.error[0].msg);
          }
        });
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            E-mail:
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            autoComplete="off"
            placeholder="E-mail Address"
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <label htmlFor="name" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        {serverErrors.length > 0 &&
          serverErrors.map((error, index) => (
            <p className="error" key={index}>
              {error.msg}
            </p>
          ))}
        <button className="form-btn">Sign in</button>
        <p>
          Don't have an account? <Link to="/register">Sign up!</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
