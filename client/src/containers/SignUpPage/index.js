import React, { useState } from "react";
import "./signup.css";
import Joi from "joi";

const SignUp = () => {
  const [signup, setSignUp] = useState({});
  const [errors, setErrors] = useState({});

  const SignUpSchema = Joi.object({
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

  const handleSignUpSubmission = (e) => {
    e.preventDefault();

    try {
      const value = SignUpSchema.validate({ ...signup }, { abortEarly: false });
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
    <>
      <section id="signup" className="signup">
        <div className="container-sm mb-5 signup-container">
          <form className="row d-flex justify-content-center mx-2">
            <div className="col-lg-6 col-sm-12 col-md-12">
              <div
                className="card px-4 py-3 text-center panel"
                style={{
                  boxShadow: "0px 0px 5px 0px rgba(212, 182, 212, 1)",
                }}
              >
                <div className="card-title mt-3 separator">Sign Up</div>
                <hr />
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group d-flex flex-column align-items-start">
                      <label for="first_name" class="form-label">
                        First Name:
                      </label>
                      <input
                        type="text"
                        className={`form-control formStyle ${
                          errors.first_name ? "is-invalid" : ""
                        }`}
                        // name="firstname"
                        value={signup.first_name}
                        onChange={(e) => {
                          setSignUp({
                            ...signup,
                            first_name: e.target.value,
                          });
                        }}
                        required
                      />
                      {errors.first_name ? (
                        <div
                          id={`${errors.first_name}-error-message`}
                          // className="invalid-feedback"
                          className="alert alert-danger error-section"
                        >
                          {errors.first_name}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group d-flex flex-column align-items-start">
                      <label for="last_name" class="form-label">
                        Last Name:
                      </label>
                      <input
                        type="text"
                        className={`form-control input-section formStyle ${
                          errors.last_name ? "is-invalid" : ""
                        }`}
                        value={signup.last_name}
                        onChange={(e) => {
                          setSignUp({
                            ...signup,
                            last_name: e.target.value,
                          });
                        }}
                        required
                      />

                      {errors.last_name ? (
                        <div
                          id={`${errors.last_name}-error-message`}
                          // className="invalid-feedback"
                          className="alert alert-danger error-section"
                          role="alert"
                        >
                          {errors.last_name}
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
                      <label for="email-address" class="form-label">
                        Email Address:
                      </label>
                      <input
                        type="text"
                        className={`form-control formStyle  ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        value={signup.email}
                        onChange={(e) => {
                          setSignUp({
                            ...signup,
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
                        value={signup.password}
                        onChange={(e) => {
                          setSignUp({
                            ...signup,
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
                      onClick={handleSignUpSubmission}
                      className=" btn submit-button"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
