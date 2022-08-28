import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Url } from "../../Middleware/BaseUrl/BaseUrl";

const SingUP = (props) => {

    useEffect(()=>{
        props.login(true)    
      },[])

  const inputValue = {
    name: "",
    email: "",
    phoneNo: "",
    address: "",
    password: "",
    role:""
  };
  const [value, setValue] = useState(inputValue);
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const { name, email, phoneNo, address, password ,role} = value;

  const navigate = useNavigate();

  const onChangeH = (e) => {
    const { name, value } = e.target;

    setValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");

    let result = await fetch(
      `${Url}/user/register`,
      {
        method: "post",
        body: JSON.stringify({ name, email, address, phoneNo, password,role }),
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    let newresult = await result.json();
    // console.log(newresult.errors)
    if (newresult.success === true) {
      alert("SingUp successfully");
      navigate("/login");
    } else {
      let error = newresult.errors;
      if (error.email && error.password) {
        const errEmailA = newresult.errors.email.message;
        const errPasswordA = newresult.errors.password.message;
        setErrEmail(errEmailA);
        setErrPassword(errPasswordA);
      } else if (error.password) {
        const errPasswordA = newresult.errors.password.message;
        setErrPassword(errPasswordA);
        setErrEmail("")
      } else if (error.email) {
        const errEmailA = newresult.errors.email.message;
        setErrEmail(errEmailA);
        setErrPassword("")
      }else{
        setErrEmail("")
        setErrPassword("")
      }
    }
  };

  return (
  
       <div className="background-dark">
      <main className="main" >
        <div className="container ">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <Link
                      to="/"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src="assets/img/logoA1.png" alt="" />
                      <span className="d-none d-lg-block">DemoAdmin</span>
                    </Link>
                  </div>
                  {/* End Logo */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Create an Account
                        </h5>
                        <p className="text-center small">
                          Enter your personal details to create account
                        </p>
                      </div>
                      <div className="row ">
                        <div className="col-12 margin-top">
                          <label htmlFor="yourName" className="form-label">
                            Your Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            className="form-control"
                            value={name}
                            onChange={onChangeH}
                          />
                          {/* <div className="invalid-feedback">
                          {error.email}
                        </div> */}
                        </div>
                        <div className="col-12 margin-top">
                          <label htmlFor="yourEmail" className="form-label">
                            Your Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            className="form-control"
                            value={email}
                            onChange={onChangeH}
                          />
                          <div className="feedback error-red">{errEmail}</div>
                        </div>
                        <div className="col-12 margin-top">
                          <label htmlFor="yourEmail" className="form-label">
                            Your Adddress
                          </label>
                          <input
                            type="text"
                            name="address"
                            className="form-control"
                            value={address}
                            onChange={onChangeH}
                            required=""
                          />
                          {/* <div className="invalid-feedback">
                          Please enter a valid adddress!
                        </div> */}
                        </div>

                        <div className="col-12 margin-top">
                          <label htmlFor="yourName" className="form-label">
                            PhoneNo
                          </label>
                          <input
                            type="number"
                            name="phoneNo"
                            className="form-control"
                            value={phoneNo}
                            onChange={onChangeH}
                            required=""
                          />
                          {/* <div className="invalid-feedback">
                          Please enter your PhoneNo!
                        </div> */}
                        </div>
                        <div className="col-12 margin-top">
                          <label htmlFor="yourPassword" className="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={password}
                            onChange={onChangeH}
                            required
                          />
                          <div className="feedback error-red">
                            {errPassword}
                          </div>
                        </div>
                        <div className="col-12 margin-top">
                          <label htmlFor="yourName" className="form-label">
                            Role
                          </label>
                          <input
                            type="number"
                            name="phoneNo"
                            className="form-control"
                            value={role}
                            onChange={onChangeH}
                            required
                          />
                          {/* <div className="invalid-feedback">
                          Please enter your PhoneNo!
                        </div> */}
                        </div>
                        <div className="col-12 margin-top">
                          <div className="col-12 margin-top">
                            <button
                            //   onClick={submitHandler}
                              className="btn btn-primary w-100"
                              type="submit"
                            >
                              SingUP
                            </button>
                          </div>
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

export default SingUP;
