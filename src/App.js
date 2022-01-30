import logo from './logo.svg';
import './App.css';
import { YouMusic } from './comp/youmusic';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1 className='title'><span className='y'>Y</span>our<span className='m'>M</span>usic</h1>
        <YouMusic />
      </header>
    </div>
  );
}

export default App;
