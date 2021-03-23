import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom'
import ImageUploading from 'react-images-uploading';
import { createNewPost } from '../../store/posts';

import './Upload.css'

const Upload = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const [caption, setCaption] = useState('');
  const [vaulted, setVaulted] = useState(false);
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector(state => state.session.user)
  const maxNumber = 1;
  // console.log('image url: ', image[0]?.data_url)
  // console.log('vaulted: ', vaulted)

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log('image: ', imageList, 'addUpdateIndex: ', addUpdateIndex);
    setImage(imageList);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const photoURL = image[0]?.data_url
    // validate the post
    if (!photoURL) {
      setErrors(['Please upload a photo to create your post'])
    }

    // add the post to the database
    const newPost = {
      userId: sessionUser.id,
      photoURL,
      caption,
      vaulted,
    }
    console.log(newPost)
    const res = dispatch(createNewPost(newPost));
    if (res.ok) {
      return <Redirect to="/" />

    }
  }

  const imageDiv = image[0]?.data_url && (
    <div className="image-test">
      <img src={`${image[0].data_url}`} alt="upload" />
      <form onSubmit={handleSubmit}>
        <h3>Add a caption for your post</h3>
        <input 
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={e => setCaption(e.target.value)}
        ></input>
        <label htmlFor="vaulted">Vault my photo</label>
        <input
          type="checkbox"
          name="vaulted"
          checked={vaulted}
          onChange={e => setVaulted(e.target.checked)}
        ></input>
        <ul className='res-form-errors'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <button type="submit">Upload Photo</button>
      </form>
    </div>
  )

  return (
    <div className="upload">
      <h1>Upload a picture to share with friends</h1>
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
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="200" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      {imageDiv}
    </div>
  )
}

export default Upload;
