import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import styled from "styled-components";

const today = new Date();
const todayFormated = today.toISOString().slice(0, 10);

const Title = styled.h1`
  margin: 0.5rem 0;
  color: goldenrod;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

function DatePicker(props) {
  const { upDate, downDate, currentDate } = props;

  return (
    <div>
      <span>{currentDate}</span>
      <span>
        <IoMdArrowDropup onClick={upDate}></IoMdArrowDropup>
        <IoMdArrowDropdown onClick={downDate}></IoMdArrowDropdown>
      </span>
    </div>
  );
}

function App() {
  const [data, setData] = useState({});
  const [currentDate, setCurrentDate] = useState(todayFormated);
  const APIKEY = "q6ts81N1nnTcUmz3h9d0qarPtZAi4VyiVsDPZLGq";

  const upDate = () => {
    if (currentDate === todayFormated) {
      return;
    }
    today.setDate(today.getDate() + 1);
    setCurrentDate(today.toISOString().slice(0, 10));
  };

  const downDate = () => {
    today.setDate(today.getDate() - 1);
    setCurrentDate(today.toISOString().slice(0, 10));
  };

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=${APIKEY}&date=${currentDate}`
      )
      .then((resp) => {
        const data = resp.data;
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentDate]);

  return (
    <div className="App">
      <Title>NASA Astronomy Picture of the Day</Title>

      <ContentWrapper>
        <section className="explanation-wrapper">
          <p className="explanation">{data.explanation}</p>
        </section>
        <section className="img-wrapper">
          {data.url ? (
            <img src={data.url} alt="nasa-apod"></img>
          ) : (
            <p>Loading...</p>
          )}
          <div style={{ margin: "1rem" }}>
            <p>{data.title}</p>
            <DatePicker
              upDate={upDate}
              downDate={downDate}
              currentDate={currentDate}
            />
          </div>
        </section>
      </ContentWrapper>
    </div>
  );
}

export default App;
