const postgres = require('postgres');

const sql = postgres({
    host: 'interview-nfl.cdbhjddhnyl2.us-east-1.rds.amazonaws.com', //process.env.DB_HOST,
    database:'nfl_stats',
    port: 5432, //process.env.DB_PORT,
    password: 'Summit123', //process.env.DB_PASS,
    username: 'postgres',//process.env.DB_USER
    ssl:{ rejectUnauthorized: false },
})

let db={};
db.getPlayers = async function () {

    const results = await sql`
    SELECT *
    FROM players
    `
    return results;
}

db.getStats = async function () {
    const results = await sql`
    SELECT *
    FROM player_stats
    `
    return results;
}

db.getProfiles = async function () {
    const results = await sql`
    SELECT players.*, player_stats.*
    FROM players
    FULL OUTER JOIN player_stats
    ON players.player_id = player_stats.player_id
    `
    return results;
}

module.exports = db