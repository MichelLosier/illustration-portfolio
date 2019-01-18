import React from 'react';

import { Route, NavLink } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <div className="nav-bar">
                <ul>
                    <li>
                        <NavLink 
                            className="button hover-border"
                            activeClassName="active"
                            to={`/about`}
                        >about</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className="button hover-border"
                            activeClassName="active"
                            to={`/projects/comics`}
                        >comics</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className="button hover-border"
                            activeClassName="active"
                            to={`/projects/illustration`}
                        >illustration</NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NavBar;