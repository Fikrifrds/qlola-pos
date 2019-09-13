import React, { useState } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import { Link } from 'react-router-dom';


const modifiers = [
  {
    _id: '231321fdsf',
    name: 'Dekorasi',
    item: {
      'flower' : { label: 'Flower', price: 5000}, 
      'leaf': { label: 'Leaf', price: 3000}
    }
  },
  {
    _id: '121213fsfds',
    name: 'Topping',
    item:
      {
        'keju' : { label: 'Keju', price: 5000}, 
        'telur': { label: 'Telur', price: 3000}
    }
  }
];

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={clsx(classes.root)}>
      <div className={classes.title}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Typography variant="h6" id="tableTitle">
              Modifier
            </Typography>
            <Link to="/modifiers/new">
            <Fab size="small" color="primary" className={classes.button}>
              <AddIcon />
            </Fab>
            </Link>
          </div>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
          <div style={{ display: 'flex', justifyContent: 'space-around'}}>
          <TextField
            id="standard-search"
            type="search"
            className={classes.textField}
            placeholder="Cari Modifier..."
            value={props.searchField}
            onChange={props.handleChangeSearch}
          />
          </div>
      </div>
    </Toolbar>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

export default function SimpleTable() {
  const classes = useStyles();
  const [searchField, setSearchField] = useState('');
  const [rows, setRows] = useState(modifiers);

  const [data, setData] = useState(modifiers);

  const headCells = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Nama Modifier' },
    { id: 'protein', numeric: false, disablePadding: false, label: 'Pilihan' }
  ];

  function handleChangeSearch(event){
    setSearchField(event.target.value);
    setRows(data.filter( row => row.name.toLowerCase().includes(event.target.value.toLowerCase())));
  }

  return (
    <Paper className={classes.root}>
    <EnhancedTableToolbar
        handleChangeSearch={handleChangeSearch} 
        searchField={searchField} 
         />
         <div className={classes.tableWrapper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
          {headCells
          .map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
              {headCell.label}

          </TableCell>
        ))}
          </TableRow>
        </TableHead>
        <TableBody>
          { rows.length ?
            rows.map(row => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">
                {Object.values(row.item).map( item => item.label ).join(', ')}
              </TableCell>
            </TableRow>
          ))
          :
          <TableRow>
            <TableCell colSpan={headCells.length}>No Data</TableCell>
          </TableRow>
          }
          
        </TableBody>
      </Table>
      </div>
    </Paper>
  );
}