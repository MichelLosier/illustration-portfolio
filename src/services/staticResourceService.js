import {http} from './clientHelpers';


class StaticResourceService {
    constructor(){
        this.baseHeaders = new Headers({
            'Content-Type': 'application/json'
        });
    }

    getProjects = () => {
        const request = new Request('/static-data/projects.json', {
            method: 'GET',
            headers: this.baseHeaders,
        })
        return http(request)
    }

    getArtworks = () => {
        const request = new Request('/static-data/artwork.json', {
            method: 'GET',
            headers: this.baseHeaders,
        })
        return http(request)
    }
}

export default StaticResourceService;