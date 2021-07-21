import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    // <!-- ======= Footer ======= -->
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <Link to="/about/company-profile">Company Profile</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <Link to="/features">Features</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <Link to="/">News Room</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Social Links</h4>
              <div className="social-links mt-3">
                <Link to="#" className="twitter">
                  <i className="bx bxl-twitter"></i>
                </Link>
                <Link
                  to="https://www.facebook.com/Swasthya-Samriddhi-Nepal-106037271764535/"
                  className="facebook"
                >
                  <i className="bx bxl-facebook"></i>
                </Link>
                <Link to="#" className="instagram">
                  <i className="bx bxl-instagram"></i>
                </Link>
                <Link to="#" className="google-plus">
                  <i className="bx bxl-skype"></i>
                </Link>
                <Link to="#" className="linkedin">
                  <i className="bx bxl-linkedin"></i>
                </Link>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 footer-contact">
              <h4>Contact Us</h4>
              <p style={{ fontSize: 15 }}>
                Hash Towers, Biratnagar
                <br />
                Phone: +977 1234567890
                <br />
                Email: info@swasthyasamridhhi.com
                <br />
              </p>
            </div>

            <div className="col-lg-3 col-md-6 footer-info">
              <h3>About Swasthya Samridhhi Card</h3>
              <p>
                Swasthya Samriddhi Card works behind the ideology of “Swasthya
                Samriddhi Nepal”. At Swasthya Samriddhi, we believe that it’s
                right of every citizen of our country to get better treatment in
                their budget and it must be easily accessible without any hidden
                Terms or Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>Swasthya Samriddhi Card</span>
          </strong>
          . All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
