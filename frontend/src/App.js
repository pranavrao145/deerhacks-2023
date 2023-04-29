import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Wardrobe from "./pages/wardrobe";
import WardrobeItem from "./pages/wardrobeItem";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/wardrobe/:id" element={<WardrobeItem />} />
          <Route path="/get-outfit" />
          <Route path="/account" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
