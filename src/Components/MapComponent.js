import React, {useState, useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { FloatingButtonsComponent } from './FloatingButtonsComponent';
import { iconHome, iconApproved, iconQuestion, iconWarning } from './Markers/MarkerCustom';
import { Button,DialogTitle,FormControl,DialogContentText, FormHelperText, Radio, FormControlLabel, RadioGroup, Typography, Box, TextField, Dialog,DialogContent, DialogActions  } from '@mui/material';
import ListFiles from './ListFiles';
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  firestore,
  GeoPoint
} from "firebase/firestore";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';
import { bool } from 'prop-types';
import { async } from '@firebase/util';

export const initPosition = [50.545989, 20.614758]

export const MapComponent = () => {
    
    const [position, setPosition] = useState(initPosition);
    const [zoom, setZoom] = useState(15);
    const [markers, setMarkers] = useState([]);
    const [testmarkers, setTestMarkers] = useState([]);

    // form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [markerPosition, setMarkerPosition] = useState([]);
    const [images, setImages] = useState([]);
    const [correct, setCorrect] = useState("1");
    const [createDate, setCreateDate] = useState(0);

    // firebase
    const markersCollectionRef = collection(db, "markers");
    const storage = getStorage();
    const storageRef = ref(storage, 'markers');
    
    useEffect(() => {

        const getMarker = async () =>{

            const data = await getDocs(markersCollectionRef);
            setTestMarkers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(testmarkers);
        }

        getMarker();
      }, []);


    const createMarker = async () => {

        let geo = new GeoPoint(markerPosition.lat, markerPosition.lng);
        await addDoc(markersCollectionRef, { markerPosition: geo ,title: title, description: description, correct: correct, createDate: createDate});
    
    };

   
    const uploadImage =(nameFolder)=>{
        const isExist = checkIfFileExist(nameFolder);
        console.log(isExist)
        if(images !== null && isExist === false){
            images.map(image =>{
                const imageRef = ref(storage, `${nameFolder}/${image.name + v4()}`)
                uploadBytes(imageRef, image).then(()=>{
                    console.log(image.name + " upload ");
                })
            })
        }
    }

    const checkIfFileExist =(nameFolder) => {
        console.log(nameFolder)
       
    }

    const resetForm =()=>{
        setTitle("");
        setCorrect("1");
        setDescription("");
        setImages([]);
    }

    useEffect(() => {
        resetForm();
      }, []);

    const onChangeImage = event => {

        let arrayFiles = event.target.files;
        if(arrayFiles.lenght !== 0){
              const newFiles = new Array();
            for(let i = 0; i < arrayFiles.length; i++){
                newFiles.push(event.target.files[i])
             }
             setImages(newFiles);
         }      

    };

    // modal
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        resetForm();
        setOpen(false);
    };

    const handleSubmit = () =>{

        let marker ={
            markerPosition,
            title: "",
            description: "",
            images: [],
            correct: "",
            createDate: null,
        }

        marker.markerPosition = markerPosition;
        marker.title = title;
        marker.description = description;
        marker.images = title;

        if(correct === "1")
        {
            marker.correct = iconQuestion;
        }
        else if(correct === "2")
        {
            marker.correct = iconApproved;
        }
        else
            marker.correct = iconWarning;

        setCreateDate(new Date());
        marker.createDate = createDate;


        setMarkers([...markers, marker]);
        createMarker();
        uploadImage(marker.title)
        handleClose();
    }

    const LocationMarker = () =>{

        const map = useMapEvents({
          click(e) {
            handleClickOpen();
            map.setView(e.latlng);
            setMarkerPosition(e.latlng);
            
          }
        })     
    }

  return (
    <>
     {/* Menu */}
     <FloatingButtonsComponent setPosition={setPosition} setZoom={setZoom} zoom={zoom}/>

         <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} >

        <LocationMarker/>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>


        {/* Starter Marker - Location*/}
        <Marker position={position} icon={iconHome}>
        <Popup>
            Cześć! Jesteś tutaj.
        </Popup>
        </Marker>

        {/* Markers from db */}
        {markers.map((element, idx) => 
          <Marker icon={element.correct} key={`marker-${idx}`} position={element.markerPosition}>
          <Popup>
            <h2>{element.title}</h2>
            <p>{element.description}</p>
            
            <ListFiles selectedFile={element.images}/>
       
          </Popup>
        </Marker>

        )}
  </MapContainer>





    {/* MODAL:    Add marker */}
   <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dodaj punkt inwenteryzacji</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Przed dodaniem punktu upewnij się, że jesteś w odpowiednij miejscu i że taki punkt inwenteryzacji nie istnieje. 
          </DialogContentText>

        <FormControl fullWidth>
        
        <TextField error={title ? false : true} required id="name" value={title}  onChange={event => setTitle(event.target.value)} label="Nazwa punktu inwenteryzacji" variant="standard"/>
        <FormHelperText id="name">np. INW-SUSZARNIA BLOCZKI</FormHelperText>

        <TextField error={description ? false : true} required id="description" value={description}  onChange={event => setDescription(event.target.value)} label="Opis punktu inwenteryzacji" variant="standard"/>
        <FormHelperText id="description">np. Jan Kowalski - 10.04.2022 - opis punktu inwenteryzacji </FormHelperText>

        <Button style={{ marginTop: 20 }} variant="contained" component="label"> Dodaj zdjęcie 
            <input type="file" hidden onChange={onChangeImage} accept="image/*" multiple/>
        </Button>

        <Box paddingTop={2}>
            {images.length > 0 ? <ListFiles selectedFile={images} /> : null}
        </Box>
        
        <Box>
      <Typography
        id="demo-controlled-radio-buttons-group"
        level="body3"
        textTransform="uppercase"
        fontWeight="xl"
        sx={{ letterSpacing: '0.15rem' }}
        mb={2}
      >
        Stan
      </Typography>
      <RadioGroup sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="1"
        name="radio-buttons-group">

    <FormControlLabel value="0" onChange={event => setCorrect(event.target.value)} control={<Radio color="secondary" />} label="Nieakceptowwalny" />
    <FormControlLabel value="1"  onChange={event => setCorrect(event.target.value)} control={<Radio />} label="Neutralny" />
    <FormControlLabel  value="2"  onChange={event => setCorrect(event.target.value)} control={<Radio color="success"/>} label="Akceptowalny" />

  </RadioGroup>
    </Box>

        </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} >Anuluj</Button>
          <Button disabled={title && description ? false : true}  onClick={handleSubmit}>Ok</Button>
        </DialogActions>

      </Dialog>

    {/* Edit marker */}

    </>)}


