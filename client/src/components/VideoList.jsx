import React, { useState, useEffect } from "react";
import Video from "./Video";
import "./VideoList.css";
// import Data from "./exampleresponse.json";
import NavBar from "./NavBar";

const VideoList = () => {
      
     const handleAddVideo = (newVideo) => {
          setVideoList((prevVideoList) => [...prevVideoList, newVideo]);
        };

      const [VideoList, setVideoList] = useState([]);
      
      useEffect(() => {
        fetch("http://localhost:5000/videos")
         .then((response) => response.json())
         .then((data) => setVideoList(data))
         .catch((error) => console.log(error));
  }, []);

      const sortedVideoList = [...VideoList].sort(
        (a, b) => b.rating - a.rating
      );

      const handleDeleteVideo = (id) => {
        
        fetch(`http://localhost:5000/videos/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((removedVideo) => {
            
            const updatedVideoList = VideoList.filter(
              (video) => video.id !== removedVideo[0].id
            );
            setVideoList(updatedVideoList);
          })
          .catch((error) => console.log(error));
      };
  return (
    <>
      <NavBar onAddVideo={handleAddVideo} VideoList={VideoList} />

      <div className="VideoList">
        {sortedVideoList.map((video) => (
          <Video
            key={video.id}
            id={video.id}
            title={video.title.trim() || "Untitled"}
            url={video.url}
            rating={video.rating}
            onDelete={handleDeleteVideo}
          />
        ))}
      </div>
    </>
  );
};

export default VideoList;
