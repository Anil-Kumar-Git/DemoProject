import React, { useState, useEffect } from "react";
import { Url } from "../../Middleware/BaseUrl/BaseUrl";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    props.login(true);
  }, []);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const recoverPwd = async () => {
    let responce = await fetch(`${Url}/user/forgot`, {
      method: "post",
      body: JSON.stringify({ email }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let result = await responce.json();
    console.log(result);
    if (result.status == 200) {
      navigate("/forgot-message");
    } else {
      setError("* only admin can access this page");
    }
  };

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
                      <span className="d-none d-lg-block">DemoAdmin</span>
                    </a>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Forgot your password?
                        </h5>
                        <p className="text-center small">
                          Don't fret! Just type in your email and we will send
                          you a code to reset your password!
                        </p>
                      </div>
                      <div className="text-center small error-red">{error}</div>
                      <div className="row g-3 needs-validation" noValidate="">
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">
                            Your Email
                          </label>
                          <div className="input-group has-validation">
                            <input
                              type="email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                              id="yourEmail"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                            onClick={recoverPwd}
                          >
                            Recover password
                          </button>
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

export default ForgotPassword;
