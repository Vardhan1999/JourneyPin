import PlaceList from "../components/PlaceList";

export default function UserPlaces() {
  const PLACES = [
    {
      id: 'p1',
      title: 'Eiffel Tower',
      description: 'One of the most famous landmarks in Paris!',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg',
      address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
      creator: 'u1',
      location: {
        lat: 48.8584,
        lng: 2.2945
      }
    },
    {
      id: 'p2',
      title: 'Statue of Liberty',
      description: 'Iconic symbol of freedom in New York City.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg',
      address: 'Liberty Island, New York, NY 10004, United States',
      creator: 'u2',
      location: {
        lat: 40.6892,
        lng: -74.0445
      }
    }
  ];

  return <PlaceList items={PLACES} />;
}
