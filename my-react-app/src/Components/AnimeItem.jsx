import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import  styled  from 'styled-components';

function AnimeItem() {
    const {id} = useParams();
    const baseUrl = "https://api.jikan.moe/v4";

    //state
    const [anime, setAnime] = useState({});
    const [characters, setCharacters] = useState([]);
    const [showMore, setShowMore] = useState(false);

    //destructure anime
    const {title, synopsis, trailer,
    duration, aired, season,
    images, rank, score,
    scored_by, popurality,
    status, rating, source} = anime;


    //get anime based on id
    const getAnime = async (animeID) => {
        const response = await fetch(`${baseUrl}/anime/${animeID}`);
        const data = await response.json();
        setAnime(data.data);
    }
    
    //get characters of the anime
    const getCharacters = async (animeID) => {
        const response = await fetch(`${baseUrl}/anime/${animeID}/characters`);
        const data = await response.json();
        setCharacters(data.data);
        console.log(data.data);
    }
    

    useEffect(() => {
        getAnime(id);
        getCharacters(id);
    },[]);
  return (
    <AnimeItemStyled>
        <h1>{title}</h1>
        <div className="details">
            <div className="detail">
                <div className="image">
                    <img src={images?.jpg.large_image_url} alt="" />
                </div>
                <div className="anime-details">
                    <p><span>Aired:</span><span>{aired?.string}</span></p>
                    <p><span>Rating:</span><span>{rating}</span></p>
                    <p><span>Rank:</span><span>{rank}</span></p>
                    <p><span>Score:</span><span>{score}</span></p>
                    <p><span>Scored By:</span><span>{scored_by}</span></p>
                    <p><span>Popularity:</span><span>{popurality}</span></p>
                    <p><span>Status:</span><span>{status}</span></p>
                    <p><span>Source:</span><span>{source}</span></p>
                    <p><span>Season:</span><span>{season}</span></p>
                    <p><span>Duration:</span><span>{duration}</span></p>
                </div>
            </div>

            <p className="description">
                {showMore ? synopsis : synopsis?.substring(0, 450) + "..."}
                <button onClick={()=> {
                    setShowMore(!showMore);
                }}>{showMore ? "Show Less" : "Show More"}</button>
            </p>
        </div>
        <h3 className="title">Trailer</h3>
        <div className="trailer-con">
            {trailer?.embed_url && 
            <iframe src={trailer.embed_url}
            title="Anime Trailer"
            width="800"
            height="450"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
              ></iframe>}
        </div>
        <h3 className="title">Characters</h3>
        <div className="characters">
            {characters?.map((character1, index) => {
                const {role} = character1;
                const {images, name, mal_id} = character1.character;
                return <Link to={`/character/${mal_id}`} key={index}>
                <div className="character">
                    <img src={images?.jpg.image_url} alt="AnimeCharacter" />
                    <h4>{name}</h4>
                    <p>{role}</p>
                </div>
                </Link>
            })}
        </div>

    </AnimeItemStyled>
  )
}

const AnimeItemStyled = styled.div`
    padding: 3rem 18rem;
    background-color: #EDEDED;
    h1{
        display: inline-block;
        font-size: 3rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
        background: linear-gradient( to right, #a855f7, #27AE60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all .4s ease-in-out;
        &:hover{
            transform: skew(-3deg);
        }
    }
    .title {
        display: inline-block;
        margin: 3rem 0;
        font-size: 2rem;
        cursor: pointer;
        background: linear-gradient( to right, #a855f7, #27AE60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .description{
        margin-top: 2rem;
        color: #6c7983;
        line-height: 1.7rem;
        button{
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1rem;
            color: #27AE60;
            font-weight: 600;
        }
    }
    .details{
        background-color: #fff;
        border-radius: 20px;
        padding: 2rem;
        border: 5px solid #e5e7eb;
        .detail{
            display: grid;
        grid-template-columns: repeat(2, 1fr);
        img{
            border-radius: 7px;
        }
        }
        .anime-details{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p{
                display: flex;
                gap: 1rem;
            }
            p span:first-child{
                font-weight: 600;
            }
        }
    }
    .trailer-con{
        display: flex;
        justify-content: center;
        align-items: center;
        iframe{
            outline:none;
            border: 5px solid #e5e7eb;
            padding: 1.5rem;
            border-radius: 10px;
            background-color: #FFFFFF;
        }
    }
    .characters{
        background-color: #fff;
        border-radius: 20px;
        padding: 2rem;
        border: 5px solid #e5e7eb;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 2rem;
        .character{
            padding: .4rem .6rem;
            border-radius: 7px;
            background-color: #EDEDED;
            transition: all .4s ease-in-out;
            img{
            width: 100%;
        }
            h4{
                padding: .5rem 0;
                color: #454e56;
            }
            p{
                color: #18e8d3;
            }
            &:hover{
                transform: translateY(-5px);
                }
        }
    }
`;

export default AnimeItem