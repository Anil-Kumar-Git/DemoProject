import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Url } from "../Middleware/BaseUrl/BaseUrl";
import { useSelector } from "react-redux";

const EditUser = () => {
  const navigate = useNavigate();
  const inputValue = {
    name: "",
    email: "",
    phoneNo: "",
    address: "",
    password: "",
  };
  const [value, setValue] = useState(inputValue);
  const [errEmail, setErrEmail] = useState("");
  const {editData}=useSelector((state)=>({...state.user}))
  // console.log(editData)
  const { name, email, phoneNo, address } = value;

  const onChangeH = (e) => {
    const { name, value } = e.target;
    // console.log(e);
    setValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(()=>{
    upData(editData);
  },[])

  // const userEdit = async () => {
  //   const id = editData._id;
  //   const token = localStorage.getItem("token");
  //   let responce = await fetch(`${Url}/user/getSingleUser/${id}`, {
  //     method: "get",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const result = await responce.json();
  //   const data = result.data;
  //   upData(data);
  // };

  const upData = (data) => {
    const ndata = data;
    // console.log(ndata, "result");
    const item = {
      name: ndata.name,
      email: ndata.email,
      address: ndata.address,
      phoneNo: ndata.phoneNo,
    };
    setValue(item);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    const id = editData._id;
    let token = localStorage.getItem("token");
    let responce = await fetch(`${Url}/user/updateUser/${id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    let result = await responce.json();
    if (result.success === true) {
      alert("Update successfully");
      navigate("/list");
    } else {
        // console.log(result)
      let errors = result.errors;
      if(result.status==500){
        setErrEmail("* email allready exist")
      } 
      else if(errors.email) {
        let ermail=errors.email.message
        setErrEmail(ermail)
      }else{
        setErrEmail("")
      }
    }
  };

  return (
    <div className="background-dark">
      <main className="main" id="main">
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
                          Edit User
                        </h5>
                      </div>
                      <div className="feedback error-red">{errEmail}</div>
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
                          <div className="col-12 margin-top">
                            <button
                              onClick={updateHandler}
                              className="btn btn-primary w-100"
                              type="submit"
                            >
                              Update
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

export default EditUser;
