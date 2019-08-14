import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card: {
    maxWidth: 200,
  },
  media: {
    height: 100,
    width: 200
  },
  title : {
    textAlign: 'center',
    padding: '5px',
    fontSize: '12px',
    fontWeight: 'bold'
  }
});

export default function ItemCard( { product, onclick }) {
  const classes = useStyles();

  return (
    <Grid item key={product._id} xs={6} sm={4} md={3} onClick={onclick} className="pointer">
      <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={product.imgUrl}
        title= {product.description}
      />

        <Typography className={classes.title} gutterBottom>
          {product.name}
        </Typography>

      </Card>
  </Grid>
  );
}