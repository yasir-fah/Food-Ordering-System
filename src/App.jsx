import { ContextProvider } from "./store/shopping-cart-context";
import Header from "./components/Header";
import Product from "./components/Product";

function App() {
  return (
    <ContextProvider>
      <Header />
      <Product />
    </ContextProvider>
  );
}

export default App;
