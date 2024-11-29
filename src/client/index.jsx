import React , {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Box, Tab } from '@mui/material'
import {TabPanel, TabContext, TabList} from '@mui/lab';
import * as api from './api.js'
import {PlayerTable} from './playersTable.jsx'
import {PlayerStats} from './playerStats.jsx'

let statsType =
{
  games_played: {
    label:'Games Played',
    maxValue:0
  },
  rushing_yards: {
    label:'Rushing Yards',
    maxValue:0,
    
  },
  passing_yards: {
    label:'Passing Yards',
    maxValue:0
  },
  receiving_yards: {
    label:'Receiving Yards',
    maxValue:0
  },
  touchdowns: {
    label:'Touch Downs',
    maxValue:0
  },
  interceptions: {
    label:'Interceptions',
    maxValue:0
  },
  tackles: {
    label:'Tackles',
    maxValue:0
  },
  sacks: {
    label:'Sacks',
    maxValue:0
  },
}
function App() {

  const [tabIndex, setTabIndex] = useState("1");
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('first_name');

  useEffect(() => {

    const init = async() => {

      let {results} = await api.getPlayersProfile();

      setPlayers(results);

      // get max stats of each type from the player list
      for(let player of results)
      {
        for (const [key, value] of Object.entries(player)) {
          if(statsType.hasOwnProperty(key) && statsType[key].maxValue < value)
            statsType[key].maxValue = value;
          
        }
      }

    }

    init();

  }, [])

  const setTab = (e,val) =>{
    setTabIndex(val)
  }

  const selectPlayers = (id) => {

    let newSelected = [...selected];
    // if id alredy in selected, remove it
    let removeIndex = newSelected.findIndex(x => x.player_id === id);
    if(removeIndex > -1)
    {
      newSelected.splice(removeIndex, 1);
    }
    else{
      let player = players.find(x => x.player_id === id);
      // otherwise add it
      newSelected.push(player);
    }
    setSelected(newSelected)
  }
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',
          position: 'sticky', top:0, backgroundColor:'white', zIndex:1}}>
          <TabList onChange={setTab}>
            <Tab label="Player Data" value="1" />
            <Tab label="Player Stats" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <PlayerTable
            players={players}
            selected={selected}
            order={order}
            orderBy={orderBy}
            selectPlayers={selectPlayers}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            setSelected={setSelected}
          />
        </TabPanel>
        <TabPanel value="2">
          <PlayerStats
            statsType={statsType}
            selected={selected}
          />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export function start()
{
  const root = ReactDOM.createRoot(document.getElementById('main-container'));
  root.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  );
}
