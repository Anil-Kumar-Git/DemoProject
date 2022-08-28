import React, { useCallback, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Url } from "../../Middleware/BaseUrl/BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import { updatePic, seletedPic } from "../../Services/store/Slice";
///////////////////////
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../Components/utils/cropImage";

const EditProfile = (props) => {
  const inputRef = useRef();
  const triggerFileSelectPopup = () => inputRef.current.click();

  const data = props.data;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputValue = {
    name: "",
    email: "",
    phoneNo: "",
    address: "",
  };
  const { profilePic } = useSelector((state) => ({ ...state.user }));

  const [value, setValue] = useState(inputValue);
  const [errEmail, setErrEmail] = useState("");
  const [errPic, setErrPic] = useState("");
  //////////////////////////////////
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);

  const { name, email, phoneNo, address } = value;

  const onChangeH = (e) => {
    const { name, value } = e.target;
    setValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setValue(data);
  }, []);

  const updateAdminData = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("adminId");
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
      setErrEmail(" ");
      navigate("/myprofile");
      alert("Admin Data Change successfully");
    } else {
      let errors = result.errors;
      if (result.status == 500) {
        setErrEmail("* email allready exist");
      } else if (errors.email) {
        let ermail = errors.email.message;
        setErrEmail(ermail);
      } else {
        setErrEmail("");
      }
    }
  };

  const choosePic = (event) => {
    if (event.target.files && event.target.files.length > 0) {
    var picture = event.target.files[0];
    const pPic = URL.createObjectURL(picture);
    console.log(pPic, "ppic");
    setImage(pPic);
    setShow(true);
    // dispatch(seletedPic(pPic));
    }
  };

  const removePic = async () => {
    dispatch(updatePic("assets/img/default-Img.png"));
  };

  //////////////////////////

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedArea);
      dispatch(updatePic(croppedImage));
      setShow(false);
      setImage(null);
    } catch (e) {
      console.error(e);
    }
  }, [image, croppedArea]);
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
            <img className="my-img" src={profilePic} alt="Profile" />
            <div className="text-center">
              <div className="feedback error-red">{errPic}</div>
            </div>
            <div className="pt-3 ms-3">
              <input
                style={{ display: "none" }}
                type="file"
                ref={inputRef}
                accept="image/*"
                onChange={choosePic}
              />
              <button
                className="btn btn-primary btn-sm"
                title="Upload new profile image"
                onClick={triggerFileSelectPopup}
                style={{ marginInline: "3px" }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i className=" bi bi-upload" />
              </button>

              <button
                className="btn btn-danger btn-sm"
                title="Remove my profile image"
                onClick={removePic}
              >
                <i className="bi bi-trash" />
              </button>
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
        </div>{" "}
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
      {/* <!-- Modal --> */}
      <div>
        {image? 
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content">
              <div className="modal-header"></div>
              <div className="modal-body" style={{ minHeight: 400 }}>
                <div className="container">
                  <div className="container-cropper">
                    {image ? (
                      <>
                        <div className="cropper">
                          <Cropper
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            // objectFit="vertical-cover"
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                          />
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
         

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={showCroppedImage}
                data-bs-toggle="modal"
                // data-bs-target=""
              >
                SetImage
              </button>
            </div>
            </div>
          </div>
        </div>:""}
      </div>
    </div>
  );
};

export default EditProfile;
