import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import { createNewPost } from "../../store/posts";
import "./Upload.css";
import "../../index.css";

const Upload = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const [caption, setCaption] = useState("");
  const [vaulted, setVaulted] = useState(false);
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const maxNumber = 1;
  // console.log('image url: ', image[0]?.data_url)
  // console.log("vaulted: ", vaulted);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log('image: ', imageList, 'addUpdateIndex: ', addUpdateIndex);
    setImage(imageList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const photoURL = image[0]?.data_url;
    // validate the post
    if (!photoURL) {
      setErrors(["Please upload a photo to create your post"]);
    }

    // add the post to the database
    const newPost = {
      userId: sessionUser.id,
      photoURL,
      caption,
      vaulted,
    };
    const res = dispatch(createNewPost(newPost));

    if (res) {
      return history.push("/");
    }
  };

  const imageDiv = image[0]?.data_url && (
    <div className="image-test">
      {/* <img src={`${image[0].data_url}`} alt="upload" /> */}
      <form onSubmit={handleSubmit}>
        <textarea
          className="captionTextArea"
          placeholder="Your best caption yet!"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <label className="wide" htmlFor="vaulted">Vault my photo</label>
        <input
          className="wide2"
          type="checkbox"
          name="vaulted"
          checked={vaulted}
          onChange={(e) => setVaulted(e.target.checked)}
        ></input>
        <ul className="res-form-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <button className="ultra wide" type="submit">Upload Photo</button>
      </form>
    </div>
  );

  return (
    <div className="upload">
      <div className="uploadTitle"></div>
      <ImageUploading
        multiple
        value={image}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {!image.length && (
              <button
                style={isDragging ? { color: "green" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
                className="clickOrDropButton"
              >
                Click or Drop here
              </button>
            )}
            <img
              src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/signup/en_US/03a5e95dd434e72e5746eae1ee22f0b440c81c79/assets/en_US/assets/divider-download.png"
              alt="divide"
            />
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="500" />
                <div className="image-item__btn-wrapper">
                  <button className="ultra" onClick={() => onImageUpdate(index)}>Update</button>
                  <button className="ultra" onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      {imageDiv}
    </div>
  );
};

export default Upload;
