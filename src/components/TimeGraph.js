import React, { useEffect, useState } from "react";
import TimeTable from "react-timetable-events";
import { DateTime } from "luxon";
import "./TimeGraph.css";

const TimeGraph = ({startDate = '2022-12-10'}) => {
  const [workersTime, setWorkersTime] = useState([])
  const [isworkersLoaded, setIsWorkersLoaded] = useState(false)
  let TimeWorkerDate = workersTime.map((e) => ({
    id:e.DataNachala,
    name:e.Nomenklatura,
    type:"custom",
    startTime:DateTime.fromISO(e.DataNachala.slice(0,6) + 'T' + e.DataNachala.slice(8)).toJSDate(),
    endTime:DateTime.fromISO(e.DataOkonchaniya.slice(0,6) + 'T' + e.DataOkonchaniya.slice(8)).toJSDate(),
  }))
  console.log(TimeWorkerDate)
  console.log(isworkersLoaded)
  console.log(workersTime.length)
  useEffect(()=>{
    fetch('https://corsproxy.io/?' + encodeURIComponent('https://medymed.ru/1c/hs/appservice/PoluchitSpisokZapisejPolzovatelya'),{
      method:'post',
      headers:{
        'Authorization': 'Basic ' + btoa('api:api'),
        'apikey': 'dc417d9b-7574-4046-bb7b-240b45407331',
        'usertoken': '87DD135CCEDFAC4479C311D9563B01C4' 
      },
      body:JSON.stringify({
        "DataZapisej": DateTime.fromISO(startDate).toFormat("yyyyMMdd"),
        "KodSotrudnika": "000000193"
      })
    })
    .then((res) => {
      let data = res.json()
      data.then((res)=> {setWorkersTime(res);setIsWorkersLoaded(true)})
    })
  },[startDate])
  
  if(isworkersLoaded && TimeWorkerDate.length > 0) {
    return (
      <TimeTable
      timeLabel="Machines"
      //renderEvent={renderEvent}
      events={{
        "x": TimeWorkerDate,
        "y": [],
        "z": [],
      }}
      hoursInterval={{ from: 7, to: 24 }}
    />
  );
  }
};

export default TimeGraph;
