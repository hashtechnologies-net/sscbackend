import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { fetchHospitalAsync, searchHospitalAsync } from "./hospital.actions";
import {
  selectHospitalList,
  selectHospitalListLoading,
  selectHospitalListError,
  selectHospitalListSuccess,
} from "./hospital.selector";

import "./find-hospital.css";

const FindHospitals = () => {
  const hospitalList = useSelector(selectHospitalList);
  const hospitalListLoading = useSelector(selectHospitalListLoading);
  const hospitalListError = useSelector(selectHospitalListError);
  const hospitalListSuccess = useSelector(selectHospitalListSuccess);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSearching(true);
    dispatch(searchHospitalAsync(searchQuery));
  };

  const handleTryAgain = (event) => {
    event.preventDefault();
    if (isSearching) {
      dispatch(searchHospitalAsync(searchQuery));
    } else {
      dispatch(fetchHospitalAsync());
    }
  };

  useEffect(() => {
    if (!hospitalListSuccess) {
      dispatch(fetchHospitalAsync());
    }
  }, []);

  useEffect(() => {
    console.log(hospitalListLoading);
  }, [hospitalListLoading]);

  return (
    <section className="find-hospital-searchbar">
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6 ">
            <div className="search-heading text-center">
              <h3 className="search-heading-h3">Find Hospitals</h3>
              <p className="search-heading-p">
                Select State , District and City , Locator will display
                Participated Hospitals.{" "}
              </p>
            </div>
            <div className="input-group">
              <input
                type="text"
                className="form-control input-form-control"
                placeholder="Search..."
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                value={searchQuery}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-secondary"
                  onClick={handleSubmit}
                  type="button"
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Topic Cards --> */}
      {hospitalListLoading && <div class="text-center">Loading...</div>}
      {hospitalListError.length && (
        <div className="container mt-4">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Something Bad Happened!</h4>
            <button className="btn btn-secondary mt-3" onClick={handleTryAgain}>
              Try Again
            </button>
          </div>
        </div>
      )}
      {hospitalListSuccess && (
        <div id="cards_landscape_wrap-2">
          <div className="container">
            <div className="row">
              {hospitalList.map((data) => (
                <div className="col-xs-8 col-sm-6 col-md-6 col-lg-3">
                  <div className="card-flyer">
                    <div className="text-box">
                      <div className="image-box">
                        <img src={data.photo} alt="" />
                      </div>
                      <div className="text-container">
                        <p>
                          <b>Hosptal:</b> &nbsp;{data.name}
                        </p>
                        <p>
                          <b>Location:</b> &nbsp;{data.location}
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

export default FindHospitals;
