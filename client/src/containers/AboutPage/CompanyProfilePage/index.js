import React from "react";
import "./company-profile.css";

const ComapnyProfile = () => {
  return (
    <section style={{ background: "#fdfafa" }}>
      <div className="container" style={{ marginTop: 100 }}>
        <div className="row ">
          <div className="col-md-12">
            <div className="company-profile-title">
              <h2
                className="text-center"
                style={{ fontWeight: "bold", color: "#007bff", fontSize: 30 }}
              >
                Company’s Profile
              </h2>
              <div className="company-profile-image text-center mt-5">
                <img
                  src="/assets/img/about-icons/company-profile.png"
                  alt="company-profile"
                />
              </div>
              <p className="mt-5" style={{ color: "#212529" }}>
                Swasthya Samriddhi Card is committed to providing an
                extraordinary perspective for providing next level of Consumer
                Services in Healthcare Sector in Nepal. Its the only product in
                Nepal that covers entire spectrum of Healthcare Services ranging
                from Hospitals, Clinics, Diagnostic Centers , E-Pharmacies ,Vet
                Care ,Home Care Services and Doctor Consultation.
              </p>
              <p style={{ color: "#212529" }}>
                A not only generic service, It also aims at providing all sort
                of Health care services to the society. We have Multispecialty
                Hospitals as well as Specialist Doctors from various fields
                associated with us who will be providing better Health Services
                at affordable prices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComapnyProfile;
