import React from "react";
import { BoardMemberData as data } from "./BoardMemberData";
import { AdvisoryDoctorData as item } from "./AdvisoryDoctorData";
import { AdminAndDeveloperData as admin } from "./Admin&DeveloperData";
import { AdministrationData as administration } from "./AdministrationData";

import "./team.css";

const Team = () => {
  const cardStyle = {
    width: "350px",
    border: "none",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 18px 50px -10px",
  };

  return (
    <section className="team-section">
      <div className="container board-member-heading-container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="board-member-heading text-center">Board Members</h3>
          </div>
        </div>
      </div>
      <div className="container mt-4 ">
        <div className="row">
          {data.map((data, key) => {
            return (
              <div className="col-lg-3 mb-3 " key={key}>
                <div className="card team-card mt-4 w-100" style={cardStyle}>
                  <img
                    src={data.profilePic}
                    className="my-3 profile-style"
                    alt="pp"
                  />

                  <div className="card-body text-center">
                    <h6
                      className="card-title fw-bold"
                      style={{
                        textAlign: "center",
                        color: "#0880e8",
                        fontSize: 18,
                        fontWeight: 500,
                      }}
                    >
                      {data.profileName}
                    </h6>
                    <p
                      className="card-text"
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      {data.position}
                    </p>
                  </div>

                  <div
                    className="card-footer text-center "
                    style={{
                      backgroundColor: "#f5f5f500",
                      borderTop: "1px solid #f9fafb",
                      marginBottom: "20px",
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container advisory-doctors-heading-container mt-5">
        <div className="row">
          <div className="col-md-12">
            <h3 className="advisory-doctors-heading text-center">
              Advisory Doctors
            </h3>
          </div>
        </div>
      </div>
      <div className="container mt-3 ">
        <div className="row">
          {item.map((AdvisoryDoctorData, key) => {
            return (
              <div className="col-lg-3 mb-3 " key={key}>
                <div className="card team-card mt-4 w-100" style={cardStyle}>
                  <img
                    src={AdvisoryDoctorData.profilePic}
                    className="my-3 profile-style"
                    alt="pp"
                  />

                  <div className="card-body text-center">
                    <h6
                      className="card-title fw-bold"
                      style={{
                        textAlign: "center",
                        color: "#0880e8",
                        fontSize: 18,
                        fontWeight: 500,
                      }}
                    >
                      {AdvisoryDoctorData.profileName}
                    </h6>
                    <p
                      className="card-text"
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      {AdvisoryDoctorData.position}
                    </p>
                  </div>

                  <div
                    className="card-footer text-center "
                    style={{
                      backgroundColor: "#f5f5f500",
                      borderTop: "1px solid #f9fafb",
                      marginBottom: "20px",
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container development-heading-container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="development-heading text-center">Administration</h3>
          </div>
        </div>
      </div>
      <div className="container mt-3 ">
        <div className="row">
          {administration.map((AdministrationData, key) => {
            return (
              <div className="col-lg-3 mb-3 " key={key}>
                <div className="card team-card mt-4 w-100" style={cardStyle}>
                  <img
                    src={AdministrationData.profilePic}
                    className="my-3 profile-style"
                    alt="pp"
                  />

                  <div className="card-body text-center">
                    <h6
                      className="card-title fw-bold"
                      style={{
                        textAlign: "center",
                        color: "#0880e8",
                        fontSize: 18,
                        fontWeight: 500,
                      }}
                    >
                      {AdministrationData.profileName}
                    </h6>
                    <p
                      className="card-text"
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      {AdministrationData.position}
                    </p>
                  </div>

                  <div
                    className="card-footer text-center "
                    style={{
                      backgroundColor: "#f5f5f500",
                      borderTop: "1px solid #f9fafb",
                      marginBottom: "20px",
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container development-heading-container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="development-heading text-center">Development</h3>
          </div>
        </div>
      </div>
      <div className="container mt-3 ">
        <div className="row">
          {admin.map((AdminDeveloperData, key) => {
            return (
              <div className="col-lg-3 mb-3 " key={key}>
                <div className="card team-card mt-4 w-100" style={cardStyle}>
                  <img
                    src={AdminDeveloperData.profilePic}
                    className="my-3 profile-style"
                    alt="pp"
                  />

                  <div className="card-body text-center">
                    <h6
                      className="card-title fw-bold"
                      style={{
                        textAlign: "center",
                        color: "#0880e8",
                        fontSize: 18,
                        fontWeight: 500,
                      }}
                    >
                      {AdminDeveloperData.profileName}
                    </h6>
                    <p
                      className="card-text"
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      {AdminDeveloperData.position}
                    </p>
                  </div>

                  <div
                    className="card-footer text-center "
                    style={{
                      backgroundColor: "#f5f5f500",
                      borderTop: "1px solid #f9fafb",
                      marginBottom: "20px",
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
