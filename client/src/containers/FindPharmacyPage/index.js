import React from "react";
import "./find-pharmacy.css";

const FindPharmacy = () => {
  return (
    <section className="find-pharmacy-searchbar">
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6 ">
            <div className="search-heading text-center">
              <h3 className="search-heading-h3">Find A Pharmacy</h3>
              <p className="search-heading-p">
                Select State , District and City , Locator will display
                participating Pharmacies.
              </p>
            </div>
            <div className="input-group">
              <input
                type="text"
                className="form-control input-form-control"
                placeholder="Search..."
              />
              <div className="input-group-append">
                <button className="btn btn-secondary" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindPharmacy;
