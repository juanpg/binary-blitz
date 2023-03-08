import './App.css';
import Game from './components/Game';
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App bg-body-tertiary">
      <div className='bg-body container-md'>
        <Nav />
        <Game />
        <Footer />
      </div>
    </div>
  );
}

export default App;
