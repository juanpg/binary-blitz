import './App.css';
import Game from './components/Game';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App bg-body container vh-100">
      <Header />
      <Nav />
      <Game />
      <Footer />
    </div>
  );
}

export default App;
