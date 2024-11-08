
import Popular from './Components/Popular';
import GlobalStyle from './Globalstyle';
import { useGlobalContext } from './context/global';
import { BrowserRouter, Route } from "react-router-dom"

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="/anime/:id" element={<AnimeItem/>}/>
      </Routes>
      <div className="App">
        <Popular />
      </div>
    </BrowserRouter>
    
  );
  
}

export default App
