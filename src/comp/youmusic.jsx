import React, { useState, useEffect } from "react";
import "./youmusic.css";

export function YouMusic() {
  const [VideoId, setVideoId] = useState("");
  const [ErrMsg, setErrMsg] = useState("");
  const [apporve, setApprove] = useState(false);
  const [musicTitle, setTitle] = useState("");
  const [musicLink, setLink] = useState("");
  const [swch, setSwch] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
  }
  function downlaod() {
    if (
      VideoId == undefined ||
      VideoId == "" ||
      VideoId == null ||
      VideoId == "error" ||
      VideoId.length < 11
    ) {
      setErrMsg("Please enter correct URL!");
      setApprove(false);
      setSwch(false);
    } else {
      setErrMsg("");
      setApprove(true);
      setSwch(true);
      if (VideoId.length == 11) {
        setVideoId(VideoId);
      } else if (VideoId.length > 11) {
        setVideoId(getId(VideoId));
      } else {
        setErrMsg("Please enter correct URL!");
      }
    }
  }
  function getId(url) {
    var regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var m = url.match(regExp);

    if (m && m[2].length == 11) {
      return m[2];
    } else {
      return "error";
    }
  }

  useEffect(() => {
    fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${VideoId}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
        "x-rapidapi-key": "39270d77d6msh5382daa75e41059p119a6ejsn6fd1d106428b",
      },
    })
      .then((response) => {
        if(!response.ok){
          throw Error('Server error, try again later.');
        }
        return response.json()})
      .then((data) => {
        setTitle(data.title);
        setLink(data.link);
        setSwch(false);
      })
      .catch( error => {
          setErrMsg(error.message);
      });
  }, [swch]);

  return (
    <div>
      <form onClick={handleSubmit} method="GET">
        <input
          className="urlin"
          placeholder="enter url"
          name="YouName"
          onChange={(e) => setVideoId(e.target.value)}
        />
        <button className="btnsub" onClick={downlaod} type="submit">
          {" "}
          Convert{" "}
        </button>
        <br />
        {ErrMsg ? <p className="error">{ErrMsg}</p> : null}
      </form>
      {apporve && musicTitle && musicLink ? (
        <div>
          <p className="musicTitle">{musicTitle}</p>
          <a href={musicLink}>
            <button id="download-btn" className="download-btn">DOWNLOAD</button>
          </a>
        </div>
      ) : null}
    </div>
  );
}
