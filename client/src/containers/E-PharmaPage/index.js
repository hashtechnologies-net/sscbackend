import React from "react";
import { E_Pharma as data } from "./EPharmaData";
import Fade from "react-reveal/Fade";

import "./e-pharma.css";

const EPharma = () => {
  return (
    <section>
      <div className="container e-pharma-heading">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center">E-Pharma</h3>
          </div>
        </div>
      </div>
      <div className="container e-pharma-container ">
        <div className="row d-flex  align-items-center m-4 main-content">
          <Fade left>
            <div className="col-lg-6 text-center">
              <img
                src="/assets/img/E-pharma.png"
                alt="E-PharmaImage"
                className="imageStyle"
              />
            </div>
          </Fade>
          <Fade right>
            <div className="col-lg-6">
              <div className="section-content-paragraph">
                {data.map((data) => {
                  return (
                    <p className="description-section" key={data.id}>
                      {data.description}
                    </p>
                  );
                })}
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default EPharma;
