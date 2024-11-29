import axios from 'axios'

const baseURL = (typeof(window) !== 'undefined' ? window.location.origin : null) ;


async function get(path)
{
    await axios.get(baseURL + path).then((res) => {
        console.log(res)
        return res.data;
    }).catch((error) => {
        throw error;
    })
}

export async function getPlayersInfo()
{
    // return get('/player/info/all');
    return await get('/player/info/all');
}
export async function getPlayersStats()
{
    return get('/player/stats/all');
}
export async function getPlayersProfile()
{
    return get('/player/profile/all');
}