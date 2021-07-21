import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <section id="contact" className="contact" style={{ marginTop: 100 }}>
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Contact Us</h2>
        </div>

        <div
          className="row mt-1 d-flex justify-content-end"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <div className="col-lg-5">
            <div className="info">
              <div className="address">
                <i className="bi bi-geo-alt"></i>
                <h4>Location:</h4>
                <p>Hash Tower, Biratnagar</p>
              </div>

              <div className="email">
                <i className="bi bi-envelope"></i>
                <h4>Email:</h4>
                <p>info@swasthyasamridhhi.com</p>
              </div>

              <div className="phone">
                <i className="bi bi-phone"></i>
                <h4>Call:</h4>
                <p>+977-9820715777</p>
              </div>
            </div>
          </div>

          <div
            className="col-lg-6 mt-5 mt-lg-0"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <form
            // action="forms/contact.php"
            // method="post"
            // role="form"
            // className="php-email-form"
            >
              <div className="row">
                <div className="col-md-6 ">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="col-md-6  mt-3 mt-md-0">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
              <div className=" mt-3">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  id="subject"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className=" mt-3">
                <textarea
                  className="form-control"
                  name="message"
                  rows="5"
                  placeholder="Message"
                  required
                ></textarea>
              </div>
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
