import React from "react";
import "./mission.css";

const visionmission = () => {
  const missionvissionSection = {
    color: "#23357b",
  };

  const missionvissionheading = {
    fontWeight: "bold",
    fontSize: "30px",
    color: "#007bff",
  };

  return (
    <section style={{ background: "#fdfafa" }}>
      <div className="container mb-5" style={{ marginTop: 100 }}>
        <div className="row" style={missionvissionSection}>
          <div className="mision-vision-heading col-md-12 d-flex justify-content-center flex-column align-items-center">
            <div className="col-md-12">
              <h1 className="pb-1 text-center" style={missionvissionheading}>
                Vision And Mission
              </h1>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="mision-vision-image text-center">
                <img
                  src="/assets/img/about-icons/vision-mission.jpg"
                  alt="mision-vision"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              <p style={{ color: "#212529" }}>
                {" "}
                Swasthya Samriddhi Card works behind the ideology of “Swasthya
                Samriddhi Nepal” At Swasthya Samriddhi, we believe that it’s
                right of every citizen of our country to get better treatment in
                their budget and it must be easily accessible without any hidden
                Terms or Conditions.
              </p>
              <p style={{ color: "#212529" }}>
                Health Wealth Card is a unique product with each card having its
                unique number that helps in solving all the problems faced by
                people
              </p>
              <p style={{ color: "#212529" }}>
                The only mission of Health Wealth Card is to make Healthcare
                Services available across the Nation at affordable prices,
                making them feasible and in reach of every sector of society.
                Its ultimate Mission is to become Nation’s first core Health
                Fintech in Blockchain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default visionmission;
