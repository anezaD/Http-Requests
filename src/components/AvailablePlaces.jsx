import { useState, useEffect } from 'react';
import Places from './Places.jsx';


export default function AvailablePlaces({ onSelectPlace }) {

  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    async function fechPlaces() {

      setIsFetching(true);
      try {
        const response = await fetch('http://localhost:3000/placefffffs');
        const resData = await response.json();
        // response.ok -- 200 or 300
        // !response.ok -- 400 or 500


        if (!response.ok) {
          throw new Error('Failed to fetch places');
        }
        setAvailablePlaces(resData.places);
      } catch (error) {

        setError({ message: error.message || 'Could not fetch places, you are kindly asked to wait for a moment' })
      }
      setIsFetching(false);
      console.log("isFetching 2 --->", isFetching);

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
