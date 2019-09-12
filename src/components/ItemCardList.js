import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    cursor: 'pointer'
  }
}));

export default function ItemCardList({ product, onclick }) {
  const classes = useStyles();

  return (
    <List className={classes.root} onClick={onclick}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <img width="50px" alt={product.name} src={product.imgUrl} />
        </ListItemAvatar>
        <ListItemText style={{ padding: '10px 5px 5px 5px' }}><small>{product.name}</small></ListItemText>
        <ListItemSecondaryAction>
          { product.hasVariant ? Object.keys(product.variant).length + ' harga' : 'Rp ' +  product.price.toLocaleString('id')}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}