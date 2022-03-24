import './App.css';
import MostPopular from './components/MostPopular';
import MoviesSlider from './components/MoviesSlider';


function App() {
  return (
    <>
      <MostPopular offset={10} />
      <MoviesSlider offset={30} />
    </>
  );
}

export default App;
