import React from 'react';
import PropTypes from 'prop-types'

class Image extends React.Component{
    constructor(props){
        super(props)
    }
    static propTypes = {
        url: PropTypes.string,
        altText: PropTypes.string
    }

    render(){
        return(
            <img
                className="image contained"
                src={this.props.url}
                alt={this.props.altText}
            />
        )
    }
}

export default Image;