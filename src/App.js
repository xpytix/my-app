import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { MapComponent } from './Components/MapComponent';
import FloatingButtonsComponent from './Components/FloatingButtonsComponent'
import { db } from './firebaseConfig';

function App() {
  const [places, setPlaces] = useState([]);
  const placesCollectionRef = collection(db, "places");

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      alert("Jezeli chcesz sprawnie korzystać z aplikacji udostępnij lokalizacje :)")
    }
  }, []);

  return (
    <div className="App">
      <MapComponent/>
    </div>
  );
}

export default App;
