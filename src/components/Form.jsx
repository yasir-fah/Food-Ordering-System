import { useActionState, use } from "react";
import { Context } from "../store/shopping-cart-context";

import {
  validateEmail,
  validateName,
  validateString,
} from "../validationMethod";

// to deal with form in this component: using 'useActionState' hook
function Form({ total, onClose }) {
  const { items, clearCart } = use(Context);

  async function submitAction(preState, formData) {
    // 1- get data from inputs fields:
    const userName = formData.get("userName");
    const email = formData.get("email");
    const street = formData.get("street");
    const postalCode = formData.get("postalCode");
    const city = formData.get("city");

    // 2- set error array for handle input validation
    let error = [];

    // 3- push occurred errors to array
    if (!validateName(userName)) {
      error.push("Full Name must be longer than 6 characters.");
    }
    if (!validateEmail(email)) {
      error.push("Email must contain '@'.");
    }
    if (!validateString(street)) {
      error.push("Street is required.");
    }
    if (!validateString(postalCode)) {
      error.push("Postal Code is required.");
    }
    if (!validateString(city)) {
      error.push("City is required.");
    }

    // return error & keep entered values saved
    if (error.length > 0) {
      return {
        error,
        enteredValues: {
          userName,
          email,
          street,
          postalCode,
          city,
        },
      };
    }

    // structure the data as backend receiver:
    let order = {
      items,
      customer: {
        name: userName,
        email,
        street,
        "postal-code": postalCode,
        city,
      },
    };

    // POST http request to the backend server:
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({order}),
      });

      if (!response.ok) {
        throw new Error("data could not be sent to the server");
      }

      clearCart();
      return { error: null, enteredValues: null };
    } catch (error) {
      return {
        error: [error.message],
        enteredValues: {
          userName,
          email,
          street,
          postalCode,
          city,
        },
      };
    }
  }

  const [formState, formAction, isPending] = useActionState(submitAction, {
    error: null,
    enteredValues: null,
  });

  return (
    // TODO: enhance the style of the form 
    <form action={formAction}>
      <p>total amount is {total}$</p>
      <div className="">
        <p className="control">
          <label htmlFor="userName">Full Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            defaultValue={formState.enteredValues?.userName}
          />
        </p>
        <p className="control">
          <label htmlFor="email">E-Mail Address</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={formState.enteredValues?.email}
          />
        </p>
        <p className="control">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            defaultValue={formState.enteredValues?.street}
          />
        </p>
        <p className="control">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            defaultValue={formState.enteredValues?.postalCode}
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            defaultValue={formState.enteredValues?.city}
          />
        </p>

        <p className="control-row">
          <button type="button" className="text-button" onClick={onClose}>
            Close
          </button>
          <button type="submit" className="button">
            Submit Order
          </button>
        </p>

        {formState.error && (
          <ul className="error">
            {formState.error?.map((error) => (
              <li key={error}>
                <p>{error}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}

export default Form;
