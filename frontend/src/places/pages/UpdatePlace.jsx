import { useEffect } from "react";
import { Form, useLoaderData, useNavigation, redirect } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceForm.css";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import useForm from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";

export async function loader({ params }) {
  const response = await fetch(`http://localhost:3000/api/places/${params.placeId}`);
  if (!response.ok) {
    throw new Response("Could not fetch place", { status: 500 });
  }
  const data = await response.json();
  return data.place;
}

export async function action({ request, params }) {
  const formData = await request.formData();

  const updatePlace = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  const response = await fetch(`http://localhost:3000/api/places/${params.placeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatePlace),
  });

  if (!response.ok) {
    throw new Response("Failed to update place.", { status: 500 });
  }

  const updatedData = await response.json();
  return redirect(`/${updatedData.place.creator}/places`);
}

export default function UpdatePlace() {
  const place = useLoaderData();
  const navigation = useNavigation();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );

  useEffect(() => {
    if (place) {
      setFormData(
        {
          title: { value: place.title, isValid: true },
          description: { value: place.description, isValid: true },
        },
        true
      );
    }
  }, [setFormData, place]);

  if (!place) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

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
    <Form method="patch" className="place-form">
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
      <Button type="submit" disabled={!formState.isValid || navigation.state === "submitting"}>
        {navigation.state === "submitting" ? "Updating..." : "UPDATE PLACE"}
      </Button>
    </Form>
  );
}
