import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ProjectCard from '../project-card/project-card.component';

class ProjectSelection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedProject: null,
        }
    }
    static propTypes = {
        projects: PropTypes.array,
        category: PropTypes.string,
    }

    handleProjectSelection = (projectId) => {
        this.setState({
            selectedProject: projectId,
        })
    }

    projectCardList = () => {
        const {projects, category} = this.props;
        const {selectedProject} = this.state;
        if(projects.length > 0){
            return projects.map((project) => {
                if(project.category == category){
                    let isSelected = (selectedProject == project._id) 
                    let className = (isSelected) ? 'selected' : '';
                    return( 
                        <li
                            id={project._id}
                            key={project._id}
                            onClick={()=>{this.handleProjectSelection(project._id)}}
                            className={className}
                        >
                            <div className="card-container">
                                <ProjectCard
                                    isSelected={isSelected}
                                    project={project}
                                />
                            </div>
                        </li>
                    )
                }
            })
        }
    }

    render(){
        const {category} = this.props
        return(
            <div className="project-selection">
                <div className="list-container">
                    <ul>
                        {this.projectCardList()}
                    </ul>
                </div>
            </div>
        )
    }
    
}

export default ProjectSelection;