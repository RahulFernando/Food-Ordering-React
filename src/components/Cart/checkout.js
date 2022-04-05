import { useRef, useState } from 'react';
import classes from './checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChar = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const [error, setError] = useState({
    name: false,
    street: false,
    postal: false,
    city: false,
  });

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;

    const nameValid = isEmpty(name);
    const streetValid = isEmpty(street);
    const postalValid = !isFiveChar(postal);
    const cityValid = isEmpty(city);

    setError({
      name: nameValid,
      street: streetValid,
      postal: postalValid,
      city: cityValid,
    });

    if (!nameValid && !streetValid && !postalValid && !cityValid) {
      return;
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${error.name ? classes.invalid : ''} `}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {error.name && <p>Please enter valid name</p>}
      </div>
      <div className={`${classes.control} ${error.street ? classes.invalid : ''} `}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {error.street && <p>Please enter valid street</p>}
      </div>
      <div className={`${classes.control} ${error.postal ? classes.invalid : ''} `}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef} />
        {error.postal && <p>Please enter valid postal code</p>}
      </div>
      <div className={`${classes.control} ${error.city ? classes.invalid : ''} `}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {error.city && <p>Please enter valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
