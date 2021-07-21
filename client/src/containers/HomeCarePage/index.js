import React from "react";
import { HomeCareData as data } from "./HomeCareData";
import Zoom from "react-reveal/Zoom";
import { Link } from "react-router-dom";

const HomeCare = () => {
  const homecareheadingContainer = {
    marginTop: "100px",
  };
  const homecareheading = {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: "30px",
  };
  const cardStyle = {
    width: "100%",
    boxShadow: `0px 2px 4px 0px rgb(0 0 0 / 7%)`,
    border: "none",
    background: "#f7f7f7",
  };
  const imageStyle = {
    width: "100%",
    objectFit: "cover",
  };

  return (
    <section style={{ background: "#fdfafa" }}>
      <div className="row" style={homecareheadingContainer}>
        <div className="col-md-12">
          <h3 className="text-center" style={homecareheading}>
            OUR HOME CARE SERVICES{" "}
          </h3>
        </div>
      </div>
      <div className="container" style={{ marginTop: 50 }}>
        <div className="row">
          {data.map((data, key) => {
            return (
              <div
                className="col-lg-4 col-sm-6 col-xs-12 mb-3 d-flex justify-content-center"
                key={key}
              >
                <Zoom>
                  <div className="card" style={cardStyle}>
                    <img
                      src={data.img}
                      className="mb-3"
                      style={imageStyle}
                      alt="img"
                    />
                    <div className="card-body text-left">
                      <h5
                        className="card-title text-center"
                        style={{
                          color: "#55595c",
                          fontWeight: "bold",
                          fontSize: 20,
                        }}
                      >
                        {data.homeTitle}
                      </h5>
                      <p
                        className="card-text text-center"
                        style={{ color: "#55595c" }}
                      >
                        {data.homeDetail}
                      </p>
                    </div>
                  </div>
                </Zoom>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeCare;
