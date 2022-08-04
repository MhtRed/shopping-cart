import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { Features } from "./pages/Features";
import {NavBar} from "./components/NavBar"
import { ShoppingCardProvider } from "./context/ShoppingCartContext";
function App() {
  return (
    <div className="App">
      <ShoppingCardProvider>
      <NavBar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
        </Routes>
      </Container>
      </ShoppingCardProvider>
    </div>
  );
}

export default App;
