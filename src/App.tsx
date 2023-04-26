import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomePageContent from './components/HomepageContent';
import SearchRecipes from './components/SearchRecipes';
import SavedRecipes from './components/SavedRecipes';
import Recipe from './components/Recipe';
import Login from './components/Login';
import Register from './components/Register';

type LoginProps = {
  login: (username: string, password: string) => void;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col w-screen h-screen min-h-screen overflow-x-auto">
        <Navbar />
        <div className="flex-grow bg-background">
          <Routes>
            <Route path="/" element={<HomePageContent />} />
            <Route path="/searchrecipes" element={<SearchRecipes />} />
            <Route path="/savedrecipes" element={<SavedRecipes />} />
            <Route path="/recipe" element={<Recipe />} />
            <Route path="/shoppinglist" element={<div> not implemented yet</div>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login login={() => {}} />} />
            {/* <Route path="/login" element={<Login login={yourLoginFunction} />} /> // Skal bruges en login function  */}
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
