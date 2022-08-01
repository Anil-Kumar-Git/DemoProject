import React, { useState,useEffect } from "react";
import { Url } from "../../components/BaseUrl";
import { useNavigate } from "react-router-dom";

const ChangePassword = (props) => {
  const navigate = useNavigate();
  const [errorOP, setErrorOP] = useState("");
  const [errorNew, setErrorNew] = useState("");
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(()=>{
    props.login(true)    
  },[])

  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const changePassword = async () => {
    const value = {
      newPassword: input.password,
    };
    const token = localStorage.getItem("token");
    let responce = await fetch(`${Url}/user/changePassword`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    let result = await responce.json();
    if (result.success) {
      alert(result.message);
      localStorage.clear();
      navigate("/login");
    } else {
      const error = result.message;
      if (error == "validation error") {
        setTimeout(() => {
          setErrorNew("");
        }, 2500);
        setErrorNew(result.errors.newPassword.message);
      } else {
        setErrorOP(error);
        setTimeout(() => {
          setErrorOP("");
        }, 2500);
      }
      console.log(result.errors.newPassword.message);
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
                    <a
                      href="index.html"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src="assets/img/logoA1.png" alt="" />
                      <span className="d-none d-lg-block">AstroAdmin</span>
                    </a>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Change Password
                        </h5>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">
                          Password
                        </label>
                        <div className="input-group has-validation">
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={input.password}
                            onChange={onInputChange}
                            onBlur={validateInput}
                          />
                        
                        </div>
                      </div>
                      <span className="error-red">{errorNew}</span>
                          {error.password && (
                            <span className="err error-red">
                              {error.password}
                            </span>
                          )}
                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">
                         confirm Password
                        </label>
                        <div className="input-group has-validation">
                          <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            value={input.confirmPassword}
                            onChange={onInputChange}
                            onBlur={validateInput}
                          ></input>
                         
                        </div>
                      </div>
                      {error.confirmPassword && (
                            <span className="err error-red">
                              {error.confirmPassword}
                            </span>
                          )}

                      <div className="text-center">
                        <button
                          type="submit"
                          onClick={changePassword}
                          className="btn btn-primary"
                        >
                          Change Password
                        </button>
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

export default ChangePassword;
