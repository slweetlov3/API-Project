
import AnimeCharacter from './Components/AnimeCharacter';
import AnimeItem from './Components/AnimeItem';
import Homepage from './Components/Homepage';
import Popular from './Components/Popular';
import GlobalStyle from './Globalstyle';
import { useGlobalContext } from './context/global';
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />}/>
        {/* <Route path="/character/:id" element={<AnimeCharacter />} /> */}
      </Routes>
    </BrowserRouter>
    
  );
  
}

export default App
