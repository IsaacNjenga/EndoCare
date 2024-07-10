import React, { useState } from "react";
import "../assets/css/form.css";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../components/validation";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
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
        });
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
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
          <label htmlFor="role" className="form-label">
            Role:
          </label>
          <select name="role" className="form-control" onChange={handleChange}>
            <option value="" disabled>
              Choose
            </option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
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
        <button className="form-btn">Sign up!</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
