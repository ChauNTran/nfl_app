import React , {useMemo} from 'react';
import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel
} from '@mui/material'

const headCells = [
    {
        id: 'first_name',
        align: 'left',
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'position',
        align: 'center',
        disablePadding: false,
        label: 'Position',
    },
    {
        id: 'age',
        align: 'center',
        disablePadding: false,
        label: 'Age',
    },
    {
        id: 'height_cm',
        align: 'center',
        disablePadding: false,
        label: 'Height (cm)',
    },
    {
        id: 'weight_kg',
        align: 'center',
        disablePadding: false,
        label: 'Weight (kg)',
    },
    {
        id: 'team',
        align: 'right',
        disablePadding: false,
        label: 'Team',
    },
];

function EnhancedTableHead(props) {

    const { order, orderBy, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}
  
export function PlayerTable(props)
{
    let {order, orderBy, selected, players} = props;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        props.setOrder(isAsc ? 'desc' : 'asc');
        props.setOrderBy(property);
    };

    const sortedPlayers = useMemo(() =>
        [...players].sort(getComparator(order, orderBy)),
        [order, orderBy, players],
    );

    return(
        <TableContainer >
        <Table sx={{ minWidth: 650 }}>
            <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
            />
            <TableBody>
            {
                sortedPlayers.map((player) => {
                    const isItemSelected = selected.some(x => x.player_id === player.player_id)
                    return(
                        <TableRow
                            hover
                            selected={isItemSelected}
                            key={player.player_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            onClick={()=> props.selectPlayers(player.player_id)}>
                        <TableCell component="th" scope="row">
                            <Checkbox checked={isItemSelected}/>
                            {`${player.first_name} ${player.last_name}`}
                        </TableCell>
                        <TableCell align="center">{player.position}</TableCell>
                        <TableCell align="center">{player.age}</TableCell>
                        <TableCell align="center">{player.height_cm}</TableCell>
                        <TableCell align="center">{player.weight_kg}</TableCell>
                        <TableCell align="right">{player.team}</TableCell>
                    </TableRow>
                    )
                })
            }
            </TableBody>
        </Table>
        </TableContainer>
    )
}
