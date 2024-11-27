import React , {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Box, Tab, Table, TableBody , TableCell, TableContainer ,TableHead , TableRow } from '@mui/material'
import {TabPanel, TabContext, TabList} from '@mui/lab';
import * as api from './api.js'

function PlayerTable(props)
{
  console.log(props);
  return(
    <TableContainer >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Height</TableCell>
            <TableCell align="right">Weight(kg)</TableCell>
            <TableCell align="right">Team</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.players.map((player) => (
            <TableRow
              key={player.player_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {`${player.first_name} ${player.last_name}`}
              </TableCell>
              <TableCell align="right">{player.position}</TableCell>
              <TableCell align="right">{player.age}</TableCell>
              <TableCell align="right">{player.height_cm}</TableCell>
              <TableCell align="right">{player.weight_kg}</TableCell>
              <TableCell align="right">{player.team}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function App(props) {

  const [tabIndex, setTabIndex] = useState("1");
  // const [players, setPlayers] = useState(props.result | []);// []

  console.log(props.result)
  useEffect(() => {

  }, [])

  const setTab = (e,val) =>{
    setTabIndex(val)
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
          />
        </TabPanel>
        <TabPanel value="2">Player Stats</TabPanel>
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
