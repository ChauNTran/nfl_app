import React , {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Box,
  Card, CardContent,
  Typography,
  Tab, Table, TableBody , TableCell, TableContainer ,TableHead , TableRow } from '@mui/material'
import {TabPanel, TabContext, TabList} from '@mui/lab';
import * as api from './api.js'

function PlayerTable(props)
{
  return(
    <TableContainer >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow >
            <TableCell>Name</TableCell>
            <TableCell align="center">Position</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Height (cm)</TableCell>
            <TableCell align="center">Weight (kg)</TableCell>
            <TableCell align="right">Team</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.players.map((player) => (
            <TableRow
              hover
              selected={props.selectedPlayer.player_id === player.player_id}
              key={player.player_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={()=> props.selectPlayer(player.player_id)}
            >
              <TableCell component="th" scope="row">
                {`${player.first_name} ${player.last_name}`}
              </TableCell>
              <TableCell align="center">{player.position}</TableCell>
              <TableCell align="center">{player.age}</TableCell>
              <TableCell align="center">{player.height_cm}</TableCell>
              <TableCell align="center">{player.weight_kg}</TableCell>
              <TableCell align="right">{player.team}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function Stats(props)
{
  let stats = props.player[props.pKey];
  return(
    <div>
      {
        stats > 0 &&
        <Typography>
          {props.label}: {stats}
        </Typography>
      }
    </div>
  )
}

function PlayerStats(props)
{
  let player = props.selectedPlayer;

  return(
    <Card >
      <CardContent>
        <Typography variant='h5'>
          {player.first_name} {player.last_name} ({player.position})
        </Typography>
        <Stats player={player} label="Games Played" pKey="games_played"/>
        <Stats player={player} label="Rushing Yards" pKey="rushing_yards"/>
        <Stats player={player} label="Passing Yards" pKey="passing_yards"/>
        <Stats player={player} label="Receiving Yards" pKey="receiving_yards"/>
        <Stats player={player} label="Touch Downs" pKey="touchdowns"/>
        <Stats player={player} label="Tackles" pKey="tackles"/>
        <Stats player={player} label="Sacks" pKey="sacks"/>
        <Stats player={player} label="Interceptions" pKey="interceptions"/>
      </CardContent>
    </Card>
  )
}

function App(props) {

  const [tabIndex, setTabIndex] = useState("1");
  const [selectedPlayer, setselectedPlayer] = useState({});

  useEffect(() => {
    setselectedPlayer(props.result[0]);
  }, [props.result])

  const setTab = (e,val) =>{
    setTabIndex(val)
  }
  const selectPlayer = (id) => {
    let newSelected = props.result.find(x => x.player_id === id);
    setselectedPlayer(newSelected)
  }
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={setTab}>
            <Tab label="Player Info" value="1" />
            <Tab label="Player Stats" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <PlayerTable
            players={props.result}
            selectedPlayer={selectedPlayer}
            selectPlayer={(id)=>selectPlayer(id)}
          />
        </TabPanel>
        <TabPanel value="2">
          <PlayerStats
            selectedPlayer={selectedPlayer}
          />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export function start(props)
{
  const root = ReactDOM.createRoot(document.getElementById('main-container'));
  root.render(
    <React.StrictMode>
      <App {...props}/>
    </React.StrictMode>
  );
}
