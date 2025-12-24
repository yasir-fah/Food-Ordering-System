import { useContext } from "react";
import useFetch from "../hooks/useFetch";
import { getAllProduct } from "../http";
import { Context } from "../store/shopping-cart-context";

// Task: fetch product (meals) from backend
function Product() {
  // Take variables From 'Custom Hook'
  const { fetchedData, isLoading, error } = useFetch(getAllProduct);
  const { addItemToCart } = useContext(Context);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <ul id="meals">
      {fetchedData.map((product) => (
        <li className="meal-item" key={product.id}>
          <article>
            <img
              src={"http://localhost:3000/" + product.image}
              alt={product.name}
            />
            <h3>{product.name}</h3>
            <p className="meal-item-price">{product.price}</p>
            <p className="meal-item-description">{product.description}</p>
            <p className="meal-item-actions">
                <button className="button" onClick={() => addItemToCart(product.id)}>
                Add to Cart
              </button>
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default Product;
