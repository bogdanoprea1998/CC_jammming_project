const clientID = '0c6f6f9bf82e4034baed57b7a12cb000';
const redirectURI = 'http://localhost:3000/';

let accessToken;

const Spotify = {
    getAccesToken(){
        if(accessToken){
            return accessToken;
        }

        // check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // this clears the parameters, allowing us to grab a new access token when expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            let accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
    },

    search(term){
        const accessToken = Spotify.getAccesToken();

        return fetch(
            `https://api.spotify.com/v1/search?type=track&q=${term}`, 
            { headers: { Authorization: `Bearer ${accessToken}` } })
        .then(response => response.json())
        .then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            )});
        });
    }
}

export default Spotify;