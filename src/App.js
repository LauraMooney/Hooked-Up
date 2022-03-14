import {useEffect, useState} from "react";
import './App.css';
import axios from 'axios';
import Footer from '../src/Footer';


function App() {
    const CLIENT_ID = "bba3ec2f62e54c1bb42af2cc115e73c1"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"


    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")


        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const searchArtists = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })

        setArtists(data.artists.items)
    }

    const renderArtists = () => {
        return artists.map(artist => (
            <div className="artist" key={artist.id} >
                {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                <div className="artistName">    
                    {artist.name}
                    </div>
            
            </div>
        ))
    }
    return (
        <div className="App">
            <header className="App-header">
         
                <h1>Hooked-Up</h1>
                <p>Hooked-up to Spotify so you can search your favourite artist by name</p>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button className="Logout" onClick={logout}>Logout</button>}

                {token ?
                    <form onSubmit={searchArtists}>
                        <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                        <button className="Search" type={"submit"}>Search</button>
                    </form>

                    : <h2>Please login</h2>
                }
               
                {renderArtists()} 
                <Footer />
            </header>
         
        </div>
      
    );
}

export default App;