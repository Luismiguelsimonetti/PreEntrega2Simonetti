import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NavBar } from "./components/NavBar";
import { ItemListContainer } from "./components/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
import { Provider } from "./contexts/ItemsContext";
import { Cart } from "./components/cart";

function App() {
  return ( 
    <Provider>
    <BrowserRouter>
     <NavBar/>
      <Routes>
       <Route path="/" element={<ItemListContainer/>} />
       <Route path="/categoria/:id" element={<ItemListContainer/>} />
       <Route path="/item/:id" element={<ItemDetailContainer/>} />
       <Route path="/cart" element={<Cart/>} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
  }

export default App
