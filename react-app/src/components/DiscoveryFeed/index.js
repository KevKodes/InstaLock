import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
// const mode = process.env.NODE_ENV;
// const apiKey = process.env.ACCESS_KEY;

const photosApi = createApi({
  accessKey: "az_UO2AxnG4t9EGPDqXAGshoAUSKG-a83fAF9BpulZo",
});

const FetchingPhoto = ({ photo }) => {
  const { urls, user } = photo;

  return (
    <>
      <img src={urls.regular} alt="photos" />
      <div>{user.name}</div>
    </>
  );
};

const DiscoveryFeed = () => {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    photosApi.photos
      .list({ order_by: "popular" })
      .then((result) => {
        setPhotos(result);
      })
      .catch(() => {
        console.log("Error! Try again!");
      });
  }, []);

  if (photos === null) {
    return <div>Please wait..</div>;
  } else {
    return (
      <div>
        <ul>
          {photos.response.results.map((photo) => (
            <li key={photo.id}>
              <FetchingPhoto photo={photo} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default DiscoveryFeed;
