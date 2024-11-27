import axios from 'axios'

const baseURL = (typeof(window) !== 'undefined' ? window.location.origin : null) ;


function get(path)
{
    axios.get(baseURL + path).then((res) => {
        return res.data;
    }).catch((error) => {
        throw error;
    })
}

export async function getPlayersInfo()
{
    return get('/player/info/all');
}