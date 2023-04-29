import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Wardrobe from "./pages/wardrobe";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/get-outfit" />
          <Route path="/account" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
