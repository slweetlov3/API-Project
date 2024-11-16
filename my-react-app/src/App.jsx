import AnimeCharacter from './Components/AnimeCharacter';
import AnimeItem from './Components/AnimeItem';
import Homepage from './Components/Homepage';
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />}/>
        <Route path="/airing" element={<Homepage />} />
        <Route path="/upcoming" element={<Homepage />} />
        <Route path="/popular" element={<Homepage />} />
        <Route path="/character/:id" element={<AnimeCharacter />}/>
      </Routes>
    </BrowserRouter>
    
  );
  
}

export default App
