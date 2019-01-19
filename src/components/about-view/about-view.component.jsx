import React from 'react';
import PropTypes from 'prop-types'

class AboutView extends React.Component{
    constructor(props){
        super(props);
    }

    static propTypes = {
        //received as base64
        content: PropTypes.string,
    }

    render(){
        return(
            <div className="about-view">
                <div className="about-content">
                    {atob(this.props.content)}
                </div>
            </div>
        )
    }
}

export default AboutView;