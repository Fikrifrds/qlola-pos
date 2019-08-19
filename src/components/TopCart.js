import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListAlt from '@material-ui/icons/ListAlt';
import Badge from '@material-ui/core/Badge';
import Bill from './Bill';
import { withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles(theme => ({
  badge: {
    top: '20%',
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
}))(Badge);

export default function TopCart({ billLength, media }){
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

    return (
        <div className="top-cart">
          <div className="inside-top-cart" style={{ display: 'flex', justifyContent: 'space-between'}}>
            <div className="left">
              <IconButton edge="end" color="inherit">
                <AccountCircle />
              </IconButton>
            </div>
            {/* <div className="center pointer">New Customer</div> */}
            <div className="right" >
              <IconButton edge="end" color="inherit" onClick={handleClickOpen}>
              <StyledBadge badgeContent={billLength} color="primary">
                <ListAlt />
              </StyledBadge>
                
              </IconButton>
              <Bill open={open} setOpen={setOpen} media={media} />
            </div>
          </div>
      </div>
    )
}