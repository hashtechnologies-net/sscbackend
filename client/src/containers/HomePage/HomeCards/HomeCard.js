import React from "react";
import { Link } from "react-router-dom";
import { HomeCardData as data } from "./HomeCardData";
import Zoom from "react-reveal/Zoom";
import "./home-cards.css";
import KycForm from "../../KycFormPage";

const HomeCard = () => {
  return (
    <section className="sscSection">
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-md-12">
            <div className="ssc-card-image" style={{ marginTop: 43 }}>
              <img src="./assets/img/ssc-homecard1.jpg" alt="scc" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row d-flex justify-content-between text-center">
          <div className="col-md-12">
            <button
              class="btn get-more-button"
              data-toggle="modal"
              data-target="#kycModal"
            >
              Get Your card
            </button>

            {/* <button className="btn get-more-button">Get Your card</button> */}

            <button className="btn know-more-button">Know More</button>
          </div>
          <KycForm />
        </div>
      </div>

      <div className="container mb-5" style={{ marginTop: 100 }}>
        <div className="row text-center ">
          <div className="col-md-12">
            <div className="home-card-title">
              <h2>Features</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <div className="row d-flex home-card-row">
          {data.map((data) => {
            return (
              <div className="col-lg-3 mb-3 text-center" key={data.id}>
                <Zoom>
                  <Link
                    to={data.Link}
                    style={{ textAlign: "center", color: "black" }}
                  >
                    <div className="card home-card mt-4">
                      <img
                        src={data.profile}
                        className="my-3 profile-style"
                        alt="profile"
                      />

                      <div className="card-body text-center">
                        <h6 className="card-title fw-bold">{data.Title}</h6>
                      </div>
                    </div>
                  </Link>
                </Zoom>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeCard;
