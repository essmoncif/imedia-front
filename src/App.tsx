import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PokemonList } from './containers/pokemonList';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path={"/"} element={<PokemonList/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
