import React from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    CardHeader,
    Grid,
    LinearProgress,
    Stack,
    Typography
} from '@mui/material'


function Stats(props)
{
  let {stats, label, pKey, rating} = props;

  return(
    <div>
      {
        stats > 0 &&
        <Stack direction='column'>
          <Stack direction='row' justifyContent='space-between'>
            <Stack direction='row' alignItems='center' spacing={2}>
              <img style={{width:14, height:14}} src={`/assets/icons/${pKey}.webp`}/>

              <Typography sx={{width:120}} >
                {label}
              </Typography>
            </Stack>
            <Typography variant='body2'>{stats}</Typography>
          </Stack>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={rating} />
          </Box>
        </Stack>
      }
    </div>
  )
}

export function PlayerStats(props)
{
  const {selected, statsType} = props;

  return(
    <div>
      {
        selected.length === 0 &&
        <Typography>Please select at least one player to view stats.</Typography>
      }
      {
        selected.length > 0 &&
        <Grid container spacing={2}>
        {
          selected.map((player) => (
            <Grid item xs={3} key={`player-card-${player.player_id}`}>
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
                    Object.keys(statsType).map(key => {
                      const label = statsType[key].label
                      const stats = player[key]
                      const rating = stats/statsType[key].maxValue * 100
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
            </Grid>
          ))
        }
      </Grid>
      }

    </div>
  )
}
