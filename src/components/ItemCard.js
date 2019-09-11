import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { MediaQueryContext } from '../context/MediaQueryContextProvider';
import shorten from '../formula/nameShorten';

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
    fontSize: '11px'
  }
});

export default function ItemCard( { product, onclick }) {
  const mediaContext = useContext(MediaQueryContext);
  const media = mediaContext.media;
  const classes = useStyles();

  return (
    <Grid item key={product._id} xs={6} sm={5} md={3} onClick={onclick} className="pointer">
      <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={product.imgUrl}
        title= {product.description}
      />

        <Typography className={classes.title} gutterBottom>
          {/* { media.isMobileDeviceLanscape ? shorten(product.name, 10) : shorten(product.name, 17)} */}
          {product.name}
        </Typography>

      </Card>
  </Grid>
  );
}