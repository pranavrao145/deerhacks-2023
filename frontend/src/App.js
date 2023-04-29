import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" />
          <Route path="/wardrobe" />
          <Route path="/get-outfit" />
          <Route path="/account" />
        </Routes>
      </BrowserRouter>
      <Home />
    </div>
  );
}

export default App;
