import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceForm.css";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import useForm from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";

const PLACES = [
  {
    id: "p1",
    title: "Eiffel Tower",
    description: "One of the most famous landmarks in Paris!",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
    address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
    creator: "u1",
    location: { lat: 48.8584, lng: 2.2945 },
  },
  {
    id: "p2",
    title: "Statue of Liberty",
    description: "Iconic symbol of freedom in New York City.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg",
    address: "Liberty Island, New York, NY 10004, United States",
    creator: "u2",
    location: { lat: 40.6892, lng: -74.0445 },
  },
];

export default function UpdatePlace() {
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );

  const identifiedPlace = PLACES.find((p) => p.id === placeId);

  // Load place data into form when identified
  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: { value: identifiedPlace.title, isValid: true },
          description: { value: identifiedPlace.description, isValid: true },
        },
        true
      );
    }
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send updated data later
  };

  // If no place found
  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  // If place found but data not yet loaded
  if (!formState.inputs.title.value) {
    return (
      <div className="center">
        <Card>
          <h2>Loading...</h2>
        </Card>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter at least 5 characters."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
}
