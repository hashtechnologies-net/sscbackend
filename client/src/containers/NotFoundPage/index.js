import React from "react";
import { Link } from "react-router-dom";
import "./not-found.css";
const PageNotFound = () => {
  return (
    <>
      <section className="not-found-section">
        <div className="row">
          <div className="col-12">
            <h3 className="error">404</h3>
            <p className="content-message">Oops! Something is wrong.</p>
            <div class="col text-center">
              <Link to="/">
                <button className="go-back-button text-center justify-content-center">
                  <i className="fa fa-home"></i> Go back in home page, is
                  better.
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PageNotFound;
