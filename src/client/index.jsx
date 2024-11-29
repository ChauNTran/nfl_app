import React , {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Box,
  Card, CardContent, CardMedia, CardHeader,
  Typography, Stack, LinearProgress,
  Tab, Table, TableBody , TableCell, TableContainer ,TableHead , TableRow } from '@mui/material'
import {TabPanel, TabContext, TabList} from '@mui/lab';
import * as api from './api.js'

let statsType =
{
  games_played: {
    label:'Games Played',
    maxValue:0,
    maxPlayer:''
  },
  rushing_yards: {
    label:'Rushing Yards',
    maxValue:0,
    maxPlayer:''
  },
  passing_yards: {
    label:'Passing Yards',
    maxValue:0,
    maxPlayer:''
  },
  receiving_yards: {
    label:'Receiving Yards',
    maxValue:0,
    maxPlayer:''
  },
  touchdowns: {
    label:'Touch Downs',
    maxValue:0,
    maxPlayer:''
  },
  interceptions: {
    label:'Interceptions',
    maxValue:0,
    maxPlayer:''
  },
  tackles: {
    label:'Tackles',
    maxValue:0,
    maxPlayer:''
  },
  sacks: {
    label:'Sacks',
    maxValue:0,
    maxPlayer:''
  },
}

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
  let stats = props.stats;
  return(
    <div>
      {
        stats > 0 &&
        <Stack direction='column'>
          <Stack direction='row' justifyContent='space-between'>
            <Stack direction='row' spacing={2}>
              <Typography sx={{width:120}} >
                {props.label}
              </Typography>
              <img style={{width:14}} src={`/assets/svg-icons/${props.pKey}.svg`}/>
            </Stack>
            <Typography variant='body2'>{stats}</Typography>
          </Stack>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={props.rating} />
          </Box>
        </Stack>
      }
    </div>
  )
}

function PlayerStats(props)
{
  let player = props.selectedPlayer;

  return(
    <Card sx={{ maxWidth: 320, height:480 }}>
      <CardHeader
        title={`${player.first_name} ${player.last_name}`}
        subheader={`${player.team} (${player.position})`}
      >
      </CardHeader>
      <CardMedia
        component="img"
        height="194"
        image={`/assets/mugshots/${player.first_name}${player.last_name}.webp`}
      />
      <CardContent>
        {
          Object.keys(props.statsType).map(key => {
            const label = props.statsType[key].label
            const stats = player[key]
            const rating = stats/props.statsType[key].maxValue * 100
            return (
              <Stats
                key={key}
                pKey={key}
                player={player}
                label={label}
                stats={stats}
                rating={rating}
              />)
          })
        }

      </CardContent>
    </Card>
  )
}


function App() {

  const [tabIndex, setTabIndex] = useState("1");
  const [selectedPlayer, setselectedPlayer] = useState({});
  const [players, setPlayers] = useState([]);

  useEffect(() => {

    const init = async() => {

      let {results} = await api.getPlayersProfile();

      setPlayers(results);
      setselectedPlayer(results[0]);

      // get max stats of each type from the player list
      for(let player of results)
      {
        for (const [key, value] of Object.entries(player)) {
          if(statsType.hasOwnProperty(key) && statsType[key].maxValue < value)
          {
            statsType[key].maxValue = value;
            statsType[key].maxPlayer = player.last_name;
          }
        }
      }

    }

    init();

  }, [])

  const setTab = (e,val) =>{
    setTabIndex(val)
  }
  const selectPlayer = (id) => {
    let newSelected = players.find(x => x.player_id === id);
    setselectedPlayer(newSelected);
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
            players={players}
            selectedPlayer={selectedPlayer}
            selectPlayer={(id)=>selectPlayer(id)}
          />
        </TabPanel>
        <TabPanel value="2">
          <PlayerStats
            statsType={statsType}
            selectedPlayer={selectedPlayer}
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
