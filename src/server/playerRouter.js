const express = require('express');
const router = express.Router();
const db = require ('./db.js')

router.get('/info/all', async (req, res) => {

    let results = await db.getPlayers();
    res.send({responseType: 'success', results})

});

router.get('/stats/all', async (req, res) => {

    let results = await db.getStats();
    res.send({responseType: 'success', results})

});

router.get('/profile/all', async (req, res) => {

    let results = await db.getProfiles();
    res.send({responseType: 'success', results})

});


module.exports = router;