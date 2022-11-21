import './App.css';
import Calendar from 'react-calendar'

function App() {
  return (
    <div className="App">
      <div className="LeftMenu">
        <Calendar/>
      </div>
      <div className='RightMenu'>
        <div className='Buttons'>button</div>
        <div className='Workers'>workers</div>
        <div className='Time'>graphik</div>
      </div>
    </div>
  );
}

export default App;
