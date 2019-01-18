import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Image from '../image/image.component';

class ProjectCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showDetail: false,
        }
    }
    static propTypes = {
        isSelected: PropTypes.bool,
        project: PropTypes.object,
    }

    handleClick = () => {
        this.setState({
            showDetail: true,
        });
    }

    handleMouseLeave = () => {
        this.setState({
            showDetail: false,
        });
    }

    cardDetail = () => {
        const {project} = this.props
        return(
            <div className="project-detail">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <Link
                    to={`/projects/${project._id}`}
                >
                view
                </Link>
            </div>
        )
    }

    render(){
        const {showDetail} = this.state; 
        const {project} = this.props;
        const image = project.featuredImage ? 
            (project.featuredImage.images.previewImage) 
            : (project.gallery[0].images.previewImage);

        return(
            <div
            onClick={this.handleClick}
            onMouseLeave={this.handleMouseLeave}
            className="project-card">
                <Image
                    url={image.url}
                    altText={image.altText}
                />
                {showDetail && this.cardDetail()}
            </div>
        )
    }
}

export default ProjectCard;