import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/global';
import Popular from './Popular';
import { styled } from 'styled-components';
import Airing from './Airing';
import Upcoming from './Upcoming';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

function Homepage() {

  //Fetching states from the globalcontext:
  //handleSubmit for the
  const {
    handleSubmit,
    search,
    handleChange,
    getUpcomingAnime,
    getAiringAnime,
  } = useGlobalContext();

  const [rendered, setRendered] = useState(
    localStorage.getItem("rendered") || "popular"
  );
  //Ensure the nagivation
  const navigate = useNavigate();
  //Same on the ensure the navigation
  const location = useLocation();

  //This will make sure that you render the correct page, decide
  //on the button on the navigation bar
  const switchComponent = () => {
    switch (rendered) {
      case "popular":
        return <Popular rendered={rendered} />;
      case "airing":
        return <Airing rendered={rendered} />;
      case "upcoming":
        return <Upcoming rendered={rendered} />;
      default:
        return <Popular rendered={rendered} />;
    }
  };
  //Handle the navigation, even if you go to the another page
  //when you go back, the URL still is the one that you left last time (sorry for bad English)
  //Also it handle the setRendered and,...
  const handleNavigation = (type) => {
    setRendered(type);
    navigate(`/${type}`); // Thay đổi URL
    if (type === "airing") getAiringAnime();
    if (type === "upcoming") getUpcomingAnime();
  };


  //This will keep making sure that the contents in the page will match with the URL.
  //Even if you go straight to some page
  useEffect(() => {
    const path = location.pathname.replace("/","");
    if (path === "popular" || path === "airing" || path == "upcoming") {
      handleNavigation(path);
    };
    localStorage.setItem("rendered", rendered);
  }, [location.pathname]);

  return (
    <HomepageStyled>
      <header>
        <div className="logo">
          <h1>
            {rendered === "popular"
              ? "Popular Anime"
              : rendered === "airing"
              ? "Airing Anime"
              : "Upcoming Anime"}
          </h1>
        </div>
        <div className="search-container">
          <div className="filter-btn popular-filter">
            <button onClick={() => handleNavigation("popular")}>Popular</button>
          </div>
          {/* Note: Can't use render to render the search results anime here for some reasons */}
          <form action="" className="seach-form" onSubmit={handleSubmit}>
            <div className="input-control">
              <input
                type="text"
                placeholder="Search Anime"
                value={search}
                onChange={handleChange}
              />
              <button type="submit">Search</button>
            </div>
          </form>
          <div className="filter-btn airing-filter">
            <button onClick={() => handleNavigation("airing")}>Airing</button>
          </div>
          <div className="filter-btn upcoming-filter">
            <button onClick={() => handleNavigation("upcoming")}>Upcoming</button>
          </div>
        </div>
      </header>
      <div className="main-content">
      {switchComponent()}
      </div>
      
    </HomepageStyled>
  );
}





const HomepageStyled = styled.div`
    background-color: #EDEDED;
    header{
        padding: 2rem 5rem;
        width: 60%;
        margin: 0 auto;
        transition: all .4s ease-in-out;
        @media screen and (max-width:1530px){
            width: 95%;
        }
        .logo{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
        }
        .search-container{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            button{
                display: flex;
                align-items: center;
                gap: .5rem;
                padding: .7rem 1.5rem;
                outline: none;
                border-radius: 30px;
                font-size: 1.2rem;
                background-color: #fff;
                cursor: pointer;
                transition: all .4s ease-in-out;
                font-family: inherit;
                border: 5px solid #e5e7eb;
            }
            form{
                position: relative;
                width: 100%;
                .input-control{
                    position: relative;
                    transition: all .4s ease-in-out;
                }
                .input-control input{
                    width: 100%;
                    padding:.7rem 1rem;
                    border: none;
                    outline: none;
                    border-radius: 30px;
                    font-size: 1.2rem;
                    background-color: #fff;
                    border: 5px solid #e5e7eb;
                    transition: all .4s ease-in-out;
                }
                .input-control button{
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
`

export default Homepage;