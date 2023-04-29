import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" />
            <Route path="/wardrobe" />
            <Route path="/get-outfit" />
            <Route path="/account" />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
