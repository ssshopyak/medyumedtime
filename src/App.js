import './App.css';
import Calendar from 'react-calendar'
import { useState, useEffect } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from "./Arrows";
import "./hideScrollbar.css";

function App() {
  const [workers, setWorkers] = useState([])
  useEffect(()=>{
    fetch('https://shevacryptoproxy.herokuapp.com/https://medymed.ru/1c/hs/api/v3/appointment_trainers?start_date=2022-11-22&end_date=2021-11-22&club_id=7a0c5e20-309d-11eb-bbe0-0050568303be',{
      method:'get',
      headers:{
        'Authorization': 'Basic QVBJOkFQSQ==', 
        'apikey': 'dc417d9b-7574-4046-bb7b-240b45407331',
        'Content-Type': 'application/json',
        'usertoken': '87DD135CCEDFAC4479C311D9563B01C4' 
      }, 
    })
    .then((res) => {
      let data = res.json()
      data.then((res)=> {setWorkers(res.data)})
    })
  },[])
  const listItems = workers?.map((worker) =>
    <>
      <div className='WorkersDiv'>
        <img
          src={worker.photo}
          alt='alt' />
        <p className='WorkersText'>{worker.name}</p>
        <p className='WorkersText'>{worker.about}</p>
      </div>
    </>
  );
  return (
    <div className="App">
      <div className="LeftMenu">
        <Calendar/>
      </div>
      <div className='RightMenu'>
        <div className='Buttons'>button</div>
        <div className='Workers'>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
          >
            {listItems}
          </ScrollMenu>
        </div>
        <div className='Time'>graphik</div>
      </div>
    </div>
  );
}

export default App;
