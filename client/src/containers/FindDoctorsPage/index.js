import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { fetchDoctorAsync, searchDoctorAsync } from "./doctor.actions";

import {
  selectDoctorList,
  selectDoctorListLoading,
  selectDoctorListError,
  selectDoctorListSuccess,
} from "./doctor.selector";

import "./find-doctor.css";

const FindDoctors = () => {
  const doctorList = useSelector(selectDoctorList);
  const doctorListLoading = useSelector(selectDoctorListLoading);
  const doctorListError = useSelector(selectDoctorListError);
  const doctorListSuccess = useSelector(selectDoctorListSuccess);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSearching(true);
    dispatch(searchDoctorAsync(searchQuery));
  };

  const handleTryAgain = (event) => {
    event.preventDefault();
    if (isSearching) {
      dispatch(searchDoctorAsync(searchQuery));
    } else {
      dispatch(fetchDoctorAsync());
    }
  };

  useEffect(() => {
    if (!doctorListSuccess) {
      dispatch(fetchDoctorAsync());
    }
  }, []);

  useEffect(() => {
    console.log(doctorListLoading);
  }, [doctorListLoading]);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/v1/doctors`)
  //     .then(function (response) {
  //       console.log(response.data);
  //       setDoctor(response.data);
  //       setLoading(false);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       setError(true);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <section className="find-doctor-searchbar">
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6 ">
            <div className="search-heading text-center">
              <h3 className="search-heading-h3">Find Doctors</h3>
              <p className="search-heading-p">
                Select State , District and City , Locator will display
                participating Doctors.
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
      {doctorListLoading && <div class="text-center">Loading...</div>}
      {doctorListError.length && (
        <div className="container mt-4">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Something Bad Happened!</h4>
            <button className="btn btn-secondary mt-3" onClick={handleTryAgain}>
              Try Again
            </button>
          </div>
        </div>
      )}
      {doctorListSuccess && (
        <div id="cards_landscape_wrap-2">
          <div className="container">
            <div className="row">
              {doctorList.data.map((data) => (
                <div className="col-xs-8 col-sm-6 col-md-6 col-lg-3">
                  <div className="card-flyer">
                    <div className="text-box">
                      {/* <div className="image-box">
                        <img src={data.photo} alt="" />
                      </div> */}
                      <div className="text-container">
                        <p>
                          <b>Doctor's Name:</b> &nbsp;{data.name}
                        </p>
                        <p>
                          <b>City:</b> &nbsp;{data.city}
                        </p>
                        <p>
                          <b>District:</b> &nbsp;{data.district}
                        </p>
                        <p>
                          <b>Country:</b> &nbsp; {data.country}
                        </p>

                        <p>
                          <b>Phone</b>: &nbsp;{data.phone}
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

export default FindDoctors;
