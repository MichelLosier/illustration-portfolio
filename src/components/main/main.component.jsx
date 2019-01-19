import React from 'react';
import { Route, Link } from 'react-router-dom'

import NavBar from '../nav-bar/nav-bar.component'
import FeaturedArtwork from '../featured-artwork/featured-artwork.component';
import ProjectSelection from '../project-selection/project-selection.component';
import ProjectDetail from '../project-detail/project-detail.component';
import AboutView from '../about-view/about-view.component';

import StaticResourceService from '../../services/staticResourceService';

const staticResourceService = new StaticResourceService();

class Main extends React.Component {
    constructor(){
        super();
        this.state = {
            artworks:[],
            projects:[],
            configuration: null,
        }
    }

    componentWillMount = () =>{
        this.fetchStaticData().then((staticData) => {

            this.setState({
                artworks: staticData.artworks,
                projects: staticData.projects,
                configuration: staticData.configuration,
            })
        })
    }


    fetchStaticData = () => {
        return Promise.all([
            staticResourceService.getArtworks(),
            staticResourceService.getProjects(),
            staticResourceService.getConfiguration(),
        ]).then((data) => {
            return {
                artworks: data[0],
                projects: data[1],
                configuration: data[2],
            }
        })
    }

    getProjectFromId = (projects, id) => {
        const index = projects.findIndex((project) => {
            return project._id == id
        })
        return projects[index];
    }


    render(){
        const {artworks, projects, configuration} = this.state;
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
                                    {(artworks.length > 0 && projects.length > 0) &&
                                        <FeaturedArtwork 
                                            artworks={artworks}
                                            projects={projects}
                                        />
                                    }
                                </div>
                            )
                        }}
                    />
                    <Route
                        path="/about"
                        render={() => {
                            return(
                                <div>
                                {configuration &&
                                    <AboutView
                                    content={configuration.about}
                                    />
                                }
                                </div>
                            )
                        }}
                    />
                    <Route
                        exact={true}
                        path="/projects/:category"
                        render={({match}) => {
                            return(<ProjectSelection
                                projects={projects}
                                category={match.params.category}
                            />)
                        }}
                    />
                    <Route
                        path="/projects/:category/:_id"
                        render={({match}) => {
                            const project = this.getProjectFromId(projects, match.params._id);
                            return(
                                <div>
                                {projects.length > 0 && <ProjectDetail
                                    project={project}
                                />}
                                </div>
                            )

                        }}
                    />
                </div>
                <div className="main-footer layout-container">
                    Art and Site Design &copy; {new Date().getFullYear()} Michel Losier
                </div>
            </div>
        )
    }
}

export default Main;