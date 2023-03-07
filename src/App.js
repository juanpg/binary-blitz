import './App.css';
import Game from './components/Game';
import Header from './components/Header';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App bg-body container vh-100">
      <Header />
      <Nav />
      <Game />
    </div>
  );
}

export default App;
