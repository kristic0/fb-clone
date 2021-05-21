
import './App.css';
import Feed from './Components/Feed';

import Sidebar from './Components/Sidebar';


function App() {
  return (
    <div className="App">
      <div className='app__body' >
       <Sidebar />
       
       <Feed />
       
       
       
      </div>
    </div>
  );
}

export default App;
