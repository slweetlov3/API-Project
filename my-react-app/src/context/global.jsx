import React, {createContext, useContext, useEffect, useReducer, useState} from "react";

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

//actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";

//reducer
const reducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return {...state, loading: true};
        case GET_POPULAR_ANIME: 
            return {...state, loading: false, popularAnime: action.payload};
        case GET_UPCOMING_ANIME:
            return {...state, loading: false, upcomingAnime: action.payload};
        case GET_AIRING_ANIME:
            return {...state, loading:false, airingAnime: action.payload};
        case SEARCH:
            return {...state, loading:false, searchResults: action.payload};
        default:
            return state;
        };
}

export const GlobalContextProvider = ({children}) => {
    //Initial State
    const initialState = {
        popularAnime: [],
        upcomingAnime: [],
        airingAnime: [],
        pictures: [],
        isSearch: false,
        searchResults: [],
        loading: false,
    }

    //use useReducer to dispatch state
    const [state, dispatch] = useReducer(reducer, initialState);
    const [search,setSearch] = useState("");

    
    //Handle the change on the searchbar, with this when we enter nothing, it will automatically back to the page before the search
    const handleChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value==="") {
            state.isSearch = false;
        };
    }
    //Handle search submit event
    const handleSubmit = (e) => {
        e.preventDefault();
        if(search){
            searchAnime(search);
            state.isSearch = true;
        } else {
            state.isSearch = false;
            alert("Please enter a valid search term");
        }
    }

    //fetch popular anime
    const getPopularAnime = async () => {
        dispatch({ type: LOADING });
        const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
        const data = await response.json();
        dispatch({type: GET_POPULAR_ANIME, payload: data.data});
    };

    //fetch upcoming anime
    const getUpcomingAnime = async () => {
        dispatch({ type: LOADING });
        const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
        const data = await response.json();
        dispatch({type: GET_UPCOMING_ANIME, payload: data.data});
    };
    //Fetch airing anime
    const getAiringAnime = async () => {
        dispatch({ type: LOADING });
        const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
        const data = await response.json();
        dispatch({type: GET_AIRING_ANIME, payload: data.data});
    };

    // Search Anime
    const searchAnime = async (query) => {
        dispatch({ type: LOADING });
        const response = await fetch(`${baseUrl}/anime?q=${query}&sort=asc`);
        const data = await response.json();
        dispatch({type: SEARCH, payload: data.data});
    };

     //initial render note: khong nen fetch qua nhieu data, no se bi qua tai va viec truyen du lieu se bi sida.
        useEffect(() => {
                    getPopularAnime();
                }, []);
    return(
         //Fetch the state to work with each individuals properties
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            setSearch,
            handleChange,
            search,
            getAiringAnime,
            getPopularAnime,
            getUpcomingAnime 
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}