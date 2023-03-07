import './App.css';
import Game from './components/Game';
import Header from './components/Header';
import Nav from './components/Nav';
import Help from "./components/Help";
import OverallStats from "./components/OverallStats";

function App() {
  return (
    <div className="App bg-body container vh-100">
      <Header />
      <Nav />
      <Game />
      <Help />
      <OverallStats />
    </div>
  );
}

export default App;
