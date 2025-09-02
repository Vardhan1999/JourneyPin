import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import PlaceList from "../components/PlaceList";

export default function UserPlaces() {
  const loadedPlaces = useLoaderData();
  const [places, setPlaces] = useState(loadedPlaces);

  const placeDeleteHandler = (deletedPlaceId) => {
    setPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place._id !== deletedPlaceId)
    );
  };

  return <PlaceList items={places} onDeletePlace={placeDeleteHandler} />;
}

export async function loader({ params }) {
  const response = await fetch(`http://localhost:3000/api/places/user/${params.userId}`);

  if (!response.ok) {
    throw new Response('Failed to load places', { status: 500 });
  }

  const data = await response.json();
  return data.places;
}
