import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useGlobalContext } from '../context/global';


function Sidebar({rendered}) {
    const {popularAnime, airingAnime} = useGlobalContext()


    
    //Decide which type of the content anime to display
    //And Sort the anime
    const animeType = (rendered==="airing" ? airingAnime : popularAnime);
    
    const sorted = animeType.sort((a,b) => {
        return b.score - a.score
    });

    return (
        <SidebarStyled>
            <h3>{`Top 10 ${rendered==="airing" ? "Airing" : "Popular"}`}</h3>
            <div className="anime">
                {sorted?.slice(0,10).map((anime) => {
                    return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                        <img src={anime.images.jpg.large_image_url} alt="" />
                        <h5>
                            {anime.title}
                        </h5>
                    </Link>
                })}
            </div>
        </SidebarStyled>
    )
}

const SidebarStyled = styled.div`
    margin-top: 2rem;
    background-color: #fff;
    padding-right: 5rem;
    padding-left: 2rem;
    padding-top: 2rem;
    .anime{
        display: flex;
        flex-direction: column;
        width: 150px;
        img{
            width: 100%;
            border-radius: 5px;
            border: 5px solid #e5e7eb;
        }
        a{
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: .4rem;
            color: #27AE60;
            h4{
                font-size: 1.1rem;
            }
        }
    }
`;

export default Sidebar