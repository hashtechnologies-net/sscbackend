import React from "react";
import "./roadmap.css";

const RoadMap = () => {
  return (
    <section className="roadmap-section">
      <div className="container benifits-heading-container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="roadmap-heading text-center">RoadMap</h3>
          </div>
        </div>
      </div>
      <div className="container py-2 mb-4" style={{ marginTop: 50 }}>
        {/* <!-- timeline item 1 --> */}
        <div className="row no-gutters">
          <div className="col-sm">{/* <!--spacer-->  */}</div>
          {/* <!-- timeline item 1 center dot --> */}
          <div className="col-sm-1 text-center flex-column d-none d-sm-flex">
            <div className="row h-50">
              <div className="col">&nbsp;</div>
              <div className="col">&nbsp;</div>
            </div>
            <h5 className="m-2">
              <span className="badge badge-pill bg-light border">&nbsp;</span>
            </h5>
            <div className="row h-50">
              <div className="col border-right">&nbsp;</div>
              <div className="col">&nbsp;</div>
            </div>
          </div>
          {/* <!-- timeline item 1 event content --> */}
          <div className="col-sm py-2">
            <div className="card roadmap-card">
              <div className="card-body">
                <div className="float-right text-muted small date-color">
                  November, 2020
                </div>

                <p className="card-text roadmap-sub-title">
                  Basic Research And Analysis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- timeline item 2 --> */}
        <div className="row no-gutters">
          <div className="col-sm py-2">
            <div className="card shadow roadmap-card">
              <div className="card-body">
                <div className="float-right small date-color">
                  January, 2021
                </div>

                <p className="card-text roadmap-sub-title">
                  Development of web and App
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-1 text-center flex-column d-none d-sm-flex">
            <div className="row h-50">
              <div className="col border-right">&nbsp;</div>
              <div className="col">&nbsp;</div>
            </div>
            <h5 className="m-2">
              <span className="badge badge-pill bg-light border">&nbsp;</span>
            </h5>
            <div className="row h-50">
              <div className="col border-right">&nbsp;</div>
              <div className="col">&nbsp;</div>
            </div>
          </div>
          <div className="col-sm">{/* <!--spacer--> */}</div>
        </div>
        {/* <!--/row-->
  <!-- timeline item 3 --> */}
        <div className="row no-gutters">
          <div className="col-sm">{/* <!--spacer-->  */}</div>
          <div className="col-sm-1 text-center flex-column d-none d-sm-flex">
            <div className="row h-50">
              <div className="col border-right">&nbsp;</div>
              <div className="col">&nbsp;</div>
            </div>
            <h5 className="m-2">
              <span className="badge badge-pill bg-light border">&nbsp;</span>
            </h5>
            <div className="row h-50">
              <div className="col border-right">&nbsp;</div>
              <div className="col">&nbsp;</div>
            </div>
          </div>
          <div className="col-sm py-2">
            <div className="card roadmap-card">
              <div className="card-body">
                <div className="float-right text-muted small date-color">
                  April, 2021
                </div>

                <p className="roadmap-sub-title">
                  Formal JV Aligned with SSC or Health Wealth Card India.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <!--/row-->
  <!-- timeline item 4 --> */}
        <div className="row no-gutters">
          <div className="col-sm py-2">
            <div className="card roadmap-card">
              <div className="card-body">
                <div className="float-right text-muted small date-color">
                  June 2nd,2021
                </div>

                <p className="roadmap-sub-title">
                  Contract Signing with Everest Insurance Company.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-1 text-center flex-column d-none d-sm-flex">
            <div className="row h-50">
              <div className="col border-right">&nbsp;</div>
              <div className="col">&nbsp;</div>
            </div>
            <h5 className="m-2">
              <span className="badge badge-pill bg-light border">&nbsp;</span>
            </h5>
            <div className="row h-50">
              <div className="col">&nbsp;</div>
              <div className="col">&nbsp;</div>
            </div>
          </div>
          <div className="col-sm">{/* <!--spacer-->  */}</div>
        </div>
        {/* <!--/row--> */}

        {/* <!--/row-->
  <!-- timeline item 5--> */}
        <div className="row no-gutters">
          <div className="col-sm">{/* <!--spacer-->  */}</div>
          <div className="col-sm-1 text-center flex-column d-none d-sm-flex">
            <div className="row h-50">
              <div className="col border-right">&nbsp;</div>
              <div className="col">&nbsp;</div>
            </div>
            <h5 className="m-2">
              <span className="badge badge-pill bg-light border">&nbsp;</span>
            </h5>
            <div className="row h-50">
              <div className="col border-right">&nbsp;</div>
              <div className="col">&nbsp;</div>
            </div>
          </div>
          <div className="col-sm py-2">
            <div className="card roadmap-card">
              <div className="card-body">
                <div className="float-right text-muted small date-color">
                  June 15th,2021
                </div>

                <p className="roadmap-sub-title">Formation of Board Members</p>
              </div>
            </div>
          </div>
        </div>

        {/* <!--/row-->
  <!-- timeline item 6 --> */}
        <div className="row no-gutters">
          <div className="col-sm py-2">
            <div className="card roadmap-card">
              <div className="card-body">
                <div className="float-right text-muted small date-color">
                  July 18th
                </div>
                <p className="roadmap-sub-title">
                  Informal Software Launch of SSC
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-1 text-center flex-column d-none d-sm-flex">
            <div className="row h-50">
              <div className="col border-right">&nbsp;</div>
              <div className="col">&nbsp;</div>
            </div>
            <h5 className="m-2">
              <span className="badge badge-pill bg-light border">&nbsp;</span>
            </h5>
            <div className="row h-50">
              <div className="col">&nbsp;</div>
              <div className="col">&nbsp;</div>
            </div>
          </div>
          <div className="col-sm">{/* <!--spacer-->  */}</div>
        </div>
      </div>
      <hr />

      {/* <!--container--> */}
    </section>
  );
};

export default RoadMap;
