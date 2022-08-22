import React, { useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./adminPanel/pages/utils/cropImage";
import { useSelector, useDispatch } from "react-redux";
import { updatePic } from "./store/Slice";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function CropImage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cropedPic } = useSelector((state) => ({ ...state.user }));
  // console.log(cropedPic)

  const [image, setImage] = React.useState(null);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [pic, setPic] = React.useState(null);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    setImage(cropedPic);
  };

  useEffect(() => {
    onSelectFile();
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedArea);
      dispatch(updatePic(croppedImage));
      navigate("/myprofile");
    } catch (e) {
      console.error(e);
    }
  }, [image, croppedArea]);

  return (
    <div className="container">
      <div className="container2">
        <div className="container-cropper">
          <div className="cropper">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              objectFit="vertical-cover,horizontal-cover"
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        </div>

        <div className="container-buttons">
          <button
            className="buttons"
            style={{ backgroundColor: "green" }}
            onClick={showCroppedImage}
          >
            SetImage
          </button>
        </div>
      </div>
    </div>
  );
}
