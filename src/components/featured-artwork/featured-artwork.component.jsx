import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import Image from '../image/image.component';


class FeaturedArtwork extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            featuredArtwork: null
        }
    }

    static propTypes = {
        artworks: PropTypes.array,
        projects: PropTypes.array,
    }

    componentWillMount = () => {
        this.setRandomArtwork(this.props.artworks);
    }

    setRandomArtwork = (artworks) => {
        const index = this.getRandomArtworkIndex(artworks);
        const featuredArtwork = artworks[index];

        this.setState({
            featuredArtwork: featuredArtwork,
        })
    }

    getRandomArtworkIndex = (artworks) => {
        const randomDecimalIndex = Math.random() * artworks.length
        const intIndex = Math.floor(randomDecimalIndex);
        return intIndex;
    }

    getProjectFromArtwork = (artwork) => {
        const {projects} = this.props;
        const index = projects.findIndex((project) => {
            return project._id == artwork.projects[0];
        })
        return projects[index];
    }

    render(){
        const {featuredArtwork} = this.state;
        const assocProject = this.getProjectFromArtwork(featuredArtwork);
        const featuredImage = featuredArtwork.images.largeImage;

        return(
            <div className="featured-artwork">
                <div className="image-container">
                    <Image
                        url={featuredImage.url}
                        altText={featuredImage.altText}
                    />
                </div>
                <div className="featured-information">
                    <p>
                        <span className="caption">
                            {featuredArtwork.caption}
                        </span>
                        {(assocProject.category == "comics") && ` from ${assocProject.name}`}
                    </p>
                </div>
            </div>
        )
    }
}

export default FeaturedArtwork;