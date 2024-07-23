import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../components/validation";
import axios from "axios";
import "../assets/css/register.css";
import { toast } from "react-toastify";
import Loader from "../components/loader";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value || e.target.id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const errs = Validation(values);
    setErrors(errs);
    if (errs.name === "" && errs.email === "" && errs.password === "") {
      axios
        .post("register", values, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Success!", {
              position: "top-right",
              autoClose: 5000,
            });
            navigate("/login");
          }
        })
        .catch((err) => {
          if (err.response.data.errors) {
            setServerErrors(err.response.data.errors);
          } else {
            console.log(err);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };


  return (
    <>
      {loading && <Loader />}
      <div className="body">
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <strong>Name:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
              <strong>E-mail:</strong>
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
            </div>
            <div className="form-group role-options">
              <label htmlFor="role" className="form-label">
              <strong>Role:</strong>
              </label>
              <div>
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  id="doctor"
                  onChange={handleChange}
                  className="form-radio"
                />
                <label htmlFor="doctor" className="form-radio-label">
                  Doctor
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="role"
                  value="patient"
                  id="patient"
                  onChange={handleChange}
                  className="form-radio"
                />
                <label htmlFor="patient" className="form-radio-label">
                  Patient
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
              <strong>Password:</strong>
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            {serverErrors.length > 0 &&
              serverErrors.map((error, index) => (
                <p className="error" key={index}>
                  {error.msg}
                </p>
              ))}
            <button type = "submit" className="form-btn">Sign up!</button>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
