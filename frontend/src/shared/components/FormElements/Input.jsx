import { useEffect, useReducer } from 'react';
import './Input.css';
import { validate } from '../../util/validators';

function inputReducer(state, action) {
  if (action.type === 'CHANGE') {
    return {
      ...state,
      value: action.val,
      isValid: validate(action.val, action.validators),
    };
  }
  if (action.type === 'TOUCH') {
    return {
      ...state,
      isTouched: true,
    };
  }
  return state;
}

export default function Input({
  id,
  placeholder,
  type,
  rows,
  label,
  element,
  errorText,
  validators,
  onInput,
  initialValue,
  initialValid
}) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isValid: initialValid || false,
    isTouched: false,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  function onChangeHandler(event) {
    dispatch({ type: 'CHANGE', val: event.target.value, validators });
  }

  function touchHandler() {
    dispatch({ type: 'TOUCH' });
  }

  const inputElement =
    element === 'input' ? (
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        name={id}
        rows={rows || 3}
        onChange={onChangeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched ? 'form-control--invalid' : ''
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {inputElement}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
}
