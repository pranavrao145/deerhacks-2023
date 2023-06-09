import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Outfit from "./pages/outfit";
import Login from "./pages/login";
import Wardrobe from "./pages/wardrobe";
import WardrobeItem from "./pages/wardrobeItem";
import Search from "./pages/search";
import Add from "./pages/add";
import AddWithPicture from "./pages/addWithPicture";
import GetRecommendation from "./pages/getRecommendation";
import useToken from "./utils/useToken";

function App() {
  const { token, setToken } = useToken();

  return (
    <div>
      <BrowserRouter>
        {!token && token !== "" && token !== undefined ? (
          <Login setToken={setToken} />
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/outfit/:id" element={<Outfit />} />
              <Route path="/wardrobe" element={<Wardrobe />} />
              <Route path="/wardrobe/:id" element={<WardrobeItem />} />
              <Route path="/search" element={<Search />} />
              <Route path="/add" element={<Add />} />
              <Route path="/addWithPicture" element={<AddWithPicture />} />
              <Route
                path="/get-recommendation"
                element={<GetRecommendation />}
              />
              <Route
                exact
                path="/get-recommendation"
                element={<GetRecommendation />}
              />
              <Route path="/account" />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
