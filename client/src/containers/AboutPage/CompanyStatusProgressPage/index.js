import React from "react";

const CompanyStatus = () => {
  const companyStatusSection = {
    color: "#23357b",
  };

  const companyStatusheading = {
    fontWeight: "bold",
    fontSize: "30px",
    color: "#007bff",
  };
  return (
    <section style={{ background: "#fdfafa" }}>
      <div className="container mb-5" style={{ marginTop: 100 }}>
        <div className="row" style={companyStatusSection}>
          <div className="company-progress-heading col-md-12 d-flex justify-content-center flex-column align-items-center">
            <div className="col-md-12">
              <h1 className="pb-1 text-center" style={companyStatusheading}>
                Company Status / Progress
              </h1>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="company-progress-image text-center">
                <img
                  src="/assets/img/about-icons/progress-icon.png"
                  alt="company-progress-image"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              <p style={{ color: "#212529" }}>
                Our organizational history prevails all the way from New Delhi ,
                India, wherein it was started with the Name of only Health
                Wealth Card in the Year 2017. During the Initial days the
                organization had only introduced the card at 150 Inr . Moving
                forward we started securing Healthcare Facilitators in PAN India
                Level and our current Founder was one of the Joint Director in
                the same organization with 30% Equity hold.
              </p>
              <p style={{ color: "#212529" }}>
                In the Year 2018 Our Founder re-designed the entire Business
                Model and went hands in hand with Big financial Institutions as
                well as Insurance Facilitators &amp; Investors .
              </p>
              <p style={{ color: "#212529" }}>
                Moving forward from the month of November ,2020 Our new Business
                venture came to establishment as Hash Technologies in Nepal and
                so on Swasthya Samriddhi Card was Introduced among its founding
                team as well as few renowned personalities as one of the
                Subsidiary and Internal business vertical of Hash Technologies
                after certain research &amp; Analysis and survey conducted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStatus;
