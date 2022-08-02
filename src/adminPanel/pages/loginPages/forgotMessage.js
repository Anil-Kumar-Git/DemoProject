import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ForgotMessage = (props) => {
  useEffect(() => {
    props.login(true);
  }, []);


  return (
    <div>
      <main className="main">
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a className="logo d-flex align-items-center w-auto">
                      <img src="assets/img/logoA1.png" alt="" />
                      <span className="d-none d-lg-block">AstroAdmin</span>
                    </a>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Reset your password?
                        </h5>
                        <p className="text-center small">
                          Check your email for a link to reset your password. If
                          it doesn’t appear within a few minutes, check your
                          spam folder.
                        </p>
                        <div className="col-12">
                            <Link to="/login">
                          <button
                            className="btn btn-primary w-100"
                            // onClick={recoverPwd}
                          >
                            Back To Login
                          </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ForgotMessage;
