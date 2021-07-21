import React from "react";

const SwasthyaSamridiInNepal = () => {
  const swasthyaSamriddhiSection = {
    color: "#23357b",
  };

  const swasthyaSamriddhiheading = {
    fontWeight: "bold",
    fontSize: "30px",
    color: "#007bff",
  };

  return (
    <section style={{ background: "#fdfafa" }}>
      <div className="container mb-5" style={{ marginTop: 100 }}>
        <div className="row" style={swasthyaSamriddhiSection}>
          <div className="swasthya-samriddhi-heading col-md-12 d-flex justify-content-center flex-column align-items-center">
            <div className="col-md-12">
              <h1 className="pb-1 text-center" style={swasthyaSamriddhiheading}>
                Swasthya Samriddhi In Nepal With Historical Journey
              </h1>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="swasthya-samriddhi-image text-center">
                <img
                  src="/assets/img/about-icons/swasthya-samriddhi.png"
                  alt="swasthya-samriddhi"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              <p style={{ color: "#212529" }}>
                In the Initials days of our journey We were successfully able to
                Liaison Major Facilitators. During this tenure we were able to
                collaborate with over 8,000+ Doctors, Pharmacies, PathLabs And
                Hospitals in Major States.
              </p>
              <p style={{ color: "#212529" }}>
                On the other Hand we also created 250+ retailers as our
                distributor network in order to smoothen the Business and
                simultaneously promote Health Wealth Card. During this tenure by
                2019 mid we gained trust of around approximately have 42 lakh+
                customer and counting.
              </p>
              <p style={{ color: "#212529" }}>
                In terms of legality, we do agreement with our service provider.
                We disclose all the parameters in agreements and we take all the
                sign and mutually agreed.
              </p>
              <p style={{ color: "#212529" }}>
                In the same Space & Modus Operandi we Intend to introduce and
                lead the services in our Nation as well from new Fiscal Year
                2078.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwasthyaSamridiInNepal;
