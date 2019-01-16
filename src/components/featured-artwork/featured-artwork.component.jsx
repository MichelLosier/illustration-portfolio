import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import Image from '../image/image.component';


class FeaturedArtwork extends React.Component {
    constructor(){
        super();
    }

    static propTypes = {
        artwork: PropTypes.object
    }

    render(){
        const {artwork} = this.props;
        const featuredImage = artwork.images.largeImage;

        return(
            <div className="featured-artwork">
                <div className="image-container">
                    <Image
                        url={featuredImage.url}
                        altText={featuredImage.altText}
                    />
                </div>
                <div className="featured-information">
                    <p className="caption">{artwork.caption}</p>
                </div>
            </div>
        )
    }
}

export default FeaturedArtwork;