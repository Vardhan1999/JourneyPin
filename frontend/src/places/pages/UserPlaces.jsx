import { useLoaderData } from 'react-router-dom';
import PlaceList from "../components/PlaceList";

export default function UserPlaces() {
  const loadedPlaces = useLoaderData();

  return <PlaceList items={loadedPlaces} />;
}

export async function loader({ params }) {
  const response = await fetch(`http://localhost:3000/api/places/user/${params.userId}`);

  if (!response.ok) {
    throw new Response('Failed to load places', { status: 500 });
  }

  const responseData = await response.json();
  return responseData.places;
}
