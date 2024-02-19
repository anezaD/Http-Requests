import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error_ from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {

  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fechPlaces() {

      setIsFetching(true);
      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();
        // response.ok -- 200 or 300
        // !response.ok -- 400 or 500
        if (!response.ok) {
          throw new Error('Failed to fetch places');
        }

        setAvailablePlaces(resData.places);

      } catch (error) {
        console.log("Error message-->", error.message);
        setError({ message: error.message || 'Could not fetch places, you are kindly asked to wait for a moment' });
      }

      setIsFetching(false);
    }

    fechPlaces();
  }, []);

  if (error) {
    return (<Error_ title={"Something went wrong"} message={error.message} />);
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText={error.message}
      onSelectPlace={onSelectPlace}
      isFetched={isFetching}
      fechingText="Data are being fetched."
    />
  );
}
