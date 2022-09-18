import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Container } from '@mui/material';

const ListFiles = (props) => {

    let file = props.selectedFile;
    
    const Image = () => file.map(e=>{ 
        return <img key={e} style={{padding: 5}} src={e} width="100" height="100"></img>
       
    })
  
        return (
            <Container>
                <ImageList variant="masonry" cols={3} gap={8}>
                    <ImageListItem id='file'
                            sx={{
                                display:"flex",
                            width:"100px",
                            height:"100px"}}>
                                <Image/>
                    </ImageListItem>
    
                </ImageList>
            </Container>
        )
   
  
}

export default ListFiles