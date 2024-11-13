import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function AnimeCharacter() {
    const {id} = useParams(); //Take the character id from the html
    const baseUrl = "https://api.jikan.moe/v4"
    
    const [character, setCharacter] = useState();

    //Get the character infos based on the id
    const getCharacter = async (charID) => {
        const response = await fetch(`${baseUrl}/characters/${charID}`);
        const data = await response.json();
        setCharacter(data.data);
        console.log(data.data);
    }

    useEffect(()=>{
        getCharacter(id);
    },[])
  return (
    <div>AnimeCharacter</div>
  )
}

export default AnimeCharacter;