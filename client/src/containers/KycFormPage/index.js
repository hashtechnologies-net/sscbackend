import React, { useState } from "react";
import Joi from "joi";
import "./kyc.css";
import { NepaliDatePicker } from "datepicker-nepali-reactjs";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

const KycForm = () => {
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");

  const [startDate, setStartDate] = useState(new Date());

  const [kyc, setKyc] = useState({});

  const [errors, setErrors] = useState({});

  const kycSchema = Joi.object({
    first_name: Joi.string()
      .pattern(/^[A-Za-z ]+$/)
      .min(3)
      .max(30)
      .required(),
    middle_name: Joi.string()
      .pattern(/^[A-Za-z ]+$/)
      .min(3)
      .max(30),
    last_name: Joi.string()
      .pattern(/^[A-Za-z ]+$/)
      .min(3)
      .max(30)
      .required(),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    mobile_number: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),

    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),

    avatar: Joi.any()
      .meta({ swaggerType: "file" })
      .allow("image/png, image/gif, image/jpeg")
      .required(),

    age: Joi.number().required(),
    country: Joi.string().required(),
    provience: Joi.string().required(),
    district: Joi.string().required(),
    gaupalika_nagarpalika: Joi.string().required(),
    wardno: Joi.string().required(),
    state: Joi.string().required(),
    occupation: Joi.string().required(),
    street_address: Joi.string().required(),

    father_name: Joi.string()
      .pattern(/^[A-Za-z ]+$/)
      .min(3)
      .max(30)
      .required(),
    mother_name: Joi.string()
      .pattern(/^[A-Za-z ]+$/)
      .min(3)
      .max(30)
      .required(),
    grandfather_name: Joi.string()
      .pattern(/^[A-Za-z ]+$/)
      .min(3)
      .max(30)
      .required(),
    grandmother_name: Joi.string()
      .pattern(/^[A-Za-z ]+$/)
      .min(3)
      .max(30)
      .required(),
    spouse_name: Joi.string()
      .pattern(/^[A-Za-z ]+$/)
      .min(3)
      .max(30)
      .required(),
    husband_wife_name: Joi.string()
      .pattern(/^[A-Za-z ]+$/)
      .min(3)
      .max(30)
      .required(),
    guardian_name: Joi.string()
      .pattern(/^[A-Za-z ]+$/)
      .min(3)
      .max(30)
      .required(),
    name: Joi.string()
      .pattern(/^[A-Za-z ]+$/)
      .min(3)
      .max(30)
      .required(),
  });

  const handleKycSubmission = (e) => {
    e.preventDefault();

    try {
      const value = kycSchema.validate({ ...kyc }, { abortEarly: false });
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
  const onDayChangeInput = (day) => {
    console.log(day);
  };

  return (
    <>
      <div>
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="kycModal"
          tabIndex="-1"
          aria-labelledby="kycModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg ">
            <div className="modal-content ">
              <div className="row mt-5">
                <div className="kyc-form col-md-12 d-flex justify-content-center flex-column align-items-center">
                  <div className="col-md-4 kyc-form-heading">
                    <h1 className=" text-center">SSC Form</h1>
                  </div>
                </div>
              </div>

              <div className="modal-body ">
                <div className="container mb-5">
                  <form className="row d-flex justify-content-center mx-2">
                    <div className="col-lg-12 col-sm-12 col-md-12">
                      <div className="mb-4">
                        <div
                          className="card px-4 py-3 text-center panel"
                          style={{
                            boxShadow: "0px 0px 5px 0px rgba(212, 182, 212, 1)",
                          }}
                        >
                          <div className="card-title mt-3 separator">
                            Basic Details
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="first_name" className="form-label">
                                  First Name
                                </label>
                                <input
                                  id="first_name"
                                  type="text"
                                  className="form-control kyc-formStyle"
                                  name="firstname"
                                  value={kyc.first_name}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      first_name: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.first_name ? (
                                <div
                                  id={`${errors.first_name}-error-message`}
                                  className="alert alert-danger"
                                >
                                  {errors.first_name}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="last_name" className="form-label">
                                  Middle Name (Optional)
                                </label>
                                <input
                                  id="middle_name"
                                  type="text"
                                  className={`form-control input-section kyc-formStyle ${
                                    errors.middle_name ? "is-invalid" : ""
                                  }`}
                                  value={kyc.middle_name}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      middle_name: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.middle_name ? (
                                <div
                                  id={`${errors.middle_name}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                  role="alert"
                                >
                                  {errors.middle_name}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="last_name" className="form-label">
                                  Last Name
                                </label>
                                <input
                                  id="last_name"
                                  type="text"
                                  className={`form-control input-section kyc-formStyle ${
                                    errors.last_name ? "is-invalid" : ""
                                  }`}
                                  value={kyc.last_name}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      last_name: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.last_name ? (
                                <div
                                  id={`${errors.last_name}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                  role="alert"
                                >
                                  {errors.last_name}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-lg-4">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="mobile_number"
                                  className="form-label"
                                >
                                  Mobile Number
                                </label>
                                <input
                                  id="mobile_number"
                                  type="number"
                                  className={`form-control kyc-formStyle ${
                                    errors.mobile_number ? "is-invalid" : ""
                                  }`}
                                  value={kyc.mobile_number}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      mobile_number: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.mobile_number ? (
                                <div
                                  id={`${errors.mobile_number}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.mobile_number}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-lg-8">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="email" className="form-label">
                                  Email Address (Optional)
                                </label>
                                <input
                                  id="email"
                                  type="text"
                                  className={`form-control kyc-formStyle  ${
                                    errors.email ? "is-invalid" : ""
                                  }`}
                                  value={kyc.email}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      email: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.email ? (
                                <div
                                  id={`${errors.email}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.email}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="row mt-3"></div>

                          <div className="row mt-3">
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="bith_date" className="form-label">
                                  Date of Birth in AD
                                </label>
                                <DayPickerInput
                                  className="form-control dayinput"
                                  placeholder="YYYY/MM/DD"
                                  format="YYYY/MM/DD"
                                  onDayChange={onDayChangeInput}
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <label for="bith_date" className="form-label">
                                Date of Birth in BS
                              </label>
                              <NepaliDatePicker className="form-control" />
                            </div>
                          </div>

                          <div className="row mt-3">
                            <div className="col-lg-12">
                              <label for="gender" className="form-label">
                                Gender
                              </label>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="gender"
                                />
                                <label class="form-check-label">Male</label>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="gender"
                                  checked
                                />
                                <label class="form-check-label">Female</label>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="gender"
                                />
                                <label class="form-check-label">Others</label>
                              </div>
                            </div>
                          </div>

                          <div className="row mt-3">
                            <div className="col-lg-12">
                              <label>Marital Status</label>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="marital status"
                                />
                                <label class="form-check-label">Married</label>
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="marital status"
                                  checked
                                />
                                <label class="form-check-label">
                                  Unmarried
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="row mt-5">
                            <div className="col-lg-12 separator mb-4">
                              Permantent Address
                            </div>
                          </div>

                          <div className="row mt-3">
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="provience" className="form-label">
                                  Provience
                                </label>
                                <input
                                  id="provience"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.provience ? "is-invalid" : ""
                                  }`}
                                  value={kyc.provience}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      provience: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.provience ? (
                                <div
                                  id={`${errors.provience}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.provience}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="district" className="form-label">
                                  District
                                </label>
                                <input
                                  id="district"
                                  type="text"
                                  className={`form-control input-section formStyle  ${
                                    errors.district ? "is-invalid" : ""
                                  }`}
                                  value={kyc.district}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      district: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.district ? (
                                <div
                                  id={`${errors.district}-error-messsage`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.district}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          <div className="row mt-3 mb-4">
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="gaupalika_nagarpalika"
                                  className="form-label"
                                >
                                  Gaupalika/Nagarpalika
                                </label>
                                <input
                                  id="gaupalika"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.gaupalika_nagarpalika
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  value={kyc.gaupalika_nagarpalika}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      gaupalika_nagarpalika: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.gaupalika_nagarpalika ? (
                                <div
                                  id={`${errors.gaupalika_nagarpalika}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.gaupalika_nagarpalika}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="wardno" className="form-label">
                                  Ward No
                                </label>
                                <input
                                  id="wardno"
                                  type="text"
                                  className={`form-control  input-section formStyle  ${
                                    errors.wardno ? "is-invalid" : ""
                                  }`}
                                  value={kyc.wardno}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      wardno: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.wardno ? (
                                <div
                                  id={`${errors.wardno}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.wardno}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          <div className="row mt-5">
                            <div className="col-lg-12 separator mb-4">
                              Temporary Address
                            </div>
                          </div>

                          <div className="row mt-3">
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="provience" className="form-label">
                                  Provience
                                </label>
                                <input
                                  id="provience"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.provience ? "is-invalid" : ""
                                  }`}
                                  value={kyc.provience}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      provience: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.provience ? (
                                <div
                                  id={`${errors.provience}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.provience}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-lg-6 ">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="district" className="form-label">
                                  District
                                </label>
                                <input
                                  id="district"
                                  type="text"
                                  className={`form-control input-section formStyle  ${
                                    errors.district ? "is-invalid" : ""
                                  }`}
                                  value={kyc.district}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      district: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.district ? (
                                <div
                                  id={`${errors.district}-error-messsage`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.district}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          <div className="row mt-3 mb-4">
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="gaupalika" className="form-label">
                                  Gaupalika/Nagarpalika
                                </label>
                                <input
                                  id="gaupalika"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.gaupalika ? "is-invalid" : ""
                                  }`}
                                  value={kyc.gaupalika}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      gaupalika: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.gaupalika ? (
                                <div
                                  id={`${errors.gaupalika}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.gaupalika}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="wardno" className="form-label">
                                  Ward No
                                </label>
                                <input
                                  id="wardno"
                                  type="text"
                                  className={`form-control  input-section formStyle  ${
                                    errors.wardno ? "is-invalid" : ""
                                  }`}
                                  value={kyc.wardno}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      wardno: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.wardno ? (
                                <div
                                  id={`${errors.wardno}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.wardno}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          <div className="row mt-5">
                            <div className="col-lg-12 separator mb-4">
                              Identity
                            </div>
                          </div>

                          <div className="row mt-3">
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="citizenship" className="form-label">
                                  Citizenship/Passport - Front
                                </label>
                                <input
                                  type="file"
                                  id="citizenship"
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      citizenship: e.target.files,
                                    });
                                  }}
                                  accept="image/png, image/gif, image/jpeg"
                                  className={`form-control kyc-formStyle ${
                                    errors.citizenship ? "is-invalid" : ""
                                  }`}
                                />
                              </div>
                              {errors.citizenship ? (
                                <div
                                  id={`${errors.citizenship}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.citizenship}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-lg-6 ">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="citizenship" className="form-label">
                                  Citizenship/Passport - Back
                                </label>
                                <input
                                  type="file"
                                  id="citizenship"
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      citizenship: e.target.files,
                                    });
                                  }}
                                  accept="image/png, image/gif, image/jpeg"
                                  className={`form-control kyc-formStyle ${
                                    errors.citizenship ? "is-invalid" : ""
                                  }`}
                                />
                              </div>
                              {errors.citizenship ? (
                                <div
                                  id={`${errors.citizenship}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.citizenship}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          <div className="row mt-3 mb-4">
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="issue_date" className="form-label">
                                  Issue Date
                                </label>
                                <input
                                  id="issue_date"
                                  type="date"
                                  className={`form-control kyc-formStyle ${
                                    errors.issue_date ? "is-invalid" : ""
                                  }`}
                                  value={kyc.issue_date}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      issue_date: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.issue_date ? (
                                <div
                                  id={`${errors.issue_date}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.issue_date}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="issued_from" className="form-label">
                                  Issued From
                                </label>
                                <input
                                  id="issued_from"
                                  type="text"
                                  className={`form-control  input-section formStyle  ${
                                    errors.issued_from ? "is-invalid" : ""
                                  }`}
                                  value={kyc.issued_from}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      issued_from: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.issued_from ? (
                                <div
                                  id={`${errors.issued_from}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.issued_from}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          <div className="row  mt-5">
                            <div className="col-lg-12 separator ">
                              Additional Information
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="occupation" className="form-label">
                                  Occupation
                                </label>
                                <input
                                  id="occupation"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.occupation ? "is-invalid" : ""
                                  }`}
                                  value={kyc.occupation}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      occupation: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.occupation ? (
                                <div
                                  id={`${errors.occupation}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.occupation}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="Panno" className="form-label">
                                  PAN No.(Optional)
                                </label>
                                <input
                                  id="Panno"
                                  type="number"
                                  className={`form-control kyc-formStyle ${
                                    errors.Panno ? "is-invalid" : ""
                                  }`}
                                  value={kyc.Panno}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      Panno: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.Panno ? (
                                <div
                                  id={`${errors.Panno}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.Panno}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          <div className="row mt-3">
                            <div className="col-md-12">
                              <label for="card">Card Variant</label>
                              <select
                                className="custom-select d-block w-100"
                                id="card"
                                required=""
                              >
                                <option value="">Choose...</option>
                                <option>1000</option>
                                <option>2000</option>
                                <option>3000</option>
                              </select>
                            </div>
                          </div>

                          <div className="row  mt-5">
                            <div className="col-lg-12 separator ">
                              Family Details
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="fathers_name"
                                  className="form-label"
                                >
                                  Father's Name
                                </label>
                                <input
                                  id="fathers_name"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.father_name ? "is-invalid" : ""
                                  }`}
                                  value={kyc.father_name}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      father_name: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.father_name ? (
                                <div
                                  id={`${errors.fathers_name}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.father_name}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="mothers_name"
                                  className="form-label"
                                >
                                  Mother's Name
                                </label>
                                <input
                                  id="mothers_name"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.mother_name ? "is-invalid" : ""
                                  }`}
                                  value={kyc.mother_name}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      mother_name: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.mother_name ? (
                                <div
                                  id={`${errors.mother_name}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.mother_name}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="grandfather_name"
                                  className="form-label"
                                >
                                  Grandfather's Name
                                </label>
                                <input
                                  id="grandfather_name"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.grandfather_name ? "is-invalid" : ""
                                  }`}
                                  value={kyc.grandfather_name}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      grandfather_name: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.grandfather_name ? (
                                <div
                                  id={`${errors.grandfather_name}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.grandfather_name}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="grandmother_name"
                                  className="form-label"
                                >
                                  Grandmother's Name
                                </label>
                                <input
                                  id="grandfather_name"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.grandmother_name ? "is-invalid" : ""
                                  }`}
                                  value={kyc.grandfather_name}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      grandmother_name: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.grandmother_name ? (
                                <div
                                  id={`${errors.grandfather_name}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.grandmother_name}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="husband_wife_name"
                                  className="form-label"
                                >
                                  Husband/Wife's Name
                                </label>
                                <input
                                  id="spouse_name"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.husband_wife_name ? "is-invalid" : ""
                                  }`}
                                  value={kyc.husband_wife_name}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      husband_wife_name: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.husband_wife_name ? (
                                <div
                                  id={`${errors.husband_wife_name}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.husband_wife_name}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="spouse" className="form-label">
                                  Spouse's Name
                                </label>
                                <input
                                  id="spouse_name"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.spouse_name ? "is-invalid" : ""
                                  }`}
                                  value={kyc.spouse_name}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      spouse_name: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.spouse_name ? (
                                <div
                                  id={`${errors.spouse_name}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.spouse_name}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          <div className="row  mt-5">
                            <div className="col-lg-12 separator ">
                              In Case of Minor
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="name" className="form-label">
                                  Name
                                </label>
                                <input
                                  id="name"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.name ? "is-invalid" : ""
                                  }`}
                                  value={kyc.name}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      name: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.name ? (
                                <div
                                  id={`${errors.name}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.name}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="date of attaining major"
                                  className="form-label"
                                >
                                  Date of attaining major
                                </label>
                                <DayPickerInput
                                  placeholder="YYYY/MM/DD"
                                  format="YYYY/MM/DD"
                                  onDayChange={onDayChangeInput}
                                  className="form-control"
                                />
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="date of birth in BS"
                                  className="form-label"
                                >
                                  Date of Birth in BS
                                </label>
                                <NepaliDatePicker className="form-control" />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for=" date of Birth in AD"
                                  className="form-label"
                                >
                                  Date of Birth in AD
                                </label>
                                <DayPickerInput
                                  placeholder="YYYY/MM/DD"
                                  format="YYYY/MM/DD"
                                  onDayChange={onDayChangeInput}
                                  className="form-control"
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="father_name" className="form-label">
                                  Father's Name
                                </label>
                                <input
                                  id="father_name"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.father_name ? "is-invalid" : ""
                                  }`}
                                  value={kyc.father_name}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      father_name: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.father_name ? (
                                <div
                                  id={`${errors.father_name}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.father_name}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="mother_name" className="form-label">
                                  Mother's Name
                                </label>
                                <input
                                  id="mother_name"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.mother_name ? "is-invalid" : ""
                                  }`}
                                  value={kyc.mother_name}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      mother_name: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.mother_name ? (
                                <div
                                  id={`${errors.mother_name}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.mother_name}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="grandfather_name"
                                  className="form-label"
                                >
                                  Grandfather's Name
                                </label>
                                <input
                                  id="grandfather_name"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.grandfather_name ? "is-invalid" : ""
                                  }`}
                                  value={kyc.grandfather_name}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      grandfather_name: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.grandfather_name ? (
                                <div
                                  id={`${errors.grandfather_name}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.grandfather_name}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="guardian_name"
                                  className="form-label"
                                >
                                  Guardian's Name
                                </label>
                                <input
                                  id="guardian_name"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.guardian_name ? "is-invalid" : ""
                                  }`}
                                  value={kyc.guardian_name}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      guardian_name: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.guardian_name ? (
                                <div
                                  id={`${errors.guardian_name}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.guardian_name}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="relation with minor"
                                  className="form-label"
                                >
                                  Relation with minor
                                </label>
                                <input
                                  id="relation with minor"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.relation_minor ? "is-invalid" : ""
                                  }`}
                                  value={kyc.relation_minor}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      relation_minor: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.relation_minor ? (
                                <div
                                  id={`${errors.relation_minor}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.relation_minor}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="minor_identity"
                                  className="form-label"
                                >
                                  Minor Identity Card No
                                </label>
                                <input
                                  id="minor_identity"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.minor_identity ? "is-invalid" : ""
                                  }`}
                                  value={kyc.minor_identity}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      minor_identity: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.minor_identity ? (
                                <div
                                  id={`${errors.minor_identity}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.minor_identity}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="issue_authority"
                                  className="form-label"
                                >
                                  Issue Authority
                                </label>
                                <input
                                  id="issue_authority"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.issue_authority ? "is-invalid" : ""
                                  }`}
                                  value={kyc.issue_authority}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      issue_authority: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.issue_authority ? (
                                <div
                                  id={`${errors.issue_authority}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.issue_authority}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="place" className="form-label">
                                  Place and Date of Issue
                                </label>
                                <input
                                  id="place"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.place ? "is-invalid" : ""
                                  }`}
                                  value={kyc.place}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      place: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.place ? (
                                <div
                                  id={`${errors.place}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.place}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          <div className="row  mt-5">
                            <div className="col-lg-12 separator ">
                              Nominee Details
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="nominee_name"
                                  className="form-label"
                                >
                                  Nominee's Name
                                </label>
                                <input
                                  id="nominee_name"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.nominee_name ? "is-invalid" : ""
                                  }`}
                                  value={kyc.nominee_name}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      nominee_name: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.nominee_name ? (
                                <div
                                  id={`${errors.nominee_name}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.nominee_name}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="passport_photo"
                                  className="form-label"
                                >
                                  Passport Size Photo
                                </label>
                                <input
                                  type="file"
                                  id="passport_photo"
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      passport_photo: e.target.files,
                                    });
                                  }}
                                  accept="image/png, image/gif, image/jpeg"
                                  className={`form-control kyc-formStyle ${
                                    errors.passport_photo ? "is-invalid" : ""
                                  }`}
                                />
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="date of birth in BS"
                                  className="form-label"
                                >
                                  Relation with me
                                </label>
                                <input
                                  id="relation_with_me"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.relation_with_me ? "is-invalid" : ""
                                  }`}
                                  value={kyc.relation_with_me}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      relation_with_me: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="son_wife_daughter_of"
                                  className="form-label"
                                >
                                  Son/Wife/Daughter of
                                </label>
                                <input
                                  id="son_wife_daughter_of"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.son_wife_daughter_of
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  value={kyc.son_wife_daughter_of}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      son_wife_daughter_of: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.son_wife_daughter_of ? (
                                <div
                                  id={`${errors.son_wife_daughter_of}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.son_wife_daughter_of}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="date of birth"
                                  className="form-label"
                                >
                                  Date of birth
                                </label>
                                <input
                                  id="date_of_birth"
                                  type="date"
                                  className={`form-control kyc-formStyle ${
                                    errors.date_of_birth ? "is-invalid" : ""
                                  }`}
                                  value={kyc.date_of_birth}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      date_of_birth: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.date_of_birth ? (
                                <div
                                  id={`${errors.date_of_birth}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.date_of_birth}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="identity_card"
                                  className="form-label"
                                >
                                  Identity Card(Citizenship/Passport/others)
                                </label>
                                <input
                                  id="identity_card"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.identity_card ? "is-invalid" : ""
                                  }`}
                                  value={kyc.identity_card}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      identity_card: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.identity_card ? (
                                <div
                                  id={`${errors.identity_card}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.identity_card}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="certificate_no"
                                  className="form-label"
                                >
                                  Certificate No
                                </label>
                                <input
                                  id="certificate_no"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.certificate_no ? "is-invalid" : ""
                                  }`}
                                  value={kyc.certificate_no}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      certificate_no: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.certificate_no ? (
                                <div
                                  id={`${errors.certificate_no}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.certificate_no}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="issuing_authority"
                                  className="form-label"
                                >
                                  Issuing Authority
                                </label>
                                <input
                                  id="issuing_authority"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.issuing_authority ? "is-invalid" : ""
                                  }`}
                                  value={kyc.issuing_authority}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      issuing_authority: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.issuing_authority ? (
                                <div
                                  id={`${errors.issuing_authority}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.issuing_authority}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="place_date" className="form-label">
                                  Place and Date of Issue
                                </label>
                                <input
                                  id="place_date"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.place_date ? "is-invalid" : ""
                                  }`}
                                  value={kyc.place_date}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      place_date: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.place_date ? (
                                <div
                                  id={`${errors.place_date}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.place_date}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="permanent_address"
                                  className="form-label"
                                >
                                  Permantent Address
                                </label>
                                <input
                                  id="spouse_name"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.permanent_address ? "is-invalid" : ""
                                  }`}
                                  value={kyc.permanent_address}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      permanent_address: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.permanent_address ? (
                                <div
                                  id={`${errors.permanent_address}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.permanent_address}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="permanent_address"
                                  className="form-label"
                                >
                                  Temporary Address
                                </label>
                                <input
                                  id="permanent_address"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.temporary_address ? "is-invalid" : ""
                                  }`}
                                  value={kyc.temporary_address}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      temporary_address: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.temporary_address ? (
                                <div
                                  id={`${errors.temporary_address}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.temporary_address}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="contact_address"
                                  className="form-label"
                                >
                                  Contact Address
                                </label>
                                <input
                                  id="contact_address"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.contact_address ? "is-invalid" : ""
                                  }`}
                                  value={kyc.contact_address}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      contact_address: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.contact_address ? (
                                <div
                                  id={`${errors.contact_address}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.contact_address}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="telephone_no"
                                  className="form-label"
                                >
                                  Telephone Number
                                </label>
                                <input
                                  id="telephone_no"
                                  type="number"
                                  className={`form-control kyc-formStyle ${
                                    errors.telephone_no ? "is-invalid" : ""
                                  }`}
                                  value={kyc.telephone_no}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      telephone_no: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.telephone_no ? (
                                <div
                                  id={`${errors.telephone_no}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.telephone_no}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label for="email" className="form-label">
                                  Email Address
                                </label>
                                <input
                                  id="email"
                                  type="text"
                                  className={`form-control kyc-formStyle ${
                                    errors.email ? "is-invalid" : ""
                                  }`}
                                  value={kyc.email}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      email: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.email ? (
                                <div
                                  id={`${errors.email}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.email}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group d-flex flex-column align-items-start">
                                <label
                                  for="mobile_number"
                                  className="form-label"
                                >
                                  Mobile Number
                                </label>
                                <input
                                  id="mobile_number"
                                  type="number"
                                  className={`form-control kyc-formStyle ${
                                    errors.mobile_number ? "is-invalid" : ""
                                  }`}
                                  value={kyc.mobile_number}
                                  onChange={(e) => {
                                    setKyc({
                                      ...kyc,
                                      mobile_number: e.target.value,
                                    });
                                  }}
                                  required
                                />
                              </div>
                              {errors.mobile_number ? (
                                <div
                                  id={`${errors.mobile_number}-error-message`}
                                  // className="invalid-feedback"
                                  className="alert alert-danger"
                                >
                                  {errors.mobile_number}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          <div className="row mt-4 mb-3">
                            <div className="col-md-12">
                              <button
                                type="submit"
                                className=" btn btn-primary"
                                // data-bs-toggle="modal"
                                // data-bs-target="#kycModal"
                                onClick={handleKycSubmission}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycForm;
