import axios from 'axios'

const baseURL = (typeof(window) !== 'undefined' ? window.location.origin : null) ;

async function get(path)
{
    return await axios.get(baseURL + path).then((res) => {
        return res.data;
    }).catch((error) => {
        throw error;
    })
}

export async function getPlayersInfo()
{
    return await get('/player/info/all');
}
export async function getPlayersStats()
{
    return await get('/player/stats/all');
}
export async function getPlayersProfile()
{
    return await get('/player/profile/all');
}
export async function getProfilesWithPosition(position)
{
    return await get('/player/profile/' + position);
}
