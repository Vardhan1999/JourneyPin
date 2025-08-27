import { useParams } from "react-router-dom";
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import './PlaceForm.css';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";

const PLACES = [
  {
    id: 'p1',
    title: 'Eiffel Tower',
    description: 'One of the most famous landmarks in Paris!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg',
    address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    creator: 'u1',
    location: { lat: 48.8584, lng: 2.2945 }
  },
  {
    id: 'p2',
    title: 'Statue of Liberty',
    description: 'Iconic symbol of freedom in New York City.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg',
    address: 'Liberty Island, New York, NY 10004, United States',
    creator: 'u2',
    location: { lat: 40.6892, lng: -74.0445 }
  }
];

export default function UpdatePlace() {
  const placeId = useParams().placeId;
  const identifiedPlace = PLACES.find(p => p.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={() => {}}
        initialValue={identifiedPlace.title}
        initialValid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter at least 5 characters."
        onInput={() => {}}
        initialValue={identifiedPlace.description}
        initialValid={true}
      />
      <Button type="submit" disabled={false}>
        UPDATE PLACE
      </Button>
    </form>
  );
}
