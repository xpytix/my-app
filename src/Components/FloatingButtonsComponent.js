import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import './css/FloatingButtonsComponent.css';
import { initPosition } from './MapComponent';

export const FloatingButtonsComponent = (props) => {

    const onClickAdd =(event) =>{
        console.log(event.latlng.lat);
        console.log(event.latlng.lng);
    }
    const onClickRigips = () =>{
         props.setPosition(initPosition)
    }

    const onClickNav = () =>{
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            props.setPosition([position.coords.latitude, position.coords.longitude])

          });
    }
    const onClickZoomIn = () =>{
        props.setZoom(19);
    }
    const onClickZoomOut = () =>{
        props.setZoom(15);
    }

  return (
    <Box className='floatingButtons' sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Fab onClick={onClickZoomIn} disabled={props.zoom=== 15 ? false : true} color="secondary" aria-label="zoom">
        <ZoomInIcon />
      </Fab>
      <Fab onClick={onClickZoomOut} disabled={props.zoom=== 19? false: true} color="secondary" aria-label="zoom">
        <ZoomOutIcon />
      </Fab>
      <Fab onClick={onClickRigips} variant="extended">
        <NavigationIcon sx={{ mr: 1 }} />
        Rigips
      </Fab>
      <Fab onClick={onClickNav} variant="extended">
        <NavigationIcon sx={{ mr: 1 }} />
        Lokalizacja
      </Fab>
    </Box>
  );
}
