import React from 'react'
import { useGlobalContext } from '../context/global';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import Sidebar from './Sidebar';
function Upcoming({rendered}) {
  const {upcomingAnime, isSearch, searchResults} = useGlobalContext();

  //Rendering base on the condition:
  //If is searching then display the searching anime
  //else display the Up0comings
  const conditionalRender = () => {
    if(!isSearch && rendered==="upcoming"){
      return upcomingAnime.map((anime, count) => {
        return <Link to={`/anime/${anime.mal_id}`} key={count}>
            <img src={anime.images.jpg.large_image_url} alt="" />
        </Link>
      })
    } else {
      return searchResults.map((anime,count) => {
        return <Link to={`/anime/${anime.mal_id}`} key={count}>
            <img src={anime.images.jpg.large_image_url} alt="" />
        </Link>});
    }
      
  }
  return (
    <UpcomingStyled>
        <div className="upcoming-anime">
          {conditionalRender()}
        </div>
        <Sidebar rendered={rendered} />
      </UpcomingStyled>
  )
};

const UpcomingStyled = styled.div`
  display: flex;
  .upcoming-anime{
    margin-top: 2rem;
    padding: 2rem 2.5rem 2rem 2.5rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    background-color: #fff;
    border-top: 5px soli #e5e7eb;
    a{
      height: 500px;
      border-radius: 7px;
      border: 5px  solid #e5e7eb;
    }
    a img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;

    }
  }
`;


export default Upcoming;