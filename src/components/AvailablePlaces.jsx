import { useState, useEffect } from 'react';
import Places from './Places.jsx';


export default function AvailablePlaces({ onSelectPlace }) {

  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    async function fechPlaces() {
      setIsFetching(true);
      const response = await fetch('http://localhost:3000/places');
      console.log("isFetching 1--->", isFetching);
      const resData = await response.json();

      setAvailablePlaces(resData.places);
      setIsFetching(false);
      console.log("isFetching 2--->", isFetching);

    }
    fechPlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      isFetched={isFetching}
      fechingText="Data are being fetched."
    />
  );
}
