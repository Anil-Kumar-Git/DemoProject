import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Url } from "../../components/BaseUrl";

const Login = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(()=>{
    props.login(true)    
  },[])

  const userLogin = async () => {
    let item = { email, password };
    let responce = await fetch(
      `${Url}/user/login`,
      {
        method: "post",
        body: JSON.stringify(item),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    let result = await responce.json();
    const data=result.data;
    if (result.success == true)
    {
      if(data.role==="admin") {
        let name = result.data.name;
        let token = result.token;
        const adminId=result.data._id
        localStorage.setItem("token", token);
        localStorage.setItem("adminId",adminId );
        navigate("/");
        alert(`welcome ${name} `);
      } else{
        setError("* only admin can access this page")
      }
    } else {
      setError("* "+result.message);
    }   
  };

  return (
    <div >
      <main className="main">
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a
                      href="index.html"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src="assets/img/logoA1.png" alt="" />
                      <span className="d-none d-lg-block">AstroAdmin</span>
                    </a>
                  </div>
                  {/* End Logo */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your email &amp; password to login
                        </p>
                      </div>
                      <div className="text-center small error-red">{error}</div>
                      <br />
                      <div className="row g-3 needs-validation" noValidate="">
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">
                            Email
                          </label>
                          <div className="input-group has-validation">
                            <input
                              type="text"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                              id="yourUsername"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="yourPassword"
                            required
                          />
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Lost your Password ?{" "}
                            <Link to="/forgot-password">forgot password</Link>
                          </p>
                        </div>
                        {/* <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="remember"
                              defaultValue="true"
                              id="rememberMe"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="rememberMe"
                            >
                              Remember me
                            </label>
                          </div>
                        </div> */}
                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                            onClick={userLogin}
                          >
                            Login
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Don't have account?{" "}
                            <Link to="/singup">Create an account</Link>
                          </p>
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

export default Login;
