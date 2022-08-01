import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Url } from "../../components/BaseUrl";

const EditProfile = (props) => {
  const data=props.data;
  const navigate = useNavigate();
  const inputValue = {
    name: "",
    email: "",
    phoneNo: "",
    address: "",
  };
  const pic="assets/img/profile-img.jpg"
  const pic2="messages-1.jpg"

  const [state,setState]=useState(pic)
  const [pitc,setPitc]=useState(pic)
  const [value, setValue] = useState(inputValue);
  const [errEmail, setErrEmail] = useState("");

  const { name, email, phoneNo, address } = value;

  const onChangeH = (e) => {
    const { name, value } = e.target;
    setValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(()=>{
    setValue(data)
  },[])

  const updateAdminData = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("adminId")
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
      setErrEmail(" ")
      navigate("/myprofile");
      alert("Admin Data Change successfully");
    } else {
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

  const chosePic =()=>{
    setPitc(pic2)
    const src="assets/img/"+pitc
    console.log(src)
    setState(src)
    // changePic()
  }
  console.log(state)

  // const changePic = async () => {
  //   // e.preventDefault();
  //   let token = localStorage.getItem("token");
  //   const id=localStorage.getItem("adminId")
  //   let responce = await fetch(
  //     `${Url}/user/profile`,
  //     {
  //       method: "post",
  //       body: JSON.stringify({id:id,filename:"assets/img/messages-1.jpg"}),
  //       headers: {
  //         // Authorization: `Bearer ${token}`,
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   let result = await responce.json();
  //   console.log(result)
    // if (newresult.success === true) {
    //   alert("inserted successfully");
    //   navigate("/list");
    // } else {
    //   let error = newresult.errors;
    //   if (error.email && error.password) {
    //     const errEmailA = newresult.errors.email.message;
    //     const errPasswordA = newresult.errors.password.message;
    //     setErrEmail(errEmailA);
    //     setErrPassword(errPasswordA);
    //   } else if (error.password) {
    //     const errPasswordA = newresult.errors.password.message;
    //     setErrPassword(errPasswordA);
    //     setErrEmail("")
    //   } else if (error.email) {
    //     const errEmailA = newresult.errors.email.message;
    //     setErrEmail(errEmailA);
    //     setErrPassword("")
    //   }else{
    //     setErrEmail("")
    //     setErrPassword("")
    //   }
    // }
  // };




  return (
    <div>
      <div>
        <div className="row mb-3">
          <label
            htmlFor="profileImage"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Profile Image
          </label>
          <div className="col-md-8 col-lg-9">
            <img src={state} alt="Profile" />
            <div className="pt-2">
              <a
                href="#"
                className="btn btn-primary btn-sm"
                title="Upload new profile image"
                onClick={chosePic}
              >
                <i className="bi bi-upload" />
              </a>
              <a
                href="#"
                className="btn btn-danger btn-sm"
                title="Remove my profile image"
              >
                <i className="bi bi-trash" />
              </a>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="fullName"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Full Name
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="name"
              type="text"
              className="form-control"
              id="fullName"
              value={name}
              onChange={onChangeH}
              // defaultValue="Kevin Anderson"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">
            About
          </label>
          <div className="col-md-8 col-lg-9">
            <textarea
              name="about"
              className="form-control"
              id="about"
              style={{ height: 100 }}
              defaultValue={
                "Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde."
              }
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">
            Email
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="email"
              type="email"
              className="form-control"
              id="company"
              value={email}
              onChange={onChangeH}
              // defaultValue="Lueilwitz, Wisoky and Leuschke"
            />
          </div>
        </div>
    
        <div className="row mb-3">
          <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">
            Address
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="address"
              type="text"
              className="form-control"
              id="Address"
              value={address}
              onChange={onChangeH}
              // defaultValue="A108 Adam Street, New York, NY 535022"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">
            Phone
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="phoneNo"
              type="number"
              className="form-control"
              id="Phone"
              value={phoneNo}
              onChange={onChangeH}
              // defaultValue="(436) 486-3538 x29071"
            />
          </div>
        </div>
        {" "}
        <div className="text-center">
        <div className="feedback error-red">{errEmail}</div>
        </div>
        <br />
        <div className="text-center">
          <button onClick={updateAdminData} className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
