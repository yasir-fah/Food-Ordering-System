import logo from "../assets/logo.jpg";

function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A restaurant logo" />
        <h1>ReactFood</h1>
      </div>
      {/* we should receive number of item as a prop in <button> */}
      <button>Cart(0)</button>
    </header>
  );
}

export default Header;
