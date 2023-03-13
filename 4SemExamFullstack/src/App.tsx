import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePageContent from "./components/HomepageContent";
import SearchRecipes from "./components/SearchRecipes";
import SavedRecipes from "./components/SavedRecipes";

import Login from "./components/Login";
import {Router, BrowserRouter, Routes, Route} from "react-router-dom";
function App() {
  return (
    <div className="flex flex-col w-screen h-screen ">
            <Navbar />
      <BrowserRouter>
      <Routes>
        <Route path ="/" element={<HomePageContent />} />
        <Route path ="searchrecipes" element={<SearchRecipes />} />
        <Route path ="savedrecipes" element={<SavedRecipes />} />
        <Route path ="shoppinglist" element={<SearchRecipes />} />
        <Route path ="login" element={<Login />} />
      </Routes>
     
      </BrowserRouter>
      <Footer />  

    </div>
  );
}

export default App;
