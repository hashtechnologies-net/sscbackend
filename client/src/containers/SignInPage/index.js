import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signin.css";
import Joi from "joi";

const SignIn = () => {
  const [signin, setSignIn] = useState({});
  const [errors, setErrors] = useState({});

  const SignInSchema = Joi.object({
    first_name: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .min(3)
      .max(30)
      .required(),
    last_name: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .min(3)
      .max(30)
      .required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),

    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  const handleSignInSubmission = (e) => {
    e.preventDefault();

    try {
      const value = SignInSchema.validate({ ...signin }, { abortEarly: false });
      let currentErrors = {};

      setErrors({});
      if (value.error) {
        value.error.details.forEach((error) => {
          currentErrors[error.context.key] = error.message;
        });
      }

      setErrors({
        ...currentErrors,
      });
      console.log(currentErrors);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section id="signin" className="signin">
      <div className="container-sm mb-5 signin-container">
        <form className="row d-flex justify-content-center mx-2">
          <div className="col-lg-6 col-sm-12 col-md-12">
            <div
              className="card px-4 py-3 text-center panel"
              style={{
                boxShadow: "0px 0px 5px 0px rgba(212, 182, 212, 1)",
              }}
            >
              <div className="card-title mt-3 separator">Sign In</div>
              <hr />

              <div className="row mt-3">
                <div className="col-lg-12">
                  <div className="form-group d-flex flex-column align-items-start">
                    <label for="email-address" class="form-label">
                      Email Address:
                    </label>
                    <input
                      type="text"
                      className={`form-control formStyle  ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      value={signin.email}
                      onChange={(e) => {
                        setSignIn({
                          ...signin,
                          email: e.target.value,
                        });
                      }}
                      required
                    />
                    {errors.email ? (
                      <div
                        id={`${errors.email}-error-message`}
                        // className="invalid-feedback"
                        className="alert alert-danger error-section"
                      >
                        {errors.email}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-lg-12">
                  <div className="form-group d-flex flex-column align-items-start">
                    <label for="password" class="form-label">
                      Password:
                    </label>
                    <input
                      type="text"
                      className={`form-control formStyle  ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      value={signin.password}
                      onChange={(e) => {
                        setSignIn({
                          ...signin,
                          password: e.target.value,
                        });
                      }}
                      required
                    />
                    {errors.password ? (
                      <div
                        id={`${errors.password}-error-message`}
                        // className="invalid-feedback"
                        className="alert alert-danger error-section"
                      >
                        {errors.password}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="row mt-4 mb-3">
                <div className="col-lg-12">
                  <button
                    type="submit"
                    onClick={handleSignInSubmission}
                    className="btn sign-in-button"
                  >
                    Login
                  </button>
                  &nbsp;&nbsp;
                  <Link to="/sign-up">
                    <button type="submit" className="btn sign-up-button">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
