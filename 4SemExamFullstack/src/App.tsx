import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePageContent from "./components/HomepageContent";
import SearchRecipes from "./components/SearchRecipes";
import SavedRecipes from "./components/SavedRecipes";

import Login from "./components/Login";
import { Router, BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col w-screen h-screen min-h-screen ">
        <Navbar />
        <div className="flex-grow bg-background">
          <Routes>
            <Route path="/" element={<HomePageContent />} />
            <Route path="searchrecipes" element={<SearchRecipes />} />
            <Route path="savedrecipes" element={<SavedRecipes />} />
            <Route path="shoppinglist" element={<SearchRecipes />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
