import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.nasa.gov/planetary/apod?api_key=q6ts81N1nnTcUmz3h9d0qarPtZAi4VyiVsDPZLGq"
      )
      .then((resp) => {
        const data = resp.data;

        setPhoto(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <img src={photo} alt="nasa-apod" width="500" height="500"></img>
      <p>
        Read through the instructions in the README.md file to build your NASA
        app! Have fun{" "}
        <span role="img" aria-label="go!">
          🚀
        </span>
        !
      </p>
    </div>
  );
}

export default App;
