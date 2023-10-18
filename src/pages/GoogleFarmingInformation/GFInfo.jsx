import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DataTable from "react-data-table-component";
import io from "socket.io-client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllActivities } from "../../data/redux/reducers/GFInfo.reducer";



let socket = null;
const GFInfo = () => {
  useEffect(() => {
  socket = io('http://localhost:8000');
  },[])
  const option = [
    { value: "1", label: "first" },
    { value: "2", label: "second" },
    { value: "3", label: "3rd" },
  ];
  const [dropVal, setDropVal] = useState(option[0]);
  const [email , setEmail] = useState("");
  const { control, handleSubmit } = useForm();

  const activityData = useSelector(state => state.GFInfo).activityData
  const dispatch = useDispatch();

  const cols = [
    {
      name : "Email",
      selector : row => (
        row.email
      )
    },
    {
      name : "status",
      selector : (row) => row.workFlowStatus
    },
    {
      name : "currentTask",
      cell : (row) => {
        return (
          <div style={{textAlign:"center"}}>{row.currentTask ? row.currentTask : "-"}</div>
        )
      }
    },
    {
      name : "startTime",
      selector : (row) => row.createdAt
    },
    {
      name : "endTime",
      cell : (row) => {
        return (
          <div style={{textAlign:"center"}}>{row.endedAt ? row.endedAt : "-"}</div>
        )
      }
    },
    {
      name : "workFlowName",
      cell : (row) => {
        return (
          <div style={{textAlign:"center"}}>{row.workFlowName ? row.workFlowName : "-"}</div>
        )
      }
    }
  ]

 
  useEffect(() => {
      dispatch(fetchAllActivities());
  },[]);

  //socket.io useeffect 
  useEffect(() => {
    socket.on("updateData", (data) => {
      dispatch(fetchAllActivities());
    })

    return () => {
      socket.disconnect();
    }
  },[]);

  return (
    <div>
      <div className="row justify-content-center mt-3">
       
        <div  className="col-12 col-sm-2">
          {/* <div>Select Workflow :</div> */}
        <Select
          options={option}
          getOptionLabel={(item) => `${item.label}`}
          defaultValue={dropVal}
          onChange={(item) => {
            setDropVal(item);
          }}
        />
        </div>
        <input value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email..." type="text" className="col-sm-2 col-12"/>
        <button onClick={ async () => {
          console.log(process.env.REACT_APP_API_URL);
          try{
         const response =   await axios.post(`${process.env.REACT_APP_API_URL}runAutomationScript`,{
            data : "something"
          })
          console.log(response);
        }catch(err){
          console.log(err);
        }
        }} className="col-1 ms-2">Run</button>
      </div>
      <div className="m-5 " style={{border :"1px solid black"}}>
        <h1 className="mb-3" style={{textAlign:"center"}}>Google Farming Data</h1>
        <hr />
      <DataTable columns={cols} data={activityData}> </DataTable>
      </div>
    </div> 
  );
};

export default GFInfo;
