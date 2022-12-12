import '../App.css';
import Calendar from 'react-calendar'
import { useState, useEffect } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from "../components/Arrows";
import { DateTime } from "luxon";
import { Button } from '@mui/material';
import leftArrow from '../img/angle-small-left.png'
import rightArrow from '../img/angle-small-right.png'
import menuButton from '../img/menu-burger.png'
import TimeGraph from '../components/TimeGraph';
import "../components/hideScrollbar.css";
import '../components/Calendar.css';

const Date = DateTime.now()

function Graph() {
  const [value, onChange] = useState(Date.toJSDate());
  const [workers, setWorkers] = useState([])
  const [startDate, setStartDate] = useState(Date.toFormat('yyyy-MM-dd'))

  const plusDay = () => {
    const date = DateTime.fromISO(startDate)
    setStartDate(date.plus({days:1}).toFormat('yyyy-MM-dd'))
  }

  const minusDay = () => {
    const date = DateTime.fromISO(startDate)
    setStartDate(date.minus({days:1}).toFormat('yyyy-MM-dd'))
  }

  const toToday = () => {
    const date = DateTime.now()
    setStartDate(date.toFormat('yyyy-MM-dd'))
  }

  const callDay = (clikedDay) => { setStartDate(DateTime.fromJSDate(clikedDay).toFormat('yyyy-MM-dd'))};

  const buttonsSX = {
    color:'#000',
    border: '1px solid #c7c7c7'
  }
  useEffect(()=>{
    fetch('https://corsproxy.io/?' + encodeURIComponent('https://medymed.ru/1c/hs/api/v3/appointment_trainers?start_date='+ startDate +'&end_date='+ startDate +'&club_id=7a0c5e20-309d-11eb-bbe0-0050568303be'),{
      method:'get',
      headers:{
        'Authorization': 'Basic ' + btoa('api:api'),
        'apikey': 'dc417d9b-7574-4046-bb7b-240b45407331',
        'usertoken': '87DD135CCEDFAC4479C311D9563B01C4' 
      }, 
    })
    .then((res) => {
      let data = res.json()
      data.then((res)=> {setWorkers(res.data)})
    })
  },[startDate])

  const listItems = workers?.map((worker) =>
    <>
      <div className='WorkersDiv'>
        <img
          src={worker.photo}
          alt='' />
        <p className='WorkersText'>{worker.name} <br/>{worker.about}</p>
      </div>
    </>
  );

  return (
    <div className="App">
      <div className="LeftMenu">
        <Calendar 
          onChange={onChange}
          onClickDay={callDay}
          value={DateTime.fromISO(startDate).toJSDate()}/>
      </div>
      <div className='RightMenu'>
        <div className='Buttons'>
          <div>
            <Button variant="outlined" sx={buttonsSX}><img src={menuButton}/></Button>
            <Button variant="outlined" sx={buttonsSX} onClick={toToday}>Сегодня</Button>
            <Button variant="outlined" sx={buttonsSX} onClick={minusDay}><img src={leftArrow}/></Button>
            <Button variant="outlined" sx={buttonsSX} onClick={plusDay}><img src={rightArrow}/></Button>
            {DateTime.fromISO(startDate).setLocale('ru').toFormat('dd LLL cccc')}
          </div>
          <div>
            <Button variant="outlined" sx={buttonsSX} >+++</Button>
          </div>
        </div>
        <div className='Workers'>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
          >
            {listItems}
          </ScrollMenu>
        </div>
        <div className='Time'>
          <TimeGraph startDate={startDate}/>
        </div>
      </div>
    </div>
  );
}

export default Graph;
