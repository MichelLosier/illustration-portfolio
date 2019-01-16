import React from 'react';
import { Route, Link } from 'react-router-dom'

import NavBar from '../nav-bar/nav-bar.component'
import FeaturedArtwork from '../featured-artwork/featured-artwork.component';

import StaticResourceService from '../../services/staticResourceService';

const staticResourceService = new StaticResourceService();

class Main extends React.Component {
    constructor(){
        super();
        this.state = {
            artworks:[],
            featuredArtworkIndex: null,
        }
    }

    componentDidMount = () =>{
        staticResourceService.getArtworks().then((artworks) => {
            const featuredArtworkIndex = this.pickRandomArtworkIndex(artworks);
            this.setState({
                artworks: artworks,
                featuredArtworkIndex: featuredArtworkIndex,
            })
        })
    }

    pickRandomArtworkIndex = (artworkArray) => {
        const  randomDecimalIndex = Math.random() * artworkArray.length
        const intIndex = Math.floor(randomDecimalIndex);
        return intIndex;
    }

    render(){
        const {artworks, featuredArtworkIndex} = this.state;
        return(
            <div className="main">
                <div className="main-header">
                    <div className="header">
                        <Link to={`/`}>
                            <h1>michel losier</h1>
                        </Link>
                    </div>
                    <NavBar/>
                </div>
                <div className="main-body">
                    <Route
                        exact path="/"
                        render={() => {
                            return(
                                <div>
                                    {(artworks.length > 0) && <FeaturedArtwork artwork={artworks[featuredArtworkIndex]} />}
                                </div>
                            )
                        }}
                    />
                    <Route
                        path="/about"
                        render={null}
                    />
                    <Route
                        path="/projects/:category"
                        render={null}
                    />
                    <Route
                        path="/projects/detail/:id"
                        render={null}
                    />
                </div>
                <div className="main-footer layout-container">
                </div>
            </div>
        )
    }
}

export default Main;