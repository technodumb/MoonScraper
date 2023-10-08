import React from 'react';
import GLBViewer from './MoonViewer';
import './App.scss';
import MoonStuff from './threeStuff/MoonStuff';
import DisplayYear from './Displayyear';
import RoundButton from './RoundButoon';


function App() {
  const [year, setYear] = React.useState(2021);
  return (
    <div className="App">
      <div className='container'>

        <MoonStuff />
        {/* <GLBViewer /> */}
        {/* <DisplayYear year={year} onIncrement={handleIncrement} onDecrement={handleDecrement} /> */}
        <RoundButton />
      </div>
    </div>
  );
}

export default App;
