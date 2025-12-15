
export async function getAllProduct() {

  const response = await fetch("http://localhost:3000/meals");
  const data = await response.json();

  if (!response.ok) {
    throw new Error("could not fetch products");
  }

  return data;
}

