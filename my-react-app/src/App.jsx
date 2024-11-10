
import AnimeItem from './Components/AnimeItem';
import Popular from './Components/Popular';
import GlobalStyle from './Globalstyle';
import { useGlobalContext } from './context/global';
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="/anime/:id" element={<AnimeItem />}/>
      </Routes>
    </BrowserRouter>
    
  );
  
}

export default App
