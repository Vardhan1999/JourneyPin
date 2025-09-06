import { useContext } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import './PlaceForm.css';
import useForm from '../../shared/hooks/form-hook';
import { Form, redirect, useNavigation } from 'react-router-dom';
import AuthContext from '../../shared/store/AuthContext';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

export default function NewPlace() {
  const authContext = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      title: { value: '', isValid: false },
      address: { value: '', isValid: false },
      description: { value: '', isValid: false },
      image: { value: null, isValid: false },
    },
    false
  );

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form className="place-form" method="post" encType="multipart/form-data">
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

      <ImageUpload
        id="image"
        name="image"
        onInput={inputHandler}
        errorText="Please provide an image."
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
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const response = await fetch(`${backendUrl}/api/places`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Response('Failed to create place', { status: 500 });
  }

  return redirect('/');
}
