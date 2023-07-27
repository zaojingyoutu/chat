import './App.css';
import Select from './page/select';
import Contents from './page/contents';
import CreateChat from './page/createChat';

import React, { useState, useEffect  } from 'react';

export default function App() {
  const [data, setData] = useState([])
  const [uuid, setUuid] = useState();


  useEffect(() => {
    fetch('https://d9wqfr-8001.csb.app/claude/history_conversation')
      .then(res => res.json())
      .then((data) => {setData(data);setUuid(data[0].uuid);})
      .catch(error => console.info(error))
      
  }, [])
  const handleChange  =(e)=>{
    const option = data[e.target.selectedIndex];
    setUuid(option.uuid);
  }
  const creatChange  =(e)=>{
    setUuid(e);
  }

  return (
    <div>
      <Select options={data}  onChange ={handleChange }/>
      <CreateChat options={setData} onChange ={creatChange }></CreateChat>
      <Contents options={uuid} />
    </div>
  )

};