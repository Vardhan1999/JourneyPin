import { useContext } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import './PlaceForm.css';
import useForm from '../../shared/hooks/form-hook';
import { Form, redirect, useNavigation } from 'react-router-dom';
import AuthContext from '../../shared/store/AuthContext';

export default function NewPlace() {
  const authContext = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      title: { value: '', isValid: false },
      address: { value: '', isValid: false },
      description: { value: '', isValid: false }
    },
    false
  );

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form className="place-form" method="post">
      <input type="hidden" name="creator" value={authContext.userId} />

      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter at least 5 characters."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid || isSubmitting}>
        {isSubmitting ? 'Adding...' : 'ADD PLACE'}
      </Button>
    </Form>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  const placeData = {
    title: formData.get('title'),
    address: formData.get('address'),
    description: formData.get('description'),
    creator: formData.get('creator')
  };

  const response = await fetch('http://localhost:3000/api/places', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(placeData),
  });

  if (!response.ok) {
    throw new Response('Failed to create place', { status: 500 });
  }

  return redirect('/');
}
