import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import './PlaceForm.css';
import useForm from '../../shared/hooks/form-hook';

export default function NewPlace() {
  const [formState, inputHandler] = useForm(
    {
      title: { value: '', isValid: false },
      address: { value: '', isValid: false },
      description: { value: '', isValid: false }
    },
    false
  );

  function submitHandler(event) {
    event.preventDefault();
    console.log({
      title: formState.inputs.title.value,
      address: formState.inputs.address.value,
      description: formState.inputs.description.value
    });
  }

  return (
    <form className="place-form" onSubmit={submitHandler}>
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
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
}
