import "./App.css";
import Select from "./page/select";
import Contents from "./page/contents";
import CreateChat from "./page/createChat";
import React, { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [uuid, setUuid] = useState();
  const [chatName, setchatName] = useState();

  useEffect(() => {
    fetch("https://d9wqfr-8000.csb.app/claude/get_conversation")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setUuid(data[0].uuid)
        setchatName(data[0].name);
      })
      .catch((error) => console.info(error));
  }, []);
  const handleChange = (e) => {
    const option = data[e.target.selectedIndex];
    setUuid(option.uuid);
    setchatName(e.target.value);
  };
  const creatChange = (e) => {
    setUuid(e);
  };
  const creatNameChange = (e) => {
    setchatName(e);
  };

  return (
    <div style={{background:'#efede6',height:'100vh'}}>        <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>claude2</h2>
      <Select options={data} value={chatName} onChange={handleChange} />
      <CreateChat options={setData} onChange={creatChange} onNameChange={creatNameChange}></CreateChat>
      <Contents options={uuid} />
    </div>
  );
}
