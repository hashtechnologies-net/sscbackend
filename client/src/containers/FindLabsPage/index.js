import React, { useState, useEffect } from "react";
import "./find-labs.css";
import axios from "axios";

const FindLabs = () => {
  const [lab, setLabs] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async () => {};

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/pathlabs`)
      .then(function (response) {
        console.log(response.data);
        setLabs(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section className="find-labs-searchbar">
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6 ">
            <div className="search-heading text-center">
              <h3 className="search-heading-h3">Find Labs</h3>
              <p className="search-heading-p">
                Select State ,District and City , Locator will display
                participating Labs.
              </p>
            </div>
            <div className="input-group">
              <input
                type="text"
                className="form-control input-form-control"
                placeholder="Search..."
                // onChange={(e) => {
                //   setLabs(e.target.value);
                // }}
              />

              <div className="input-group-append">
                <button
                  className="btn btn-secondary"
                  // onClick={handleSubmit}
                  type="button"
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {lab && !error && (
        <div id="cards_landscape_wrap-2">
          <div className="container">
            <div className="row">
              {lab.data.map((data) => (
                <div className="col-xs-8 col-sm-6 col-md-6 col-lg-3">
                  <div className="card-flyer">
                    <div className="text-box">
                      <div className="text-container">
                        <p>
                          <b>Hosptal:</b> &nbsp;{data.name}
                        </p>
                        <p>
                          <b>Province:</b> &nbsp;{data.province}
                        </p>
                        <p>
                          <b>Distict:</b> &nbsp;{data.district}
                        </p>
                        <p>
                          <b>Country:</b> &nbsp; {data.country}
                        </p>
                        <p>
                          <b>OpenTime</b>: &nbsp;{data.openTime}
                        </p>
                        <p>
                          <b>Website:</b> &nbsp;{data.website}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FindLabs;
