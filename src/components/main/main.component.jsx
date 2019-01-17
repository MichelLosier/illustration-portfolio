import React from 'react';
import { Route, Link } from 'react-router-dom'

import NavBar from '../nav-bar/nav-bar.component'
import FeaturedArtwork from '../featured-artwork/featured-artwork.component';
import ProjectSelection from '../project-selection/project-selection.component';

import StaticResourceService from '../../services/staticResourceService';

const staticResourceService = new StaticResourceService();

class Main extends React.Component {
    constructor(){
        super();
        this.state = {
            artworks:[],
            projects:[],
        }
    }

    componentWillMount = () =>{
        this.fetchStaticData().then((staticData) => {

            this.setState({
                artworks: staticData.artworks,
                projects: staticData.projects,
            })
        })
    }

    fetchStaticData = () => {
        return new Promise((resolve, reject) => {
            const staticData = {
                artworks:[],
                projects:[],
            }

            staticResourceService.getArtworks().then((artworks) => {
                staticData.artworks = artworks;
                return staticResourceService.getProjects();
            }).then((projects) => {
                staticData.projects = projects;
                resolve(staticData);
            }).catch((err) => {
                reject(err);
            })
        })
    }


    render(){
        const {artworks, projects, selectedProject} = this.state;
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
                        render={null}
                    />
                    <Route
                        path="/projects/:category"
                        render={({match}) => {
                            return(<ProjectSelection
                                projects={projects}
                                category={match.params.category}
                            />)
                        }}
                    />
                    <Route
                        path="/projects/:id"
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